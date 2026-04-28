import React from 'react';
import { motion } from 'framer-motion';
import { Heart as HeartIcon, BadgeCheck } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { filterUsers, isActiveRecently } from '../utils/FilteringLogic';

const LikedYou = () => {
    const { userProfile, discoverQueue } = useUser();

    // Only show users who match your preference (simulated "liked you" pool)
    const allFiltered = filterUsers(discoverQueue, userProfile);
    const likedUsers  = allFiltered.slice(-12); // last 12 as "liked you" simulation

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full p-4 overflow-y-auto no-scrollbar bg-slate-50">
            {/* Header */}
            <div className="mb-6 mt-2">
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Likes You</h1>
                <p className="text-sm text-slate-500 mt-1">
                    {likedUsers.length} people who liked your profile
                </p>
            </div>

            {/* Upgrade Banner */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl p-4 mb-5 flex items-center gap-4 shadow-lg shadow-indigo-200">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                    <HeartIcon className="w-5 h-5 text-white fill-white" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-white text-sm">Upgrade to see everyone</p>
                    <p className="text-indigo-200 text-xs font-medium">Only the first profile is visible in free mode.</p>
                </div>
                <button className="bg-white text-indigo-600 font-bold text-xs px-3 py-1.5 rounded-full shrink-0">
                    Upgrade
                </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pb-6">
                {likedUsers.map((user, idx) => {
                    const active  = isActiveRecently(user);
                    const isBlurred = idx > 0;

                    return (
                        <div key={user.id} className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-slate-200 shadow-sm border border-slate-100 cursor-pointer">
                            <img
                                src={user.img}
                                alt={isBlurred ? 'blurred profile' : user.name}
                                className={`w-full h-full object-cover transition duration-300 ${isBlurred ? 'blur-md scale-110 saturate-0' : 'hover:scale-105'}`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                            {/* Badges (only visible on first card) */}
                            {!isBlurred && (
                                <div className="absolute top-2 left-2 flex flex-col gap-1">
                                    {user.verified && (
                                        <div className="flex items-center gap-1 bg-blue-500/90 backdrop-blur-md px-2 py-0.5 rounded-full">
                                            <BadgeCheck className="w-3 h-3 text-white" />
                                            <span className="text-white text-[9px] font-bold">Verified</span>
                                        </div>
                                    )}
                                    {active && (
                                        <div className="flex items-center gap-1 bg-emerald-500/90 backdrop-blur-md px-2 py-0.5 rounded-full">
                                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                            <span className="text-white text-[9px] font-bold">Active</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="absolute bottom-0 w-full p-3">
                                {!isBlurred ? (
                                    <p className="text-white font-semibold text-sm">{user.name}, {user.age}</p>
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <div className="bg-white/20 backdrop-blur-md rounded-full p-2">
                                            <HeartIcon className="w-5 h-5 text-white fill-white/60" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default LikedYou;
