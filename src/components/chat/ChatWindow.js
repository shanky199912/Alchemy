import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Phone, Video, Image as ImageIcon, Smile, Mic, Send, X } from 'lucide-react';

const EMOJIS = ['😂', '❤️', '😍', '🔥', '😊', '🙌', '🥺', '✨', '🤔', '😎', '💀', '💯'];

const ChatWindow = ({ user, onClose }) => {
    const [messages, setMessages] = useState([
        { id: 1, text: user.msg || "Hey there!", sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showEmojis, setShowEmojis] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const getSmartBotReply = (text, traits) => {
        const lower = text.toLowerCase();
        let reply = "That's interesting! Tell me more.";

        // Basic keyword parsing
        if (/\b(hi|hello|hey|yo)\b/.test(lower)) {
            reply = "Hey! How's your day going?";
        } else if (/\b(how are you|how r u|hru)\b/.test(lower)) {
            reply = "I'm doing great, thanks for asking! Just relaxing. What about you?";
        } else if (/\b(date|hang out|meet|coffee|drinks)\b/.test(lower)) {
            reply = "I'd love to! When are you free? ☕";
        } else if (/\b(name|who are you)\b/.test(lower)) {
            reply = `I'm ${user.name}! Nice to meet you 😊`;
        } else if (lower.includes('?')) {
            const answers = ["I'm not entirely sure, but I'd love to find out!", "Hmm, let me think about that...", "Definitely! What do you think?"];
            reply = answers[Math.floor(Math.random() * answers.length)];
        } else if (lower.includes('haha') || lower.includes('lol')) {
            reply = "Haha right? 😂";
        }

        // Add personality flavor based on traits
        const allTraits = traits.join(' ').toLowerCase();
        if (allTraits.includes('intj') && !lower.includes('?')) {
            reply += " Rationally speaking, I completely agree.";
        } else if (allTraits.includes('enfp')) {
            reply += " ✨ I love that energy!!";
        } else if (allTraits.includes('avoidant')) {
            reply = "Yeah, cool. Anyway I'm kinda busy right now.";
        }

        return reply;
    };

    const handleSend = () => {
        if (!inputText.trim()) return;

        const sentText = inputText;
        const newMsg = { id: Date.now(), text: sentText, sender: 'me' };
        setMessages(prev => [...prev, newMsg]);
        setInputText('');
        setShowEmojis(false);
        setIsTyping(true);

        setTimeout(() => {
            const botReply = getSmartBotReply(sentText, user.chips);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: botReply, sender: 'bot' }]);
            setIsTyping(false);
        }, 1500 + Math.random() * 1000); // 1.5 - 2.5 second typing delay
    };

    return (
        <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }} 
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-50 bg-slate-50 flex flex-col transition-colors duration-300"
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white border-b border-slate-200 shrink-0">
                <div className="flex items-center gap-3">
                    <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition">
                        <ChevronLeft className="w-6 h-6 text-slate-600" />
                    </button>
                    <div className="flex items-center gap-3">
                        <img src={user.img} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                            <h2 className="font-bold text-slate-800 leading-tight">{user.name}</h2>
                            <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Online</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Phone className="w-5 h-5 text-indigo-500 cursor-pointer hover:scale-110 transition" />
                    <Video className="w-5 h-5 text-indigo-500 cursor-pointer hover:scale-110 transition" />
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                <div className="text-center my-4">
                    <span className="bg-slate-200 text-slate-500 text-xs px-3 py-1 rounded-full font-medium">Today</span>
                </div>
                
                {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'bot' && (
                            <img src={user.img} alt={user.name} className="w-8 h-8 rounded-full mr-2 self-end object-cover shadow-sm" />
                        )}
                        <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                            msg.sender === 'me' 
                                ? 'bg-indigo-500 text-white rounded-br-sm shadow-md shadow-indigo-500/20' 
                                : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm shadow-sm'
                        }`}>
                            <p className="text-[15px]">{msg.text}</p>
                        </div>
                    </div>
                ))}
                
                {isTyping && (
                    <div className="flex justify-start">
                        <img src={user.img} alt={user.name} className="w-8 h-8 rounded-full mr-2 self-end object-cover opacity-50" />
                        <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 shadow-sm items-center h-[42px]">
                            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-200 shrink-0 relative">
                
                {/* Emoji Picker Popover */}
                <AnimatePresence>
                    {showEmojis && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute bottom-20 left-4 bg-white border border-slate-200 p-3 rounded-2xl shadow-xl z-10 w-64 grid grid-cols-4 gap-2"
                        >
                            <div className="col-span-4 flex justify-between items-center mb-1">
                                <span className="text-xs font-bold text-slate-400">Emojis</span>
                                <X className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" onClick={() => setShowEmojis(false)} />
                            </div>
                            {EMOJIS.map(emoji => (
                                <button 
                                    key={emoji} 
                                    onClick={() => setInputText(prev => prev + emoji)}
                                    className="text-2xl hover:bg-slate-100 rounded-lg p-1 transition flex items-center justify-center"
                                >
                                    {emoji}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex items-center gap-3 bg-slate-100 rounded-full px-4 py-2">
                    <ImageIcon className="w-5 h-5 text-slate-400 cursor-pointer hover:text-slate-600 transition" />
                    <button onClick={() => setShowEmojis(!showEmojis)}>
                        <Smile className={`w-5 h-5 transition ${showEmojis ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-600'}`} />
                    </button>
                    <input 
                        type="text" 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type a message..." 
                        className="flex-1 bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 text-[15px]"
                    />
                    {inputText.trim() ? (
                        <button onClick={handleSend} className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center -mr-1 shadow-md hover:bg-indigo-600 transition hover:scale-105">
                            <Send className="w-4 h-4 text-white ml-0.5" />
                        </button>
                    ) : (
                        <Mic className="w-5 h-5 text-slate-400 cursor-pointer hover:text-slate-600 transition" />
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ChatWindow;
