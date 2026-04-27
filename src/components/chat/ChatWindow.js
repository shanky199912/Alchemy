import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Phone, Video, Send, Smile, Plus, MoreVertical, Image as ImageIcon, Mic } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const ChatWindow = ({ chat, setView }) => {
    const { userProfile } = useUser();
    const [messages, setMessages] = useState([
        { id: 1, text: "Hey! That sounds like a perfect weekend! 😊", sender: 'them', time: '10:24 AM' },
        { id: 2, text: "I know right? Nothing beats a good coffee and some architecture browsing.", sender: 'me', time: '10:25 AM' },
        { id: 3, text: chat.msg, sender: 'them', time: '10:26 AM' }
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const getSmartBotReply = (userMsg) => {
        const msg = userMsg.toLowerCase();
        if (msg.includes('hello') || msg.includes('hi')) return "Hey Alex! How is your day going? detected some good vibes from your profile today.";
        if (msg.includes('coffee')) return "I am actually a huge fan of pour-overs. Have you been to that new spot in Soho?";
        if (msg.includes('date')) return "I'd love to! How about we grab a drink this Thursday? I know a place with great jazz.";
        return "That's so interesting! Tell me more about that. I love how you think.";
    };

    const handleSend = () => {
        if (!input.trim()) return;
        
        const newMessage = {
            id: Date.now(),
            text: input,
            sender: 'me',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages([...messages, newMessage]);
        setInput('');

        // Simulate AI Bot Reply
        setTimeout(() => {
            const botMsg = {
                id: Date.now() + 1,
                text: getSmartBotReply(input),
                sender: 'them',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botMsg]);
        }, 1500);
    };

    return (
        <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }} 
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-[100] bg-white dark:bg-slate-950 flex flex-col h-full transition-colors duration-300"
        >
            {/* Chat Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <button onClick={() => setView('main')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition text-slate-600 dark:text-slate-300">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <div className="relative">
                        <img src={chat.img} alt={chat.name} className="w-10 h-10 rounded-full object-cover border border-slate-100 dark:border-slate-700" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-950 rounded-full"></div>
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-800 dark:text-white leading-none">{chat.name}</h2>
                        <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Online</span>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition text-slate-400">
                        <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition text-slate-400">
                        <Video className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition text-slate-400">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-slate-50 dark:bg-slate-950/50">
                <div className="flex justify-center mb-6">
                    <span className="px-3 py-1 bg-slate-200/50 dark:bg-slate-800/50 rounded-full text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Yesterday</span>
                </div>
                
                {messages.map((msg) => (
                    <motion.div 
                        key={msg.id} 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm text-sm font-medium ${
                            msg.sender === 'me' 
                                ? 'bg-indigo-500 text-white rounded-tr-none' 
                                : 'bg-white dark:bg-slate-900 dark:text-slate-200 text-slate-700 rounded-tl-none border border-slate-100 dark:border-slate-800'
                        }`}>
                            <p className="leading-relaxed">{msg.text}</p>
                            <span className={`text-[9px] block mt-1.5 opacity-70 ${msg.sender === 'me' ? 'text-right' : ''}`}>{msg.time}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 rounded-2xl px-2 py-1.5 border border-transparent focus-within:border-indigo-200 dark:focus-within:border-indigo-900 transition">
                    <button className="p-2 text-slate-400 hover:text-indigo-500 transition">
                        <Plus className="w-5 h-5" />
                    </button>
                    <input 
                        type="text" 
                        placeholder="Type a message..." 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        className="flex-1 bg-transparent outline-none py-2 text-sm dark:text-white text-slate-700 font-medium"
                    />
                    <button className="p-2 text-slate-400 hover:text-indigo-500 transition">
                        <Smile className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className={`p-2.5 rounded-xl transition ${input.trim() ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-300 cursor-not-allowed'}`}
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex justify-around mt-3 px-2">
                    <button className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-400">
                            <ImageIcon className="w-5 h-5" />
                        </div>
                    </button>
                    <button className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-400">
                            <Mic className="w-5 h-5" />
                        </div>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ChatWindow;
