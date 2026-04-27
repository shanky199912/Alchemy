import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Heart as HeartIcon, User } from 'lucide-react';

const MagicLab = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full p-6 overflow-y-auto no-scrollbar bg-slate-50 transition-colors duration-300">
        <div className="mb-8 mt-2">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                <FlaskConical className="w-6 h-6 text-indigo-500" /> The Magic Lab
            </h1>
            <p className="text-sm text-slate-500 mt-2">Discover yourself to find better matches.</p>
        </div>

        <div className="space-y-4 pb-6">
            {/* Test Card 1 */}
            <div className="bg-white p-5 rounded-[20px] shadow-sm border border-slate-100 cursor-pointer hover:shadow-md hover:border-indigo-100 transition group">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <span className="inline-block px-2 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-md mb-2">COMPLETED</span>
                        <h3 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition">Core Personality</h3>
                    </div>
                    <span className="text-indigo-500 font-bold bg-indigo-50 w-10 h-10 flex items-center justify-center rounded-full">INTJ</span>
                </div>
                <p className="text-sm text-slate-500 mb-4">You are analytical, strategic, and independent.</p>
                <div className="w-full bg-slate-100 h-2 rounded-full">
                    <div className="bg-indigo-500 h-2 rounded-full w-full"></div>
                </div>
            </div>

            {/* Test Card 2 */}
            <div className="bg-white p-5 rounded-[20px] shadow-sm border border-slate-100 cursor-pointer hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <span className="inline-block px-2 py-1 bg-rose-50 text-rose-600 text-xs font-bold rounded-md mb-2">IN PROGRESS</span>
                        <h3 className="font-bold text-slate-800 text-lg">Emotional Intelligence</h3>
                    </div>
                    <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center">
                        <HeartIcon className="w-5 h-5 text-slate-400" />
                    </div>
                </div>
                <p className="text-sm text-slate-500 mb-4">Discover your attachment style and love language.</p>
                <div className="w-full bg-slate-100 h-2 rounded-full mb-2">
                    <div className="bg-rose-400 h-2 rounded-full w-[40%]"></div>
                </div>
                <p className="text-xs text-slate-400 font-medium">40% completed</p>
            </div>

            {/* Test Card 3 */}
            <div className="bg-white p-5 rounded-[20px] shadow-sm border border-slate-100 cursor-pointer hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-md mb-2">LOCKED</span>
                        <h3 className="font-bold text-slate-800 text-lg">Social Archetype</h3>
                    </div>
                    <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-slate-400" />
                    </div>
                </div>
                <p className="text-sm text-slate-500">Unlock by completing Emotional Intelligence.</p>
            </div>
        </div>
    </motion.div>
);

export default MagicLab;
