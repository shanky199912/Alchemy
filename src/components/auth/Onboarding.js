import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Camera, User, Calendar, MapPin, Edit3 } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const Onboarding = () => {
    const { setUserStatus, updateProfile, updateBasicInfo, userProfile } = useUser();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        age: 24,
        gender: 'Male',
        interestedIn: 'Everyone',
        bio: '',
        promptQuestion: "I'm weirdly obsessed with...",
        promptAnswer: ""
    });

    const updateForm = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleComplete = () => {
        // Save to global context
        updateProfile('name', formData.name || 'Alex');
        updateProfile('age', formData.age);
        updateProfile('bio', formData.bio);
        updateProfile('prompts', [
            { id: 1, question: formData.promptQuestion, answer: formData.promptAnswer || 'Coffee.' }
        ]);
        updateBasicInfo('Interested in', formData.interestedIn);
        updateBasicInfo('Location', 'Lives in India');
        
        // Transition to app
        setUserStatus('active');
    };

    const nextStep = () => {
        if (step < 5) setStep(step + 1);
        else handleComplete();
    };

    const ProgressBar = () => (
        <div className="flex gap-1 mb-8">
            {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
            ))}
        </div>
    );

    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950 p-6 pt-12 transition-colors duration-300">
            <ProgressBar />
            
            <div className="flex-1 overflow-y-auto no-scrollbar relative">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="step1" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="absolute inset-0">
                            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">What's your first name?</h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-8">You won't be able to change this later.</p>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input 
                                    type="text" 
                                    placeholder="Add your name" 
                                    value={formData.name}
                                    onChange={(e) => updateForm('name', e.target.value)}
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-lg font-bold outline-none focus:border-indigo-500 dark:focus:border-indigo-500 dark:text-white transition shadow-sm"
                                />
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div key="step2" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="absolute inset-0">
                            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Your Details</h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-8">Basic info to find better matches.</p>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">Age</label>
                                    <input 
                                        type="number" 
                                        value={formData.age}
                                        onChange={(e) => updateForm('age', e.target.value)}
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-lg font-bold outline-none focus:border-indigo-500 dark:text-white shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">Gender</label>
                                    <div className="flex gap-3">
                                        {['Male', 'Female', 'Non-binary'].map(g => (
                                            <div 
                                                key={g} 
                                                onClick={() => updateForm('gender', g)}
                                                className={`flex-1 py-3 text-center rounded-2xl font-bold cursor-pointer border transition ${formData.gender === g ? 'bg-indigo-50 border-indigo-500 text-indigo-600 dark:bg-indigo-900/30 dark:border-indigo-500 dark:text-indigo-400' : 'bg-white border-slate-200 text-slate-500 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400'}`}
                                            >
                                                {g}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">Interested In</label>
                                    <div className="flex gap-3">
                                        {['Male', 'Female', 'Everyone'].map(g => (
                                            <div 
                                                key={g} 
                                                onClick={() => updateForm('interestedIn', g)}
                                                className={`flex-1 py-3 text-center rounded-2xl font-bold cursor-pointer border transition ${formData.interestedIn === g ? 'bg-indigo-50 border-indigo-500 text-indigo-600 dark:bg-indigo-900/30 dark:border-indigo-500 dark:text-indigo-400' : 'bg-white border-slate-200 text-slate-500 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400'}`}
                                            >
                                                {g}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">Region</label>
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-lg font-bold text-slate-400 flex items-center gap-2 cursor-not-allowed">
                                        <MapPin className="w-5 h-5" /> India (Default)
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div key="step3" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="absolute inset-0">
                            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Add a Photo</h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-8">Show them your best angle.</p>
                            
                            <div className="aspect-[3/4] w-full max-w-[280px] mx-auto bg-slate-200 dark:bg-slate-800 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700 transition relative overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=400&q=80" alt="Mock Upload" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                                <div className="z-10 bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30 text-white">
                                    <Camera className="w-8 h-8" />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div key="step4" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="absolute inset-0">
                            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Write a Bio</h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-8">A little blurb about yourself.</p>
                            
                            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm relative">
                                <Edit3 className="absolute top-4 right-4 text-slate-300 w-5 h-5" />
                                <textarea 
                                    className="w-full bg-transparent resize-none outline-none dark:text-white text-slate-700 font-medium placeholder-slate-400" 
                                    rows="5"
                                    placeholder="I love long walks on the beach and..."
                                    value={formData.bio}
                                    onChange={(e) => updateForm('bio', e.target.value)}
                                ></textarea>
                            </div>
                        </motion.div>
                    )}

                    {step === 5 && (
                        <motion.div key="step5" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="absolute inset-0">
                            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Pick a Prompt</h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-8">The best way to start a conversation.</p>
                            
                            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                                <p className="text-xs font-bold text-indigo-500 uppercase mb-2">{formData.promptQuestion}</p>
                                <textarea 
                                    className="w-full text-xl font-bold bg-transparent resize-none outline-none dark:text-white text-slate-800 placeholder-slate-300" 
                                    rows="3"
                                    placeholder="Type your answer..."
                                    value={formData.promptAnswer}
                                    onChange={(e) => updateForm('promptAnswer', e.target.value)}
                                ></textarea>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="pt-6 shrink-0 z-20 bg-slate-50 dark:bg-slate-950">
                <button 
                    onClick={nextStep}
                    className="w-full bg-indigo-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-600 transition shadow-lg shadow-indigo-500/30"
                >
                    {step === 5 ? "Finish & Explore" : "Continue"} <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default Onboarding;
