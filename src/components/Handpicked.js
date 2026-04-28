import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles, BadgeCheck, FlaskConical, X, Heart as HeartIcon,
    MessageCircle, Play, AlertTriangle, ChevronLeft
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { filterUsers, isActiveRecently } from '../utils/FilteringLogic';

/* ──────────────────────────────────────────────────
   Expanded Full-Screen Profile View
────────────────────────────────────────────────── */
const ExpandedProfileView = ({ user, onClose, onLike, onMessage }) => {
    const [reported, setReported]   = useState(false);
    const [liked, setLiked]         = useState(false);
    const active = isActiveRecently(user);

    const waveHeights = [30, 60, 40, 80, 100, 50, 70, 90, 40, 60, 30, 80, 50, 90, 40, 60, 80, 100, 50, 30];

    const handleLike = () => {
        setLiked(true);
        onLike(user);
    };

    return (
        <motion.div
            layoutId={`card-${user.id}`}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0 z-[300] bg-slate-50 flex flex-col overflow-hidden"
        >
            {/* ── Sticky Action Header ── */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-white/90 backdrop-blur-md border-b border-slate-100 shrink-0">
                <button onClick={onClose} className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 transition">
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-2">
                    <motion.button
                        whileTap={{ scale: 0.93 }}
                        onClick={() => onMessage(user)}
                        className="flex items-center gap-1.5 bg-slate-100 text-slate-700 font-bold px-4 py-2 rounded-full text-sm hover:bg-slate-200 transition"
                    >
                        <MessageCircle className="w-4 h-4" /> Direct Message
                    </motion.button>
                    <motion.button
                        whileTap={{ scale: 0.93 }}
                        onClick={handleLike}
                        className={`flex items-center gap-1.5 font-bold px-4 py-2 rounded-full text-sm transition ${
                            liked
                                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-200'
                        }`}
                    >
                        <HeartIcon className={`w-4 h-4 ${liked ? 'fill-emerald-600' : 'fill-white'}`} />
                        {liked ? 'Interested ✓' : 'Interested'}
                    </motion.button>
                </div>
            </div>

            {/* ── Scrollable Body ── */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
                {/* Hero Photo */}
                <div className="relative w-full aspect-[4/5] shrink-0">
                    <img src={user.img} alt={user.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                    {active && (
                        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            <span className="text-white text-xs font-bold">Active Now</span>
                        </div>
                    )}

                    <div className="absolute bottom-6 left-5 right-5 text-white">
                        <h2 className="text-4xl font-bold flex items-center gap-3 tracking-tight leading-none mb-1">
                            {user.name} <span className="font-medium text-3xl">{user.age}</span>
                            {user.verified && <BadgeCheck className="w-7 h-7 text-blue-400 fill-blue-400/20" />}
                        </h2>
                        {user.pronouns && <p className="text-sm text-white/70 font-medium mb-2">{user.pronouns}</p>}
                        <div className="flex items-center gap-1.5 text-sm opacity-90">
                            <span>📍</span>
                            <span className="font-medium">{user.distance} • {user.region || 'India'}</span>
                        </div>
                    </div>
                </div>

                {/* Bio */}
                {user.bio && (
                    <div className="px-5 py-5">
                        <p className="text-slate-700 font-medium leading-relaxed text-base">{user.bio}</p>
                    </div>
                )}

                {/* Interests */}
                {user.interests && user.interests.length > 0 && (
                    <div className="px-5 pb-5">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Interests</p>
                        <div className="flex flex-wrap gap-2">
                            {user.interests.map((tag, idx) => (
                                <div key={idx} className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 border border-indigo-100 px-3.5 py-2 rounded-full text-sm font-bold">
                                    <span>{tag.emoji}</span><span>{tag.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Magic Lab chips */}
                <div className="px-5 pb-5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Personality</p>
                    <div className="flex flex-wrap gap-2">
                        {user.chips && user.chips.map((chip, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 bg-white text-slate-600 border border-slate-200 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
                                <FlaskConical className="w-3 h-3 text-indigo-400" /> {chip}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Prompts */}
                {user.prompts && user.prompts.length > 0 && (
                    <div className="px-5 pb-5 space-y-3">
                        {user.prompts.map((prompt, idx) => (
                            <div key={idx} className="bg-white rounded-[20px] p-5 shadow-sm border border-slate-200">
                                <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-2">{prompt.question}</p>
                                <h3 className="text-lg font-bold text-slate-800 leading-snug">"{prompt.answer}"</h3>
                            </div>
                        ))}
                    </div>
                )}

                {/* Voice Prompt */}
                <div className="px-5 pb-5">
                    <div className="bg-white rounded-[20px] p-5 shadow-sm border border-slate-200">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Voice Note</p>
                        <div className="flex items-center gap-4">
                            <button className="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center shrink-0 shadow-md">
                                <Play className="w-5 h-5 ml-0.5 fill-white" />
                            </button>
                            <div className="flex-1 flex items-center gap-1 h-8">
                                {waveHeights.map((h, i) => (
                                    <div key={i} className="w-[3px] bg-indigo-200 rounded-full" style={{ height: `${h}%` }} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Secondary Image */}
                <div className="px-5 pb-5">
                    <div className="bg-white border border-slate-200 rounded-[20px] p-4 shadow-sm">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">A Sunday afternoon well spent</p>
                        <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-100">
                            <img src={user.secondary_img} alt="Secondary" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                {/* ── Report / Block ── */}
                <div className="px-5 pb-8">
                    {reported ? (
                        <div className="flex items-center justify-center gap-2 text-slate-400 text-sm font-medium py-4">
                            <AlertTriangle className="w-4 h-4" /> Report submitted. Thank you.
                        </div>
                    ) : (
                        <button
                            onClick={() => setReported(true)}
                            className="w-full flex items-center justify-center gap-2 text-rose-400 text-sm font-semibold py-3 rounded-2xl hover:bg-rose-50 transition"
                        >
                            <AlertTriangle className="w-4 h-4" /> Report or Block {user.name}
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

/* ──────────────────────────────────────────────────
   Handpicked Main Component
────────────────────────────────────────────────── */
const Handpicked = () => {
    const { userProfile, discoverQueue, setMatchedUsers, setActiveChat, setActiveTab } = useUser();
    const [expandedUser, setExpandedUser] = useState(null);
    const [likedIds, setLikedIds]         = useState(new Set());
    const [toast, setToast]               = useState(null);

    // Filter by preference, verified float to top, take top 8
    const allFiltered = filterUsers(discoverQueue, userProfile);
    const topPicks    = allFiltered.slice(0, 8);

    const handleLike = (user) => {
        if (likedIds.has(user.id)) return;
        setLikedIds(prev => new Set([...prev, user.id]));
        setMatchedUsers(prev => [...prev, { ...user, unread: true, msg: 'Matched just now!' }]);
        showToast(`You liked ${user.name}! 💫`);
    };

    const handleDM = (user) => {
        setActiveChat({
            ...user,
            unread: false,
            msg: `Hey ${user.name}! I loved your profile 💬`,
        });
        setMatchedUsers(prev => {
            if (prev.find(u => u.id === user.id)) return prev;
            return [...prev, { ...user, unread: false, msg: `Hey ${user.name}! I loved your profile 💬` }];
        });
        setActiveTab('chat');
        setExpandedUser(null);
    };

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2500);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full relative overflow-hidden">

            {/* Toast */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-4 left-1/2 -translate-x-1/2 z-[400] bg-slate-800 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-xl"
                    >
                        {toast}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Expanded Profile */}
            <AnimatePresence>
                {expandedUser && (
                    <ExpandedProfileView
                        key={`expanded-${expandedUser.id}`}
                        user={expandedUser}
                        onClose={() => setExpandedUser(null)}
                        onLike={handleLike}
                        onMessage={handleDM}
                    />
                )}
            </AnimatePresence>

            {/* Card List */}
            <div className="h-full p-4 overflow-y-auto no-scrollbar">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 mt-1">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Top Picks</h1>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">Curated just for you ✦</p>
                    </div>
                    <Sparkles className="text-indigo-500 w-6 h-6" />
                </div>

                {topPicks.length === 0 && (
                    <div className="text-center py-16 text-slate-400">
                        <Sparkles className="w-10 h-10 mx-auto mb-3 opacity-20" />
                        <p className="font-medium">No top picks yet.</p>
                        <p className="text-sm mt-1">Try updating your preferences.</p>
                    </div>
                )}

                <div className="space-y-5 pb-6">
                    {topPicks.map((user) => {
                        const active    = isActiveRecently(user);
                        const isLiked   = likedIds.has(user.id);

                        return (
                            <motion.div
                                key={user.id}
                                layoutId={`card-${user.id}`}
                                onClick={() => setExpandedUser(user)}
                                className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-100 bg-white group cursor-pointer"
                                style={{ height: 380 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <img
                                    src={user.img}
                                    alt={user.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

                                {/* Top badges */}
                                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                                    <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-medium">
                                        <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> Highly Compatible
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {user.verified && (
                                            <div className="bg-blue-500/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1">
                                                <BadgeCheck className="w-3.5 h-3.5 text-white" />
                                                <span className="text-white text-[10px] font-bold">Verified</span>
                                            </div>
                                        )}
                                        {active && (
                                            <div className="bg-emerald-500/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1">
                                                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                                <span className="text-white text-[10px] font-bold">Active</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Bottom info */}
                                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-1">
                                        {user.name}, {user.age}
                                    </h2>
                                    {user.interests && user.interests.length > 0 && (
                                        <div className="flex gap-1.5 flex-wrap mb-3">
                                            {user.interests.slice(0, 3).map((tag, idx) => (
                                                <span key={idx} className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                    {tag.emoji} {tag.label}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {/* Quick actions */}
                                    <div className="flex gap-2 mt-2" onClick={e => e.stopPropagation()}>
                                        <button
                                            onClick={() => handleDM(user)}
                                            className="flex-1 bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-1.5 hover:bg-white/30 transition"
                                        >
                                            <MessageCircle className="w-4 h-4" /> Message
                                        </button>
                                        <button
                                            onClick={() => handleLike(user)}
                                            className={`flex-1 font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-1.5 transition ${
                                                isLiked
                                                    ? 'bg-emerald-500/80 backdrop-blur-md text-white border border-emerald-400/40'
                                                    : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                                            }`}
                                        >
                                            <HeartIcon className="w-4 h-4 fill-white" />
                                            {isLiked ? 'Interested ✓' : 'Interested'}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};

export default Handpicked;
