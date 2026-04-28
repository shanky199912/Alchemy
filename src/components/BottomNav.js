import React from 'react';
import { Sparkles, Compass, Heart, MessageCircle, User } from 'lucide-react';

const BottomNav = ({ activeTab, setActiveTab, setActiveChat }) => {
    const navItems = [
        { id: 'matches', icon: Sparkles, label: 'Matches' },
        { id: 'discover', icon: Compass, label: 'Discover' },
        { id: 'liked', icon: Heart, label: 'Liked You' },
        { id: 'chat', icon: MessageCircle, label: 'Chat' },
        { id: 'magic', icon: Sparkles, label: 'Magic Lab' },
        { id: 'profile', icon: User, label: 'Profile' },
    ];

    return (
        <div className="bg-white border-t border-slate-200 px-6 py-4 flex justify-between items-center z-50 shrink-0 transition-colors duration-300">
            {navItems.map((item) => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;
                
                return (
                    <button 
                        key={item.id}
                        onClick={() => {
                            setActiveTab(item.id);
                            if (item.id === 'chat' && setActiveChat) setActiveChat(null);
                        }}
                        className={`flex flex-col items-center gap-1 transition-all ${
                            isActive 
                                ? 'text-indigo-600 scale-110' 
                                : 'text-slate-400 hover:text-slate-600'
                        }`}
                    >
                        <div className="relative">
                            <Icon className={`w-6 h-6 ${isActive && item.id === 'magic' ? 'fill-indigo-600' : ''} ${isActive && item.id === 'liked' ? 'fill-indigo-600' : ''}`} />
                            {item.id === 'chat' && (
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 border-2 border-white rounded-full"></span>
                            )}
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

export default BottomNav;
