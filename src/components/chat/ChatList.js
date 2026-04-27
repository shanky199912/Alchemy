import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart as HeartIcon } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import ChatWindow from './ChatWindow';

const ChatList = () => {
    const { matchedUsers, activeChat, setActiveChat } = useUser();

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col bg-slate-50 transition-colors duration-300 relative">
            <AnimatePresence>
                {activeChat && (
                    <ChatWindow 
                        key="chat-window"
                        user={activeChat} 
                        onClose={() => setActiveChat(null)} 
                    />
                )}
            </AnimatePresence>

            <div className="p-6 pb-2 shrink-0">
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Matches & Chats</h1>
            </div>

            {/* New Matches Horizontal Scroll */}
            <div className="px-6 py-4 flex gap-4 overflow-x-auto no-scrollbar border-b border-slate-100 shrink-0">
                <div className="flex flex-col items-center gap-2 cursor-pointer shrink-0">
                    <div className="w-16 h-16 rounded-full border-2 border-indigo-500 flex items-center justify-center bg-indigo-50">
                        <HeartIcon className="w-6 h-6 text-indigo-500 fill-indigo-500" />
                    </div>
                    <span className="text-xs font-medium text-slate-600">Likes</span>
                </div>
                
                {matchedUsers.map((chat) => (
                    <div key={`match-${chat.id}`} onClick={() => setActiveChat(chat)} className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition shrink-0">
                        <div className="w-16 h-16 rounded-full border-2 border-transparent p-0.5 bg-gradient-to-tr from-indigo-500 to-rose-400">
                            <img src={chat.img} alt={chat.name} className="w-full h-full rounded-full object-cover border-2 border-white" />
                        </div>
                        <span className="text-xs font-medium text-slate-700">{chat.name}</span>
                    </div>
                ))}
            </div>

            {/* Active Conversations */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-2 pb-6">
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Messages</h2>
                {matchedUsers.length === 0 ? (
                    <div className="text-center py-10 text-slate-500">
                        <p>No matches yet.</p>
                        <p className="text-sm mt-1">Keep swiping in Discover!</p>
                    </div>
                ) : (
                    matchedUsers.map((chat) => (
                        <div key={`msg-${chat.id}`} onClick={() => setActiveChat(chat)} className="flex items-center gap-4 p-3 hover:bg-white rounded-2xl transition cursor-pointer border border-transparent hover:border-slate-100 hover:shadow-sm">
                            <img src={chat.img} alt={chat.name} className="w-14 h-14 rounded-full object-cover shadow-sm" />
                            <div className="flex-1 min-w-0">
                                <h3 className={`text-base font-semibold ${chat.unread ? 'text-slate-800' : 'text-slate-600'}`}>{chat.name}</h3>
                                <p className={`text-sm truncate ${chat.unread ? 'text-indigo-600 font-medium' : 'text-slate-500'}`}>{chat.msg || "Start a conversation!"}</p>
                            </div>
                            {chat.unread && <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full shrink-0" />}
                        </div>
                    ))
                )}
            </div>
        </motion.div>
    );
};

export default ChatList;
