import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FlaskConical, Play } from 'lucide-react';

const SwipeCard = ({ card, isTop, onSwipe }) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-10, 10]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

    // Static waveform heights for visual mock
    const waveHeights = [30, 60, 40, 80, 100, 50, 70, 90, 40, 60, 30, 80, 50, 90, 40, 60, 80, 100, 50, 30];

    return (
        <motion.div
            style={{ x, rotate, opacity: isTop ? opacity : 1 }}
            drag={isTop ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, { offset }) => {
                if (Math.abs(offset.x) > 100) onSwipe();
            }}
            className="absolute w-[96%] h-[97%] max-h-[750px] bg-slate-50 rounded-[24px] shadow-xl overflow-hidden cursor-grab active:cursor-grabbing border border-slate-200"
        >
            {/* Scrollable Rich Content Container */}
            <div
                className="w-full h-full overflow-y-auto no-scrollbar pointer-events-auto scroll-smooth pb-28"
                style={{ touchAction: 'pan-y', overscrollBehaviorY: 'contain' }}
            >
                {/* Tile 1: The Hero */}
                <div className="relative w-full aspect-[4/5] max-h-[600px] shrink-0">
                    <img src={card.img} alt={card.name} className="w-full h-full object-cover pointer-events-none rounded-b-[24px]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/20 pointer-events-none rounded-b-[24px]" />

                    <div className="absolute bottom-6 left-5 right-5 text-white pointer-events-none">
                        <h2 className="text-[40px] font-bold flex items-end gap-3 tracking-tight drop-shadow-md leading-none mb-1">
                            {card.name} <span className="font-medium text-3xl mb-0.5">{card.age}</span>
                        </h2>
                        <div className="flex items-center gap-1.5 opacity-90 drop-shadow-md text-sm mt-2">
                            <span className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">📍</span>
                            <span className="font-medium">{card.distance}</span>
                        </div>
                    </div>
                </div>

                {/* The Magic Lab Bridge (Personality Chips) */}
                <div className="flex flex-wrap gap-2 px-5 py-6 shrink-0 bg-slate-50">
                    {card.chips.map((chip, idx) => (
                        <div key={idx} className="bg-white text-slate-600 px-4 py-2 rounded-full text-xs font-bold shadow-sm border border-slate-200 flex items-center gap-1.5">
                            <FlaskConical className="w-3.5 h-3.5 text-indigo-400" /> {chip}
                        </div>
                    ))}
                </div>

                {/* Tile 2: Voice Prompt */}
                <div className="px-5 pb-6 shrink-0 bg-slate-50">
                    <div className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-200">
                        <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-5">{card.voice_prompt}</p>
                        <div className="flex items-center gap-4">
                            <button className="w-14 h-14 bg-indigo-500 text-white rounded-full flex items-center justify-center shrink-0 shadow-md hover:bg-indigo-600 transition">
                                <Play className="w-6 h-6 ml-1 fill-white" />
                            </button>
                            <div className="flex-1 flex items-center gap-1 h-10">
                                {waveHeights.map((h, i) => (
                                    <div
                                        key={i}
                                        className="w-[3px] bg-indigo-200 rounded-full"
                                        style={{ height: `${h}%` }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tile 3: Image Prompt */}
                <div className="px-5 pb-6 shrink-0 bg-slate-50">
                    <div className="bg-white border border-slate-200 rounded-[20px] p-4 shadow-sm">
                        <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">A Sunday afternoon well spent</p>
                        <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-100">
                            <img src={card.secondary_img} alt="Secondary profile" className="w-full h-full object-cover pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Tile 4: Text Prompt */}
                <div className="px-5 pb-8 shrink-0 bg-slate-50">
                    <div className="bg-white rounded-[20px] p-8 shadow-sm border border-slate-200">
                        <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-4">{card.text_prompt_topic}</p>
                        <h3 className="text-[26px] font-bold text-slate-800 leading-tight tracking-tight">"{card.bio}"</h3>
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default SwipeCard;
