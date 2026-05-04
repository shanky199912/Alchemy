import { ALCHEMY_ASSESSMENT } from '../constants/alchemyAssessments';

/**
 * Calculates a stable pseudo-random jitter based on user IDs.
 * This ensures scores don't look like perfect multiples of 5,
 * without causing React re-render flickering since the jitter is deterministic for a pair.
 * 
 * @param {string|number} idA - ID of User A
 * @param {string|number} idB - ID of User B
 * @returns {number} A multiplier between 0.99 and 1.01 (±1%)
 */
const getStableJitter = (idA, idB) => {
    // Sort IDs to ensure (A, B) and (B, A) give the same jitter
    const str = [String(idA), String(idB)].sort().join('-');
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    // Normalize hash to range -1.0 to 1.0
    const normalized = (Math.abs(hash) % 100) / 50 - 1; 
    return 1 + (normalized * 0.015); 
};

/**
 * Normalizes interests format from array of strings or objects to a flat array of strings.
 * 
 * @param {Array} interests - Mixed format array of interests
 * @returns {string[]} Flat array of interest strings
 */
const getInterestsList = (interests) => {
    if (!Array.isArray(interests)) return [];
    return interests.map(i => typeof i === 'string' ? i : i.label);
};

/**
 * Finds the index of the selected option based on the mapping object.
 * 
 * @param {Object} question - The question object from ALCHEMY_ASSESSMENT
 * @param {Object} mapping - The selected mapping object from psychometricData
 * @returns {number} The 0-based index of the selected option, or -1 if not found
 */
const getOptionIndex = (question, mapping) => {
    if (!mapping) return -1;
    return question.options.findIndex(
        opt => JSON.stringify(opt.mapping) === JSON.stringify(mapping)
    );
};

/**
 * Calculates the score for MCQ type questions (EQ and Social).
 * 
 * Scoring Logic:
 * - 100: Exact ID match (both users selected the same option).
 * - 50: Partial alignment (different options, but share a primary trait sign/category).
 * - 0: Clashing traits (no shared alignment).
 * 
 * @param {Object} question - The question object
 * @param {Object} mappingA - User A's selected mapping
 * @param {Object} mappingB - User B's selected mapping
 * @returns {number} Score for the specific question
 */
const calculateMCQScore = (question, mappingA, mappingB) => {
    const indexA = getOptionIndex(question, mappingA);
    const indexB = getOptionIndex(question, mappingB);

    if (indexA !== -1 && indexA === indexB) return 100;
    if (!mappingA || !mappingB) return 0; // Missing data results in 0
    
    // Partial alignment check: do they share any trait keys with the same polarity?
    const traitsA = Object.keys(mappingA);
    const traitsB = Object.keys(mappingB);
    
    let isPartial = false;
    for (let trait of traitsA) {
        if (traitsB.includes(trait)) {
            // Check if both have positive or both have negative weights for the same trait
            if (Math.sign(mappingA[trait]) === Math.sign(mappingB[trait]) && mappingA[trait] !== 0) {
                isPartial = true;
                break;
            }
        }
    }
    
    return isPartial ? 50 : 0;
};

/**
 * The Resonance Engine - Calculates psychological compatibility between two users.
 * 
 * Mathematical Framework:
 * Resonance = (0.35 × P) + (0.25 × EQ) + (0.20 × S) + (0.20 × I)
 * 
 * 1. Personality (P - 35%): Uses the inverse of Mean Squared Error (MSE) of 1-5 Likert scales.
 * 2. EQ (EQ - 25%): Exact MCQ matches score 100, partial alignment scores 50, clashes score 0.
 * 3. Social Archetype (S - 20%): Uses same MCQ matching logic as EQ.
 * 4. Interests (I - 20%): Uses Jaccard Similarity (Intersection / Union) on interest tags.
 *    - Applies a 1.2x multiplier (capped at 100) if both share specific Delhi Hubs.
 * 
 * Normalization Constraints:
 * - Output must be a clean integer.
 * - Score Floor/Ceiling: Strictly bounded between 62 and 98.
 * - Human Jitter: ±1.5% applied deterministically to prevent scores from looking artificial.
 * 
 * @param {Object} userA - The first user (must contain id, psychometricData, interests)
 * @param {Object} userB - The second user
 * @returns {number} Final Resonance Score
 */
