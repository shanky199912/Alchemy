import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Compass, X, Star, Heart as HeartIcon, MessageCircle } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { filterUsers } from '../../utils/FilteringLogic';
import SwipeCard from './SwipeCard';

/* ──────────────────────────────────────────────────
   Match Overlay
────────────────────────────────────────────────── */
const MatchOverlay = ({ user, onClose, onMessage }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-[200] bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-slate-800"
    >
        <motion.div
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="flex flex-col items-center w-full"
        >
            <h1 className="text-5xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-600 mb-8">
                IT'S A MATCH!
            </h1>

            <div className="flex justify-center items-center gap-4 mb-10">
                <div className="w-28 h-28 rounded-full border-4 border-indigo-500 overflow-hidden shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                    <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=400&q=80" alt="You" className="w-full h-full object-cover" />
                </div>
                <div className="w-28 h-28 rounded-full border-4 border-rose-500 overflow-hidden shadow-[0_0_20px_rgba(244,63,94,0.2)]">
                    <img src={user.img} alt={user.name} className="w-full h-full object-cover" />
                </div>
            </div>

            <p className="text-xl font-medium mb-12 text-center text-slate-600">
                You and <span className="font-bold text-slate-900">{user.name}</span> liked each other.
            </p>

            <button
                onClick={onMessage}
                className="w-full max-w-xs bg-gradient-to-r from-indigo-500 to-rose-500 text-white font-bold py-4 rounded-full mb-4 hover:scale-105 transition shadow-xl flex justify-center items-center gap-2"
            >
                <MessageCircle className="w-5 h-5 fill-white" /> Send a Message
            </button>
            <button
                onClick={onClose}
                className="w-full max-w-xs bg-slate-100 text-slate-600 font-bold py-4 rounded-full hover:bg-slate-200 transition border border-slate-200"
            >
                Keep Swiping
            </button>
        </motion.div>
    </motion.div>
);

/* ──────────────────────────────────────────────────
   Discover
────────────────────────────────────────────────── */
const Discover = () => {
    const { userProfile, discoverQueue, setDiscoverQueue, setMatchedUsers, setActiveTab, setActiveChat } = useUser();
    const [swipeCount, setSwipeCount]   = useState(0);
    const [currentMatch, setCurrentMatch] = useState(null);

    // Use FilteringLogic for consistent preference-based filtering
    const filteredQueue = filterUsers(discoverQueue, userProfile);

    const handleSwipe = (direction, id) => {
        const swipedUser = filteredQueue.find(u => u.id === id);
        setDiscoverQueue(prev => prev.filter(c => c.id !== id));

        if (direction === 'right' || direction === 'super') {
            const newCount = swipeCount + 1;
            setSwipeCount(newCount);

            if (newCount % 3 === 0 || direction === 'super') {
                setCurrentMatch(swipedUser);
                setMatchedUsers(prev => [
                    ...prev,
                    { ...swipedUser, unread: true, msg: 'Matched just now!' }
                ]);
            }
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col relative bg-slate-50">

            <AnimatePresence>
                {currentMatch && (
                    <MatchOverlay
                        user={currentMatch}
                        onClose={() => setCurrentMatch(null)}
                        onMessage={() => {
                            setActiveChat({ ...currentMatch, msg: `Hey ${currentMatch.name}! I loved your profile 💬` });
                            setActiveTab('chat');
                            setCurrentMatch(null);
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="pt-6 pb-2 px-6 flex justify-between items-center z-10 shrink-0">
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Discover</h1>
                <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100 cursor-pointer hover:bg-slate-50 transition">
                    <Settings className="w-5 h-5 text-slate-600" />
                </div>
            </div>

            {/* Card Stack */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden w-full pb-4">
                {filteredQueue.length === 0 ? (
                    <div className="text-slate-400 text-center flex flex-col items-center gap-3">
                        <Compass className="w-12 h-12 opacity-20" />
                        <p className="font-medium">No more profiles nearby.</p>
                        <p className="text-sm text-slate-300">Check back later!</p>
                    </div>
                ) : (
                    <AnimatePresence>
                        {filteredQueue.slice(0, 3).map((card, index) => (
                            <SwipeCard
                                key={card.id}
                                card={card}
                                index={index}
                                isTop={index === 0}
                                onSwipe={(dir) => handleSwipe(dir, card.id)}
                            />
                        )).reverse()}
                    </AnimatePresence>
                )}

                {/* Floating Action Buttons */}
                {filteredQueue.length > 0 && !currentMatch && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center gap-5 z-20 bg-white/70 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg border border-white/40">
                        <button
                            onClick={() => handleSwipe('left', filteredQueue[0].id)}
                            className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-rose-500 hover:bg-rose-50 transition border border-slate-100"
                        >
                            <X className="w-5 h-5" strokeWidth={3} />
                        </button>
                        <button
                            onClick={() => handleSwipe('super', filteredQueue[0].id)}
                            className="w-[34px] h-[34px] bg-white rounded-full shadow-md flex items-center justify-center text-indigo-500 hover:bg-indigo-50 transition border border-slate-100"
                        >
                            <Star className="w-4 h-4 fill-indigo-500" />
                        </button>
                        <button
                            onClick={() => handleSwipe('right', filteredQueue[0].id)}
                            className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full shadow-md flex items-center justify-center text-white hover:opacity-90 transition"
                        >
                            <HeartIcon className="w-5 h-5 fill-white" />
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Discover;
