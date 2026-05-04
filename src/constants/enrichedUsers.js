import { USERS } from './users';
import psychData from '../scratch/answers_utf8.json';

/**
 * ENRICHED_USERS merges the baseline user constant with their generated psychometric profiles.
 * This ensures the Resonance Engine has the necessary data to calculate compatibility scores.
 */
export const ENRICHED_USERS = USERS.map(user => {
    const psych = psychData.find(p => p.id === user.id);
    return {
        ...user,
        psychometricData: psych ? psych.psychometricData.userAnswers : null
    };
});

export default ENRICHED_USERS;