export const calculateResonance = (userA, userB) => {
    // Fallback if data is missing
    if (!userA || !userB) return 65;

    const pQuestions = ALCHEMY_ASSESSMENT.filter(q => q.category === 'Personality Core');
    const eqQuestions = ALCHEMY_ASSESSMENT.filter(q => q.category === 'The Empathy Compass');
    const sQuestions = ALCHEMY_ASSESSMENT.filter(q => q.category === 'Social Archetype');

    let pScore = 70;
    let eqScore = 70;
    let sScore = 70;

    const hasDataA = userA.psychometricData && Object.keys(userA.psychometricData).length > 0;
    const hasDataB = userB.psychometricData && Object.keys(userB.psychometricData).length > 0;

    if (hasDataA && hasDataB) {
        // 1. Personality (P - 35%): Inverse MSE
        let pSumSq = 0;
        let pCount = 0;
        
        pQuestions.forEach(q => {
            const valA = userA.psychometricData[q.id];
            const valB = userB.psychometricData[q.id];
            
            // Likert answers are stored as 1-5 integers in enrichedUsers.js
            const scoreA = typeof valA === 'number' ? valA : 3;
            const scoreB = typeof valB === 'number' ? valB : 3;

            pSumSq += Math.pow(scoreA - scoreB, 2);
            pCount++;
        });
        
        // Maximum MSE for a 1-5 scale is 16 (i.e. (5-1)^2)
        const mse = pCount > 0 ? pSumSq / pCount : 0;
        pScore = 100 - ((mse / 16) * 100);

        // 2. EQ (EQ - 25%): MCQ Alignment
        let eqTotal = 0;
        eqQuestions.forEach(q => {
            const ansA = userA.psychometricData[q.id];
            const ansB = userB.psychometricData[q.id];
            
            // For MCQs, answers are 1-based option indices
            const mappingA = (typeof ansA === 'number' && q.options[ansA - 1]) ? q.options[ansA - 1].mapping : null;
            const mappingB = (typeof ansB === 'number' && q.options[ansB - 1]) ? q.options[ansB - 1].mapping : null;
            
            eqTotal += calculateMCQScore(q, mappingA, mappingB);
        });
        eqScore = eqQuestions.length > 0 ? eqTotal / eqQuestions.length : 70;

        // 3. Social Archetype (S - 20%): MCQ Alignment
        let sTotal = 0;
        sQuestions.forEach(q => {
            const ansA = userA.psychometricData[q.id];
            const ansB = userB.psychometricData[q.id];
            
            const mappingA = (typeof ansA === 'number' && q.options[ansA - 1]) ? q.options[ansA - 1].mapping : null;
            const mappingB = (typeof ansB === 'number' && q.options[ansB - 1]) ? q.options[ansB - 1].mapping : null;
            
            sTotal += calculateMCQScore(q, mappingA, mappingB);
        });
        sScore = sQuestions.length > 0 ? sTotal / sQuestions.length : 70;
    }

    // 4. Interests (I - 20%): Jaccard Similarity + Delhi Hub Multiplier
    let interestScore = 70;
    const interestsA = getInterestsList(userA.interests || userA.basics?.interests || []);
    const interestsB = getInterestsList(userB.interests || userB.basics?.interests || []);
    
    if (interestsA.length > 0 || interestsB.length > 0) {
        const setA = new Set(interestsA);
        const setB = new Set(interestsB);
        const intersection = new Set([...setA].filter(x => setB.has(x)));
        const union = new Set([...setA, ...setB]);
        
        let iScore = union.size === 0 ? 0 : (intersection.size / union.size) * 100;
        
        // Delhi Hub Multiplier Boost (1.2x)
        const delhiHubs = ["Hauz Khas", "CyberHub", "Vasant Vihar", "South Delhi", "CP"];
        const hasHub = delhiHubs.some(hub => intersection.has(hub));
        if (hasHub) {
            iScore *= 1.2; 
        }
        
        interestScore = Math.min(100, iScore > 0 ? iScore : 65);
    }

    // Mathematical Framework: Weighted Average
    let rawResonance = (0.35 * pScore) + (0.25 * eqScore) + (0.20 * sScore) + (0.20 * interestScore);

    // Apply Human Jitter (±1.5%)
    const idA = userA.id || userA.name || 'A';
    const idB = userB.id || userB.name || 'B';
    const jitter = getStableJitter(idA, idB);
    rawResonance *= jitter;

    // Normalization Constraints: Floor 62, Ceiling 98
    return Math.max(62, Math.min(98, Math.round(rawResonance)));
};

export default calculateResonance;
