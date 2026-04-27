import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Compass, X, Star, Heart as HeartIcon } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import SwipeCard from './SwipeCard';

const Discover = () => {
    const { discoverQueue, setDiscoverQueue } = useUser();

    const handleSwipe = (id) => {
        setDiscoverQueue(prev => prev.filter(card => card.id !== id));
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col relative bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="pt-6 pb-2 px-6 flex justify-between items-center z-10 shrink-0">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Discover</h1>
                <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-sm flex items-center justify-center border border-slate-100 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                    <Settings className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                </div>
            </div>

            <div className="flex-1 relative flex items-center justify-center overflow-hidden w-full pb-4">
                {discoverQueue.length === 0 ? (
                    <div className="text-slate-400 text-center flex flex-col items-center">
                        <Compass className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>No more profiles nearby.</p>
                    </div>
                ) : (
                    <AnimatePresence>
                        {discoverQueue.map((card, index) => (
                            <SwipeCard key={card.id} card={card} index={index} isTop={index === 0} onSwipe={() => handleSwipe(card.id)} />
                        ))}
                    </AnimatePresence>
                )}
                
                {/* Floating Interaction Buttons */}
                {discoverQueue.length > 0 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center gap-5 z-20 bg-white/70 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg border border-white/40">
                        <button onClick={() => discoverQueue.length && handleSwipe(discoverQueue[0].id)} className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-rose-500 hover:bg-rose-50 transition border border-slate-100">
                            <X className="w-5 h-5" strokeWidth={3} />
                        </button>
                        <button onClick={() => discoverQueue.length && handleSwipe(discoverQueue[0].id)} className="w-[34px] h-[34px] bg-white rounded-full shadow-md flex items-center justify-center text-indigo-500 hover:bg-indigo-50 transition border border-slate-100">
                            <Star className="w-4 h-4 fill-indigo-500" />
                        </button>
                        <button onClick={() => discoverQueue.length && handleSwipe(discoverQueue[0].id)} className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full shadow-md flex items-center justify-center text-white hover:opacity-90 transition">
                            <HeartIcon className="w-5 h-5 fill-white" />
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Discover;
