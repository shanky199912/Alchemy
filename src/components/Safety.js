import React from 'react';
import { motion } from 'framer-motion';
import { 
    ChevronLeft, ShieldCheck, EyeOff, ShieldAlert, BadgeCheck, 
    BellOff, Lock, HelpCircle, AlertTriangle 
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const Safety = ({ setView }) => {
    const { safetySettings, updateSafetySetting } = useUser();

    const Toggle = ({ active, onClick }) => (
        <div 
            onClick={onClick} 
            className={`w-12 h-6 rounded-full relative cursor-pointer transition ${active ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-700'}`}
        >
            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${active ? 'left-6' : 'left-0.5'}`}></div>
        </div>
    );

    return (
        <motion.div 
            key="safety"
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: 20 }} 
            className="absolute inset-0 z-[150] bg-slate-50 dark:bg-slate-950 flex flex-col h-full transition-colors duration-300"
        >
            {/* Header Sticky */}
            <div className="sticky top-0 z-50 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 shrink-0 transition-colors duration-300">
                <button onClick={() => setView('main')} className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-sm flex items-center justify-center border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition">
                    <ChevronLeft className="w-6 h-6 pr-0.5" />
                </button>
                <h1 className="font-bold text-slate-800 dark:text-white text-lg">Safety & Filters</h1>
                <div className="w-10"></div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-8 pb-12">
                
                {/* Hero / Banner */}
                <div className="bg-blue-500 p-6 rounded-3xl shadow-sm text-white flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md mb-4">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h2 className="font-bold text-xl mb-1">Your Safety Matters</h2>
                    <p className="text-blue-100 text-sm font-medium">Control who sees you and manage your interactions.</p>
                </div>

                {/* Visibility Settings */}
                <section>
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Visibility</h2>
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors duration-300">
                        <div className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-slate-800 dark:bg-slate-800 rounded-full flex items-center justify-center text-white shrink-0 mt-0.5">
                                    <EyeOff className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 dark:text-white">Incognito Mode</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 leading-snug">Only be seen by people you swipe right on. Includes a Premium badge.</p>
                                </div>
                            </div>
                            <Toggle active={safetySettings.incognito} onClick={() => updateSafetySetting('incognito', !safetySettings.incognito)} />
                        </div>
                    </div>
                </section>

                {/* Match Filters */}
                <section>
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Match Filters</h2>
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors duration-300">
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <BadgeCheck className="w-6 h-6 text-blue-500" />
                                <div>
                                    <h3 className="font-bold text-slate-800 dark:text-white">Verified Profiles Only</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Only see users who have photo-verified.</p>
                                </div>
                            </div>
                            <Toggle active={safetySettings.verifiedOnly} onClick={() => updateSafetySetting('verifiedOnly', !safetySettings.verifiedOnly)} />
                        </div>
                    </div>
                </section>

                {/* Privacy & Contacts */}
                <section>
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Privacy & Contacts</h2>
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 transition-colors duration-300">
                        <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                            <div className="flex items-center gap-3">
                                <ShieldAlert className="w-5 h-5 text-slate-400" />
                                <span className="font-semibold text-slate-700 dark:text-slate-200">Block Contacts</span>
                            </div>
                            <ChevronLeft className="w-5 h-5 rotate-180 text-slate-300 dark:text-slate-600" />
                        </div>
                        <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                            <div className="flex items-center gap-3">
                                <BellOff className="w-5 h-5 text-slate-400" />
                                <span className="font-semibold text-slate-700 dark:text-slate-200">Unmatched Profiles</span>
                            </div>
                            <ChevronLeft className="w-5 h-5 rotate-180 text-slate-300 dark:text-slate-600" />
                        </div>
                    </div>
                </section>

                {/* Safety Center Links */}
                <section>
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Safety Center</h2>
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 transition-colors duration-300">
                        <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                            <div className="flex items-center gap-3">
                                <Lock className="w-5 h-5 text-slate-400" />
                                <span className="font-semibold text-slate-700 dark:text-slate-200">Safety Tips & Best Practices</span>
                            </div>
                            <ChevronLeft className="w-5 h-5 rotate-180 text-slate-300 dark:text-slate-600" />
                        </div>
                        <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                            <div className="flex items-center gap-3">
                                <HelpCircle className="w-5 h-5 text-slate-400" />
                                <span className="font-semibold text-slate-700 dark:text-slate-200">Contact Support</span>
                            </div>
                            <ChevronLeft className="w-5 h-5 rotate-180 text-slate-300 dark:text-slate-600" />
                        </div>
                        <div className="p-4 flex items-center gap-3 cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-900/20 transition text-rose-600 dark:text-rose-500 border-t border-slate-100 dark:border-slate-800">
                            <AlertTriangle className="w-5 h-5" />
                            <span className="font-semibold">Report an Incident</span>
                        </div>
                    </div>
                </section>
                
            </div>
        </motion.div>
    );
};

export default Safety;
