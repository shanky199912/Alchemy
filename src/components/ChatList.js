import React from 'react';
import { motion } from 'framer-motion';
import { Heart as HeartIcon } from 'lucide-react';
import { CHATS } from '../data/mockData';

const ChatList = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="p-6 pb-2">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Matches & Chats</h1>
        </div>

        {/* New Matches Horizontal Scroll */}
        <div className="px-6 py-4 flex gap-4 overflow-x-auto no-scrollbar border-b border-slate-100 dark:border-slate-800">
            <div className="flex flex-col items-center gap-2 cursor-pointer">
                <div className="w-16 h-16 rounded-full border-2 border-indigo-500 flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/30">
                    <HeartIcon className="w-6 h-6 text-indigo-500 dark:text-indigo-400 fill-indigo-500 dark:fill-indigo-400" />
                </div>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Likes</span>
            </div>
            {CHATS.map((chat) => (
                <div key={`match-${chat.id}`} className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition">
                    <div className="w-16 h-16 rounded-full border-2 border-transparent p-0.5 bg-gradient-to-tr from-indigo-500 to-rose-400">
                        <img src={chat.img} alt={chat.name} className="w-full h-full rounded-full object-cover border-2 border-white dark:border-slate-900" />
                    </div>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{chat.name}</span>
                </div>
            ))}
        </div>

        {/* Active Conversations */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-2 pb-6">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Messages</h2>
            {CHATS.map((chat) => (
                <div key={`msg-${chat.id}`} className="flex items-center gap-4 p-3 hover:bg-white dark:hover:bg-slate-900 rounded-2xl transition cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-800 hover:shadow-sm">
                    <img src={chat.img} alt={chat.name} className="w-14 h-14 rounded-full object-cover shadow-sm" />
                    <div className="flex-1 min-w-0">
                        <h3 className={`text-base font-semibold ${chat.unread ? 'text-slate-800 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>{chat.name}</h3>
                        <p className={`text-sm truncate ${chat.unread ? 'text-indigo-600 dark:text-indigo-400 font-medium' : 'text-slate-500 dark:text-slate-400'}`}>{chat.msg}</p>
                    </div>
                    {chat.unread && <div className="w-2.5 h-2.5 bg-indigo-500 dark:bg-indigo-400 rounded-full shrink-0" />}
                </div>
            ))}
        </div>
    </motion.div>
);

export default ChatList;
