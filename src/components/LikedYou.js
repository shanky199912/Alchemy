import React from 'react';
import { motion } from 'framer-motion';
import { Heart as HeartIcon } from 'lucide-react';
import { useUser } from '../context/UserContext';

const LikedYou = () => {
    const { discoverQueue } = useUser();
    // Simulate some users who liked you from the back of the queue
    const likedUsers = discoverQueue.slice(-10);

    return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full p-4 overflow-y-auto no-scrollbar bg-slate-50 transition-colors duration-300">
        <div className="mb-6 mt-2">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Likes You</h1>
            <p className="text-sm text-slate-500 mt-1">Upgrade to see everyone who liked you</p>
        </div>
        <div className="grid grid-cols-2 gap-4 pb-6">
            {likedUsers.map((user, idx) => (
                <div key={user.id} className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-slate-200 shadow-sm border border-slate-100 cursor-pointer">
                    <img
                        src={user.img}
                        alt="blurred profile"
                        className={`w-full h-full object-cover transition duration-300 ${idx > 0 ? 'blur-md scale-110' : 'hover:scale-105'}`}
                    />
                    <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black/70 to-transparent">
                        {idx === 0 ? (
                            <p className="text-white font-semibold">{user.name}, {user.age}</p>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <HeartIcon className="w-8 h-8 text-white/50 fill-white/30" />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </motion.div>
    );
};

export default LikedYou;
