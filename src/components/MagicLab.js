import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Heart as HeartIcon, User } from 'lucide-react';

const MagicLab = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full p-6 overflow-y-auto no-scrollbar bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="mb-8 mt-2">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
                <FlaskConical className="w-6 h-6 text-indigo-500 dark:text-indigo-400" /> The Magic Lab
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Discover yourself to find better matches.</p>
        </div>

        <div className="space-y-4 pb-6">
            {/* Test Card 1 */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-[20px] shadow-sm border border-slate-100 dark:border-slate-800 cursor-pointer hover:shadow-md hover:border-indigo-100 dark:hover:border-indigo-900 transition group">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <span className="inline-block px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-md mb-2">COMPLETED</span>
                        <h3 className="font-bold text-slate-800 dark:text-white text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">Core Personality</h3>
                    </div>
                    <span className="text-indigo-500 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-900/30 w-10 h-10 flex items-center justify-center rounded-full">INTJ</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">You are analytical, strategic, and independent.</p>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full">
                    <div className="bg-indigo-500 dark:bg-indigo-400 h-2 rounded-full w-full"></div>
                </div>
            </div>

            {/* Test Card 2 */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-[20px] shadow-sm border border-slate-100 dark:border-slate-800 cursor-pointer hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <span className="inline-block px-2 py-1 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-xs font-bold rounded-md mb-2">IN PROGRESS</span>
                        <h3 className="font-bold text-slate-800 dark:text-white text-lg">Emotional Intelligence</h3>
                    </div>
                    <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center">
                        <HeartIcon className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                    </div>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Discover your attachment style and love language.</p>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mb-2">
                    <div className="bg-rose-400 h-2 rounded-full w-[40%]"></div>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">40% completed</p>
            </div>

            {/* Test Card 3 */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-[20px] shadow-sm border border-slate-100 dark:border-slate-800 cursor-pointer hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <span className="inline-block px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-md mb-2">LOCKED</span>
                        <h3 className="font-bold text-slate-800 dark:text-white text-lg">Social Archetype</h3>
                    </div>
                    <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                    </div>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Unlock by completing Emotional Intelligence.</p>
            </div>
        </div>
    </motion.div>
);

export default MagicLab;
