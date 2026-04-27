import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, FlaskConical } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Handpicked = () => {
    const { discoverQueue } = useUser();
    // Simulate top picks from the middle of the queue
    const topPicks = discoverQueue.slice(10, 15);

    return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full p-4 overflow-y-auto no-scrollbar transition-colors duration-300">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Top Picks</h1>
            <Sparkles className="text-indigo-500 dark:text-indigo-400 w-6 h-6" />
        </div>
        <div className="space-y-6 pb-6">
            {topPicks.map((user) => (
                <div key={user.id} className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 group cursor-pointer h-96">
                    <img src={user.img} alt={user.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

                    <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-medium">
                        <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> Highly Compatible
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    {user.name}, {user.age} <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                                </h2>
                                <p className="text-sm text-slate-200 mt-1 opacity-90">{user.bio}</p>
                            </div>
                        </div>
                        <div className="mt-4 bg-indigo-500/80 backdrop-blur-sm rounded-xl p-3 flex items-start gap-2 border border-indigo-400/50">
                            <FlaskConical className="w-5 h-5 text-indigo-100 shrink-0" />
                            <p className="text-xs text-indigo-50 font-medium leading-relaxed">
                                Why this match? You both score high in Introverted Intuition & share a secure attachment style.
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </motion.div>
    );
};

export default Handpicked;
