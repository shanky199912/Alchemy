export const MAGIC_TRAITS = [
    { type: 'Personality', values: ['INTJ', 'ENFP', 'INFJ', 'ESTP', 'ENTJ', 'ISFP'] },
    { type: 'Attachment', values: ['Secure Attachment', 'Anxious Attachment', 'Avoidant Attachment'] },
    { type: 'Love Language', values: ['Words of Affirmation', 'Physical Touch', 'Quality Time', 'Acts of Service', 'Receiving Gifts'] }
];

const FEMALE_NAMES = ['Aanya', 'Diya', 'Ishita', 'Kavya', 'Meera', 'Neha', 'Priya', 'Riya', 'Sanya', 'Tara'];
const MALE_NAMES = ['Aarav', 'Dev', 'Ishaan', 'Kabir', 'Rohan', 'Vihaan', 'Aditya', 'Arjun', 'Sai', 'Yash'];

const BIOS = [
    'Coffee addict & architecture nerd. Finding the best espresso in the city.',
    'Dog parent. Weekend hiker. Making the best out of every single day.',
    'Art gallery enthusiast and amateur chef. Let me cook for you.',
    'Just looking for someone to rewatch The Office with for the 10th time.',
    'Avid reader, terrible dancer, great listener.',
    'Powered by iced coffee and bad puns.',
    'Probably the best person you will meet today.',
    'Looking for a partner in crime for weekend getaways.'
];

const PHOTOS_FEMALE = [
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
];

const PHOTOS_MALE = [
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1480429370139-e01be6224514?auto=format&fit=crop&w=800&q=80'
];

const SECONDARY_PHOTOS = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1601662528567-526cd06f6582?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
];

export const generateMockUsers = (count = 100) => {
    const users = [];
    const femaleCount = Math.floor(count * 0.3); // 30% Female
    const maleCount = count - femaleCount;       // 70% Male

    for (let i = 0; i < count; i++) {
        const isFemale = i < femaleCount;
        const name = isFemale 
            ? FEMALE_NAMES[Math.floor(Math.random() * FEMALE_NAMES.length)]
            : MALE_NAMES[Math.floor(Math.random() * MALE_NAMES.length)];
            
        const img = isFemale
            ? PHOTOS_FEMALE[Math.floor(Math.random() * PHOTOS_FEMALE.length)]
            : PHOTOS_MALE[Math.floor(Math.random() * PHOTOS_MALE.length)];
            
        const age = Math.floor(Math.random() * (35 - 20 + 1)) + 20;
        
        // Pick random Magic Lab Traits
        const chips = MAGIC_TRAITS.map(traitGroup => 
            traitGroup.values[Math.floor(Math.random() * traitGroup.values.length)]
        );

        users.push({
            id: `user-${i}`,
            name,
            age,
            gender: isFemale ? 'Female' : 'Male',
            region: 'India',
            distance: `${Math.floor(Math.random() * 10) + 1} miles away`,
            img,
            secondary_img: SECONDARY_PHOTOS[Math.floor(Math.random() * SECONDARY_PHOTOS.length)],
            bio: BIOS[Math.floor(Math.random() * BIOS.length)],
            chips,
            voice_prompt: 'My favorite song to sing in the shower',
            text_prompt_topic: "I'm weirdly obsessed with...",
        });
    }

    // Shuffle the array to mix males and females
    return users.sort(() => Math.random() - 0.5);
};

export const INITIAL_CHATS = []; // Starts empty, will be populated by matching engine
