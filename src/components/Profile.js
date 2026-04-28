import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Camera, Settings as SettingsIcon, CheckCircle2, ChevronLeft, Shield, EyeOff, Star, 
    Zap, Plus, Mic, Briefcase, GraduationCap, MapPin, Ruler, MessageSquare,
    FlaskConical, Play, Heart, Search, Home, Baby, Wine, Coffee, Dumbbell, Moon, Globe, X, Check
} from 'lucide-react';
import SwipeCard from './discover/SwipeCard';
import Settings from './Settings';
import Safety from './Safety';
import { useUser } from '../context/UserContext';

const MainProfileView = ({ setView }) => {
    const { userProfile, appSettings } = useUser();
    
    return (
        <motion.div 
            key="main"
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }} 
            className="h-full overflow-y-auto no-scrollbar bg-slate-50 pb-20 transition-colors duration-300"
        >
            {/* Header & Avatar */}
            <div className="bg-white px-6 pt-10 pb-8 rounded-b-[40px] shadow-sm border-b border-slate-100 flex flex-col items-center relative z-10 transition-colors duration-300">
                <div className="relative">
                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-200">
                        <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=400&q=80" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute bottom-1 right-1 bg-blue-500 rounded-full p-1 border-2 border-white shadow-md">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                </div>
                
                <h2 className="text-3xl font-bold text-slate-800 mt-5 tracking-tight flex items-center gap-2">
                    {userProfile.name}, {userProfile.age}
                </h2>
                <p className="text-slate-500 text-sm font-medium mt-1">{userProfile.basics.Work.split(' at ')[0]} • {appSettings.location}</p>

                <div className="flex gap-4 mt-8 w-full">
                    <button onClick={() => setView('edit')} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 rounded-2xl font-bold text-sm transition flex items-center justify-center gap-2 shadow-sm">
                        <Camera className="w-4 h-4" /> Edit Profile
                    </button>
                    <button onClick={() => setView('preview')} className="flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 py-3.5 rounded-2xl font-bold text-sm transition flex items-center justify-center gap-2 shadow-sm border border-indigo-100">
                        Preview
                    </button>
                </div>
            </div>

            {/* Upsell Tiles */}
            <div className="px-6 py-6 flex gap-4">
                <div className="flex-1 bg-gradient-to-br from-yellow-50 to-orange-50 border border-orange-100 p-4 rounded-3xl shadow-sm cursor-pointer hover:shadow-md transition group">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-1">Spotlight</h3>
                    <p className="text-xs text-slate-500 font-medium">Be seen by more people</p>
                </div>
                <div className="flex-1 bg-gradient-to-br from-rose-50 to-pink-50 border border-pink-100 p-4 rounded-3xl shadow-sm cursor-pointer hover:shadow-md transition group">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition">
                        <Zap className="w-5 h-5 text-rose-500 fill-rose-500" />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-1">SuperSwipe</h3>
                    <p className="text-xs text-slate-500 font-medium">Stand out instantly</p>
                </div>
            </div>

            {/* Settings & Extras */}
            <div className="px-6 space-y-3 pb-6">
                <div onClick={() => setView('settings')} className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between cursor-pointer hover:shadow-md transition">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-600">
                            <SettingsIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="font-bold text-slate-700 block text-base">Settings</span>
                            <span className="text-xs text-slate-400 font-medium">Preferences & Account</span>
                        </div>
                    </div>
                </div>
                <div onClick={() => setView('safety')} className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between cursor-pointer hover:shadow-md transition">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                            <Shield className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="font-bold text-slate-700 block text-base">Safety & Filters</span>
                            <span className="text-xs text-slate-400 font-medium">Control your experience</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const BasicsModal = ({ item, onClose, updateBasicInfo }) => {
    const OPTIONS = {
        'Interested in': ['Male', 'Female', 'Everyone'],
        'Height': ["5'6\"", "5'7\"", "5'8\"", "5'9\"", "5'10\"", "5'11\"", "6'0\"", "6'1\"", "6'2\""],
        'Looking for': ['Long-term relationship', 'Short-term relationship', 'New friends', 'Still figuring it out'],
        'Relationship Type': ['Monogamy', 'Polyamory', 'Open Relationship', 'Not Sure'],
        'Drinking': ['Socially', 'Never', 'Frequently'],
        'Smoking': ['Socially', 'Never', 'Regularly'],
        'Workout': ['Active', 'Sometimes', 'Never'],
        'Location': ['Lives in New York', 'Lives in Los Angeles', 'Lives in London'],
        'Family Plans': ['Want children', 'Do not want children', 'Not sure yet']
    };

    const options = OPTIONS[item.label] || ['Option 1', 'Option 2', 'Option 3'];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 100 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 100 }} 
            className="absolute inset-x-0 bottom-0 z-[200] bg-white rounded-t-3xl shadow-2xl flex flex-col h-2/3 border-t border-slate-100"
        >
            <div className="flex justify-between items-center p-5 border-b border-slate-100">
                <h3 className="font-bold text-lg text-slate-800">Edit {item.label}</h3>
                <button onClick={onClose} className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                    <X className="w-5 h-5" />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {options.map(opt => (
                    <div 
                        key={opt}
                        onClick={() => {
                            updateBasicInfo(item.label, opt);
                            onClose();
                        }}
                        className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 cursor-pointer font-semibold text-slate-700 transition"
                    >
                        {opt}
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

const ALL_INTERESTS = [
    { label: 'Music', emoji: '🎵' },
    { label: 'Cooking', emoji: '🍳' },
    { label: 'Yoga', emoji: '🧘' },
    { label: 'Tech', emoji: '💻' },
    { label: 'Travel', emoji: '✈️' },
    { label: 'Photography', emoji: '📷' },
    { label: 'Gaming', emoji: '🎮' },
    { label: 'Hiking', emoji: '🥾' },
    { label: 'Coffee', emoji: '☕' },
    { label: 'Reading', emoji: '📚' },
    { label: 'Art', emoji: '🎨' },
    { label: 'Fitness', emoji: '💪' },
    { label: 'Movies', emoji: '🎬' },
    { label: 'Dogs', emoji: '🐶' },
    { label: 'Foodie', emoji: '🍜' },
    { label: 'Dancing', emoji: '💃' },
    { label: 'Meditation', emoji: '🌿' },
    { label: 'Surfing', emoji: '🏄' },
];

const InterestsModal = ({ currentInterests, onClose, onSave }) => {
    const [selected, setSelected] = useState([...currentInterests]);

    const toggle = (label) => {
        setSelected(prev =>
            prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="absolute inset-x-0 bottom-0 z-[200] bg-white rounded-t-3xl shadow-2xl flex flex-col"
            style={{ maxHeight: '80%' }}
        >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
                <div className="w-10 h-1 bg-slate-200 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-slate-100 shrink-0">
                <div>
                    <h3 className="font-extrabold text-lg text-slate-800">Edit Interests</h3>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">{selected.length} selected</p>
                </div>
                <button onClick={onClose} className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Tag grid */}
            <div className="flex-1 overflow-y-auto p-5">
                <div className="flex flex-wrap gap-2.5">
                    {ALL_INTERESTS.map(({ label, emoji }) => {
                        const isSelected = selected.includes(label);
                        return (
                            <motion.button
                                key={label}
                                whileTap={{ scale: 0.92 }}
                                onClick={() => toggle(label)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-sm border-2 transition-all ${
                                    isSelected
                                        ? 'bg-indigo-500 border-indigo-500 text-white shadow-md shadow-indigo-100'
                                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-indigo-200'
                                }`}
                            >
                                <span>{emoji}</span>
                                <span>{label}</span>
                                {isSelected && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Save button */}
            <div className="p-5 pt-3 shrink-0 border-t border-slate-100">
                <button
                    onClick={() => { onSave(selected); onClose(); }}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-extrabold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
                >
                    <Check className="w-4 h-4" strokeWidth={3} /> Save Interests
                </button>
            </div>
        </motion.div>
    );
};

const EditProfileHub = ({ setView }) => {
    const { userProfile, updateProfile, updateBasicInfo } = useUser();
    const [editingBasic, setEditingBasic] = useState(null);
    const [showInterestsModal, setShowInterestsModal] = useState(false);

    const BASIC_CONFIG = [
        { icon: Briefcase, label: 'Work', value: userProfile.basics['Work'] },
        { icon: GraduationCap, label: 'Education', value: userProfile.basics['Education'] },
        { icon: MapPin, label: 'Location', value: userProfile.basics['Location'] },
        { icon: Home, label: 'Hometown', value: userProfile.basics['Hometown'] },
        { icon: Search, label: 'Interested in', value: userProfile.basics['Interested in'] },
        { icon: Ruler, label: 'Height', value: userProfile.basics['Height'] },
        { icon: Search, label: 'Looking for', value: userProfile.basics['Looking for'] },
        { icon: Heart, label: 'Relationship Type', value: userProfile.basics['Relationship Type'] },
        { icon: Baby, label: 'Family Plans', value: userProfile.basics['Family Plans'] },
        { icon: Globe, label: 'Languages', value: userProfile.basics['Languages'] },
        { icon: Wine, label: 'Drinking', value: userProfile.basics['Drinking'] },
        { icon: Coffee, label: 'Smoking', value: userProfile.basics['Smoking'] },
        { icon: Dumbbell, label: 'Workout', value: userProfile.basics['Workout'] },
        { icon: Moon, label: 'Sleeping Habits', value: userProfile.basics['Sleeping Habits'] }
    ];

    return (
        <div className="absolute inset-0 z-[100]">
            <AnimatePresence>
                {editingBasic && <BasicsModal item={editingBasic} onClose={() => setEditingBasic(null)} updateBasicInfo={updateBasicInfo} />}
                {showInterestsModal && (
                    <InterestsModal
                        currentInterests={userProfile.interests}
                        onClose={() => setShowInterestsModal(false)}
                        onSave={(newInterests) => updateProfile('interests', newInterests)}
                    />
                )}
            </AnimatePresence>
            
            <motion.div 
                key="edit"
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: 20 }} 
                className="h-full overflow-y-auto no-scrollbar bg-slate-50 pb-20 relative transition-colors duration-300"
            >
                {/* Header Sticky */}
                <div className="sticky top-0 z-50 bg-slate-50/90 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-slate-200">
                    <button onClick={() => setView('main')} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100 text-slate-600 hover:bg-slate-100 transition">
                        <ChevronLeft className="w-6 h-6 pr-0.5" />
                    </button>
                    <h1 className="font-bold text-slate-800 text-lg">Edit Profile</h1>
                    <div className="w-10"></div>
                </div>

                <div className="p-4 space-y-8">
                    {/* Photos Grid - Static visual */}
                    <section>
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Photos & Videos</h2>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden aspect-[4/5] bg-slate-200 border-2 border-dashed border-slate-300 cursor-pointer group">
                                <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=400&q=80" alt="Main slot" className="w-full h-full object-cover" />
                            </div>
                            <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-200 border-2 border-dashed border-slate-300 cursor-pointer">
                                <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80" alt="Slot 2" className="w-full h-full object-cover" />
                            </div>
                            <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center">
                                <Plus className="w-8 h-8 text-slate-400" />
                            </div>
                            {[4,5,6].map(i => (
                                <div key={i} className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center">
                                    <Plus className="w-8 h-8 text-slate-400" />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Bio Textarea */}
                    <section>
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">About Me</h2>
                        <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm">
                            <textarea 
                                className="w-full bg-transparent resize-none outline-none text-slate-700 font-medium placeholder-slate-400" 
                                rows="3"
                                placeholder="Write a short intro about yourself..."
                                value={userProfile.bio}
                                onChange={(e) => updateProfile('bio', e.target.value)}
                            ></textarea>
                        </div>
                    </section>

                    {/* Profile Prompts */}
                    <section>
                        <div className="flex justify-between items-center mb-3 px-2">
                            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Profile Prompts</h2>
                            <span className="text-xs font-bold text-indigo-500">{userProfile.prompts.length}/3</span>
                        </div>
                        <div className="space-y-3">
                            {userProfile.prompts.map((prompt) => (
                                <div key={prompt.id} onClick={() => setView('prompts')} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 cursor-pointer hover:border-indigo-300 transition">
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">{prompt.question}</p>
                                    <h3 className="text-xl font-bold text-slate-800">{prompt.answer}</h3>
                                </div>
                            ))}
                            {userProfile.prompts.length < 3 && (
                                <div onClick={() => setView('prompts')} className="bg-slate-100 rounded-3xl p-6 border-2 border-dashed border-slate-300 cursor-pointer flex flex-col items-center justify-center text-slate-400 h-32 gap-2">
                                    <Plus className="w-8 h-8" />
                                    <span className="font-bold text-sm">Add a prompt</span>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Interests */}
                    <section>
                        <div className="flex justify-between items-center mb-3 px-2">
                            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Interests</h2>
                            <button
                                onClick={() => setShowInterestsModal(true)}
                                className="text-xs font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full hover:bg-indigo-100 transition"
                            >
                                Edit
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {userProfile.interests.map((tag, idx) => {
                                const match = ALL_INTERESTS.find(i => i.label === tag);
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => setShowInterestsModal(true)}
                                        className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 border border-indigo-100 px-3.5 py-2 rounded-full text-sm font-bold shadow-sm cursor-pointer hover:bg-indigo-100 transition"
                                    >
                                        {match && <span>{match.emoji}</span>}
                                        {tag}
                                    </div>
                                );
                            })}
                            <div
                                onClick={() => setShowInterestsModal(true)}
                                className="flex items-center gap-1 bg-slate-100 text-slate-500 border border-slate-200 px-3.5 py-2 rounded-full text-sm font-bold cursor-pointer hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition"
                            >
                                <Plus className="w-4 h-4" /> Add
                            </div>
                        </div>
                    </section>

                    {/* The Basics */}
                    {/* The Basics */}
                    <section>
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">The Basics</h2>
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
                            {BASIC_CONFIG.map((item, idx) => (
                                <div key={idx} onClick={() => setEditingBasic(item)} className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition">
                                    <div className="flex items-center gap-3">
                                        <item.icon className="w-5 h-5 text-slate-400" />
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
                                            <span className="font-semibold text-slate-700">{item.value}</span>
                                        </div>
                                    </div>
                                    <ChevronLeft className="w-5 h-5 rotate-180 text-slate-300" />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Connected Accounts */}
                    <section>
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Connected Accounts</h2>
                        <div className="space-y-3">
                            <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gradient-to-tr from-yellow-400 via-rose-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                                        <Camera className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-slate-700 text-lg">Instagram</span>
                                </div>
                                <span className="text-sm font-bold text-indigo-500 bg-indigo-50 px-3 py-1.5 rounded-full">Connect</span>
                            </div>
                            <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-[#1DB954] rounded-full flex items-center justify-center text-white">
                                        <Play className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-slate-700 text-lg">Spotify</span>
                                </div>
                                <span className="text-sm font-bold text-indigo-500 bg-indigo-50 px-3 py-1.5 rounded-full">Connect</span>
                            </div>
                        </div>
                    </section>
            </div>
        </motion.div>
        </div>
    );
};

export default Profile;
