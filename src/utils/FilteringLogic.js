/* ─────────────────────────────────────────────────────
   FilteringLogic.js
   Pure utility — no React, no side-effects.
   All gender-preference sorting & filtering lives here.
 ───────────────────────────────────────────────────── */

/**
 * Maps a user's "Interested In" preference to which mock genders to show.
 */
const PREFERENCE_MAP = {
    'Men':      ['Male'],
    'Women':    ['Female'],
    'Others':   ['Non-binary', 'Other'],
    'Everyone': ['Male', 'Female', 'Non-binary', 'Other'],
    // legacy values from old onboarding
    'Male':     ['Male'],
    'Female':   ['Female'],
};

/**
 * Core filter + sort function.
 *
 * @param {Array}  users        - Full user pool
 * @param {Object} userProfile  - Current user's profile (context)
 * @returns {Array} Filtered + sorted array
 */
export const filterUsers = (users, userProfile) => {
    const rawPref = userProfile?.basics?.['Interested in'] || 'Everyone';
    const allowedGenders = PREFERENCE_MAP[rawPref] || ['Male', 'Female', 'Non-binary', 'Other'];

    const filtered = users.filter(u => allowedGenders.includes(u.gender));

    // Sort: verified users float to the top, then by lastActive (most recent first)
    return filtered.sort((a, b) => {
        if (a.verified && !b.verified) return -1;
        if (!a.verified && b.verified) return 1;
        return (b.lastActive || 0) - (a.lastActive || 0);
    });
};

/**
 * Returns true if a user was active within the last 24 hours.
 */
export const isActiveRecently = (user) => {
    if (!user?.lastActive) return false;
    const oneDayMs = 24 * 60 * 60 * 1000;
    return Date.now() - user.lastActive < oneDayMs;
};
