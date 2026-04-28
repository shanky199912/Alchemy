import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateMockUsers } from '../utils/mockData';

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
    const [matchedUsers, setMatchedUsers] = useState([]);

    // Initialize mock users on mount
    useEffect(() => {
        setDiscoverQueue(generateMockUsers(100));
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

    return (
        <UserContext.Provider value={{
            appSettings, updateAppSetting,
            userProfile, updateProfile, updateBasicInfo,
            safetySettings, updateSafetySetting,
            userStatus, setUserStatus,
            activeTab, setActiveTab,
            activeChat, setActiveChat,
            discoverQueue, setDiscoverQueue,
            matchedUsers, setMatchedUsers
        }}>
            {children}
        </UserContext.Provider>
    );
};
