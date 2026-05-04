import React, { useMemo } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FlaskConical, Play, BadgeCheck, Video, Mic, Sparkles } from 'lucide-react';
import { isActiveRecently } from '../../utils/FilteringLogic';
import { calculateResonance } from '../../utils/resonanceEngine';
import { useUser } from '../../context/UserContext';

const SwipeCard = ({ card, isTop, onSwipe }) => {
    const x       = useMotionValue(0);
    const rotate  = useTransform(x, [-200, 200], [-10, 10]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

    // Swipe direction indicators
    const likeOpacity  = useTransform(x, [20, 100], [0, 1]);
    const nopeOpacity  = useTransform(x, [-100, -20], [1, 0]);

    const waveHeights = [30, 60, 40, 80, 100, 50, 70, 90, 40, 60, 30, 80, 50, 90, 40, 60, 80, 100, 50, 30];
    const active      = isActiveRecently(card);
    const { userProfile } = useUser();

    // Performance-optimized compatibility calculation
    const resonanceScore = useMemo(() => {
        return calculateResonance(userProfile, card);
    }, [userProfile, card]);

    // Tier-based styles and labels
    const tierStyles = useMemo(() => {
        if (resonanceScore >= 90) return {
            label: 'Soulmate',
            emoji: '✨',
            border: 'border-amber-400/80',
            text: 'text-amber-400',
            bg: 'bg-amber-400/10'
        };
        if (resonanceScore >= 80) return {
            label: 'High Vibe',
            emoji: '⚡',
            border: 'border-indigo-500/80',
            text: 'text-indigo-400',
            bg: 'bg-indigo-500/10'
        };
        return {
            label: 'Match',
            emoji: '🤝',
            border: 'border-white/40',
            text: 'text-white',
            bg: 'bg-white/10'
        };
    }, [resonanceScore]);

    return (
        <motion.div
            style={{ x, rotate, opacity: isTop ? opacity : 1 }}
            drag={isTop ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, { offset }) => {
                if (Math.abs(offset.x) > 100) onSwipe(offset.x > 0 ? 'right' : 'left');
            }}
            className="absolute w-[96%] h-[97%] max-h-[750px] bg-slate-50 rounded-[24px] shadow-xl overflow-hidden cursor-grab active:cursor-grabbing border border-slate-200"
        >
            {/* Like / Nope Overlays */}
            <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 left-6 z-30 bg-emerald-500 text-white font-black text-2xl px-5 py-2 rounded-2xl border-4 border-emerald-300 rotate-[-12deg] pointer-events-none shadow-lg">
                LIKE ✓
            </motion.div>
            <motion.div style={{ opacity: nopeOpacity }} className="absolute top-8 right-6 z-30 bg-rose-500 text-white font-black text-2xl px-5 py-2 rounded-2xl border-4 border-rose-300 rotate-[12deg] pointer-events-none shadow-lg">
                NOPE ✗
            </motion.div>

            {/* Scrollable Rich Content */}
            <div
                className="w-full h-full overflow-y-auto no-scrollbar pointer-events-auto scroll-smooth pb-28"
                style={{ touchAction: 'pan-y', overscrollBehaviorY: 'contain' }}
            >
                {/* ── Tile 1: Hero Photo ── */}
                <div className="relative w-full aspect-[4/5] max-h-[600px] shrink-0">
                    <img src={card.img} alt={card.name} className="w-full h-full object-cover pointer-events-none rounded-b-[24px]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/20 pointer-events-none rounded-b-[24px]" />

                    {/* Active dot & Resonance Badge */}
                    <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                        {active && (
                            <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                <span className="text-white text-[10px] font-black uppercase tracking-wider">Active Now</span>
                            </div>
                        )}
                        
                        {/* Alchemy Resonance Badge */}
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-xl border-2 shadow-lg ${tierStyles.border} ${tierStyles.bg}`}
                        >
                            <Sparkles className={`w-3.5 h-3.5 ${tierStyles.text} fill-current`} />
                            <div className="flex flex-col leading-none">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${tierStyles.text}`}>
                                    {resonanceScore}% {tierStyles.label}
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    <div className="absolute bottom-6 left-5 right-5 text-white pointer-events-none">
                        <h2 className="text-[38px] font-bold flex items-center gap-3 tracking-tight drop-shadow-md leading-none mb-1">
                            {card.name} <span className="font-medium text-3xl mb-0.5">{card.age}</span>
                            {card.verified && <BadgeCheck className="w-7 h-7 text-blue-400 fill-blue-400/20" />}
                        </h2>
                        {card.pronouns && (
                            <span className="text-xs text-white/70 font-medium">{card.pronouns}</span>
                        )}
                        <div className="flex items-center gap-1.5 opacity-90 drop-shadow-md text-sm mt-2">
                            <span className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">📍</span>
                            <span className="font-medium">{card.distance} • {card.region || 'India'}</span>
                        </div>
                    </div>
                </div>

                {/* ── Interests ── */}
                {card.interests && card.interests.length > 0 && (
                    <div className="px-5 pt-5 pb-3 shrink-0 bg-slate-50">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Interests</p>
                        <div className="flex flex-wrap gap-2">
                            {card.interests.map((tag, idx) => (
                                <div key={idx} className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1.5 rounded-full text-xs font-bold">
                                    <span>{tag.emoji}</span>
                                    <span>{tag.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Magic Lab (Personality Chips) ── */}
                <div className="flex flex-wrap gap-2 px-5 py-4 shrink-0 bg-slate-50">
                    {card.chips.map((chip, idx) => (
                        <div key={idx} className="bg-white text-slate-600 px-4 py-2 rounded-full text-xs font-bold shadow-sm border border-slate-200 flex items-center gap-1.5">
                            <FlaskConical className="w-3.5 h-3.5 text-indigo-400" /> {chip}
                        </div>
                    ))}
                </div>

                {/* ── Prompts ── */}
                {card.prompts && card.prompts.length > 0 && (
                    <div className="px-5 pb-4 space-y-3 shrink-0 bg-slate-50">
                        {card.prompts.map((prompt, idx) => (
                            <div key={idx} className="bg-white rounded-[20px] p-5 shadow-sm border border-slate-200">
                                <p className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest mb-2">{prompt.question}</p>
                                <h3 className="text-lg font-bold text-slate-800 leading-snug">"{prompt.answer}"</h3>
                            </div>
                        ))}
                    </div>
                )}

                {/* ── Voice Prompt ── */}
                <div className="px-5 pb-5 shrink-0 bg-slate-50">
                    <div className="bg-white rounded-[20px] p-5 shadow-sm border border-slate-200">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">{card.voice_prompt}</p>
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

                {/* ── Video Prompt placeholder ── */}
                <div className="px-5 pb-5 shrink-0 bg-slate-50">
                    <div className="bg-white border border-slate-200 rounded-[20px] overflow-hidden shadow-sm">
                        <div className="w-full aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center gap-2 relative">
                            <Video className="w-10 h-10 text-slate-300" />
                            <span className="text-xs font-bold text-slate-400">Video Prompt</span>
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full">
                                <span className="text-white text-[10px] font-bold">🔒 Premium</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Secondary Image ── */}
                <div className="px-5 pb-8 shrink-0 bg-slate-50">
                    <div className="bg-white border border-slate-200 rounded-[20px] p-4 shadow-sm">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">A Sunday afternoon well spent</p>
                        <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-100">
                            <img src={card.secondary_img} alt="Secondary" className="w-full h-full object-cover pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default SwipeCard;
