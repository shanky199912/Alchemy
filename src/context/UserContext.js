import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateMockUsers } from '../utils/mockData';
import { ENRICHED_USERS } from '../constants/enrichedUsers';


const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [appSettings, setAppSettings] = useState({
        darkMode: false,
        distance: 50,
        ageRange: [24, 32],
        globalMode: false,
        readReceipts: true,
        pushNotifications: true,
        units: 'Mi. / Lbs.',
        location: 'New York',
        incognitoMode: false,
    });

    const [userProfile, setUserProfile] = useState({
        name: 'Alex',
        age: 28,
        isVerified: false,
        pronouns: 'He/Him',
        bio: 'Product designer living in NYC. I spend my weekends exploring coffee shops and writing bad code.',
        basics: {
            'Work': 'Product Designer at TechCorp',
            'Education': 'NYU',
            'Location': 'Lives in New York',
            'Hometown': 'Chicago, IL',
            'Height': "5'10\"",
            'Interested in': 'Everyone',
            'Pronouns': 'He/Him',
            'Looking for': 'Long-term relationship',
            'Relationship Type': 'Monogamy',
            'Family Plans': 'Want children',
            'Languages': 'English, Spanish',
            'Drinking': 'Socially',
            'Smoking': 'Never',
            'Workout': 'Active',
            'Sleeping Habits': 'Early bird'
        },
        interests: ['Architecture', 'Espresso', 'Indie Rock', 'Photography', 'Dogs'],
        prompts: [
            { id: 1, question: "My favorite song to sing in the shower", answer: "\"Don't Stop Believin\" by Journey" },
            { id: 2, question: "I'm weirdly obsessed with...", answer: "Mid-century modern lamps. I have 12." }
        ],
        voicePrompt: "Add a Voice Prompt"
    });

    const [safetySettings, setSafetySettings] = useState({
        incognito: false,
        verifiedOnly: false
    });

    const [userStatus, setUserStatus] = useState('landing'); // 'landing', 'onboarding', 'active'
    const [activeTab, setActiveTab] = useState('discover');
    const [activeChat, setActiveChat] = useState(null);

    // Discover and Match Engine State
    const [discoverQueue, setDiscoverQueue] = useState([]);
    const [activeMatches, setActiveMatches] = useState([]);

    // Initialize enriched users on mount
    useEffect(() => {
        setDiscoverQueue(ENRICHED_USERS);
    }, []);


    const updateAppSetting = (key, value) => {
        setAppSettings(prev => ({ ...prev, [key]: value }));
    };

    const updateProfile = (key, value) => {
        setUserProfile(prev => ({ ...prev, [key]: value }));
    };

    const updateBasicInfo = (key, value) => {
        setUserProfile(prev => ({
            ...prev,
            basics: { ...prev.basics, [key]: value }
        }));
    };

    const updateSafetySetting = (key, value) => {
        setSafetySettings(prev => ({ ...prev, [key]: value }));
    };

    // Translator Engine: Map raw scores to labels
    useEffect(() => {
        if (!userProfile.psychometricData || Object.keys(userProfile.psychometricData).length === 0) return;

        const data = userProfile.psychometricData;
        const sums = {
            extroversion: 0, introversion: 0, secure: 0, anxious: 0, avoidant: 0,
            eq: 0, hustler: 0, creative: 0, socialite: 0, homebody: 0
        };

        Object.values(data).forEach(mapping => {
            Object.entries(mapping).forEach(([trait, value]) => {
                if (sums.hasOwnProperty(trait)) {
                    sums[trait] += value;
                }
            });
        });

        // Determine Attachment
        let attachment = "Secure";
        if (sums.anxious > sums.secure && sums.anxious > sums.avoidant) attachment = "Anxious";
        else if (sums.avoidant > sums.secure && sums.anxious > sums.avoidant) attachment = "Avoidant";

        // Determine Archetype
        const archetypes = ["Hustler", "Creative", "Socialite", "Homebody"];
        const archetypeScores = [sums.hustler, sums.creative, sums.socialite, sums.homebody];
        const maxArchetypeIdx = archetypeScores.indexOf(Math.max(...archetypeScores));
        const archetype = archetypes[maxArchetypeIdx];

        // Determine MBTI (Approximate based on E/I and Archetype flavor)
        const e_vs_i = sums.extroversion >= sums.introversion ? "E" : "I";
        const archetypeToMBTI = {
            Hustler: "NTJ",
            Creative: "NFP",
            Socialite: "SFJ",
            Homebody: "STJ"
        };
        const mbti = e_vs_i + archetypeToMBTI[archetype];

        // EQ Score (Normalized to 100)
        // Max possible EQ is roughly 10-12 based on the 5 MCQ questions
        const eqScore = Math.min(100, Math.max(0, (sums.eq / 10) * 100));

        updateProfile('psychometricResults', {
            mbti,
            attachment,
            archetype,
            eqScore: Math.round(eqScore)
        });
        
        // Update chips for UI consistency
        updateProfile('chips', [mbti, attachment, archetype]);
    }, [userProfile.psychometricData]);


    return (
        <UserContext.Provider value={{
            appSettings, updateAppSetting,
            userProfile, updateProfile, updateBasicInfo,
            safetySettings, updateSafetySetting,
            userStatus, setUserStatus,
            activeTab, setActiveTab,
            activeChat, setActiveChat,
            discoverQueue, setDiscoverQueue,
            activeMatches, setActiveMatches
        }}>
            {children}
        </UserContext.Provider>
    );
};
