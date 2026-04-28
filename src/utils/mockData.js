export const MAGIC_TRAITS = [
    { type: 'Personality', values: ['INTJ', 'ENFP', 'INFJ', 'ESTP', 'ENTJ', 'ISFP'] },
    { type: 'Attachment', values: ['Secure Attachment', 'Anxious Attachment', 'Avoidant Attachment'] },
    { type: 'Love Language', values: ['Words of Affirmation', 'Physical Touch', 'Quality Time', 'Acts of Service', 'Receiving Gifts'] }
];

const FEMALE_NAMES = ['Aanya', 'Diya', 'Ishita', 'Kavya', 'Meera', 'Neha', 'Priya', 'Riya', 'Sanya', 'Tara'];
const MALE_NAMES   = ['Aarav', 'Dev', 'Ishaan', 'Kabir', 'Rohan', 'Vihaan', 'Aditya', 'Arjun', 'Sai', 'Yash'];

const BIOS = [
    'Coffee addict & architecture nerd. Finding the best espresso in the city.',
    'Dog parent. Weekend hiker. Making the best out of every single day.',
    'Art gallery enthusiast and amateur chef. Let me cook for you.',
    'Just looking for someone to rewatch The Office with for the 10th time.',
    'Avid reader, terrible dancer, great listener.',
    'Powered by iced coffee and bad puns.',
    'Probably the best person you will meet today.',
    'Looking for a partner in crime for weekend getaways.',
    'Sunrise yoga and late-night ramen — that\'s my vibe.',
    'Book hoarder, terrible at Netflix decision-making.',
];

const PHOTOS_FEMALE = [
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
];

const PHOTOS_MALE = [
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1480429370139-e01be6224514?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=800&q=80',
];

const SECONDARY_PHOTOS = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1601662528567-526cd06f6582?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
];

const ALL_INTERESTS = [
    'Music', 'Cooking', 'Yoga', 'Tech', 'Travel', 'Photography',
    'Gaming', 'Hiking', 'Coffee', 'Reading', 'Art', 'Fitness',
    'Movies', 'Dogs', 'Foodie', 'Dancing', 'Meditation', 'Surfing',
];

const INTEREST_EMOJIS = {
    'Music': '🎵', 'Cooking': '🍳', 'Yoga': '🧘', 'Tech': '💻',
    'Travel': '✈️', 'Photography': '📷', 'Gaming': '🎮', 'Hiking': '🥾',
    'Coffee': '☕', 'Reading': '📚', 'Art': '🎨', 'Fitness': '💪',
    'Movies': '🎬', 'Dogs': '🐶', 'Foodie': '🍜', 'Dancing': '💃',
    'Meditation': '🌿', 'Surfing': '🏄',
};

const PROMPT_POOL = [
    { question: "I'm weirdly obsessed with...", answers: ['Vintage maps. I have 30.', 'Documentaries about cheese.', 'The sound rain makes on leaves.'] },
    { question: "The way to win me over is...", answers: ['Show up with coffee and no agenda.', 'Recommend a good book.', 'Cook something from scratch.'] },
    { question: "We'll get along if...", answers: ['You appreciate slow mornings.', 'You laugh at your own jokes.', 'You have strong opinions about pizza.'] },
    { question: "My simple pleasures...", answers: ['A perfectly made chai.', 'The first cool day of autumn.', 'Finding an extra fry at the bottom of the bag.'] },
    { question: "I take pride in...", answers: ['Being the person who shows up.', 'My sourdough. It\'s legendary.', 'Making people feel heard.'] },
    { question: "Ideal Sunday looks like...", answers: ['Farmer\'s market, then nap.', 'A hike + terrible movie night.', 'Brunch that turns into dinner.'] },
];

const PRONOUNS_OPTIONS = ['He/Him', 'She/Her', 'They/Them', 'She/They', 'He/They'];

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const pickN = (arr, n) => [...arr].sort(() => Math.random() - 0.5).slice(0, n);

export const generateMockUsers = (count = 100) => {
    const users = [];
    const femaleCount = Math.floor(count * 0.45); // 45% Female for better balance
    const maleCount   = count - femaleCount;

    for (let i = 0; i < count; i++) {
        const isFemale = i < femaleCount;
        const name = isFemale ? rand(FEMALE_NAMES) : rand(MALE_NAMES);
        const img  = isFemale ? rand(PHOTOS_FEMALE) : rand(PHOTOS_MALE);
        const age  = Math.floor(Math.random() * (35 - 20 + 1)) + 20;

        // Magic Lab personality chips
        const chips = MAGIC_TRAITS.map(g => rand(g.values));

        // Interests (3–5 random tags)
        const interestLabels = pickN(ALL_INTERESTS, Math.floor(Math.random() * 3) + 3);
        const interests = interestLabels.map(label => ({ label, emoji: INTEREST_EMOJIS[label] }));

        // Prompts (1–2 from pool)
        const promptCount  = Math.random() > 0.4 ? 2 : 1;
        const pickedPrompts = pickN(PROMPT_POOL, promptCount);
        const prompts = pickedPrompts.map(p => ({
            question: p.question,
            answer: rand(p.answers),
        }));

        // Verified (~65% of users)
        const verified = Math.random() < 0.65;

        // Last active: 0 – 48 hrs ago (ms timestamp)
        const hoursAgo = Math.random() * 48;
        const lastActive = Date.now() - hoursAgo * 60 * 60 * 1000;

        users.push({
            id: `user-${i}`,
            name,
            age,
            gender: isFemale ? 'Female' : 'Male',
            pronouns: isFemale ? 'She/Her' : 'He/Him',
            region: 'India',
            distance: `${Math.floor(Math.random() * 10) + 1} miles away`,
            img,
            secondary_img: rand(SECONDARY_PHOTOS),
            bio: rand(BIOS),
            chips,
            interests,
            prompts,
            verified,
            lastActive,
            voice_prompt: 'My favorite song to sing in the shower',
            text_prompt_topic: "I'm weirdly obsessed with...",
        });
    }

    // Shuffle to mix males and females
    return users.sort(() => Math.random() - 0.5);
};

export const INITIAL_CHATS = [];
