import React from 'react';
import { Sparkles, Compass, Heart, MessageCircle, User } from 'lucide-react';

const BottomNav = ({ activeTab, setActiveTab }) => {
    const navItems = [
        { id: 'matches', icon: Sparkles, label: 'Matches' },
        { id: 'discover', icon: Compass, label: 'Discover' },
        { id: 'liked', icon: Heart, label: 'Liked You' },
        { id: 'chat', icon: MessageCircle, label: 'Chat' },
        { id: 'magic', icon: Sparkles, label: 'Magic Lab' },
        { id: 'profile', icon: User, label: 'Profile' },
    ];

    return (
        <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center z-50 shrink-0 transition-colors duration-300">
            {navItems.map((item) => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;
                
                return (
                    <button 
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`flex flex-col items-center gap-1 transition-all ${
                            isActive 
                                ? 'text-indigo-600 dark:text-indigo-400 scale-110' 
                                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                        }`}
                    >
                        <div className="relative">
                            <Icon className={`w-6 h-6 ${isActive && item.id === 'magic' ? 'fill-indigo-600 dark:fill-indigo-400' : ''} ${isActive && item.id === 'liked' ? 'fill-indigo-600 dark:fill-indigo-400' : ''}`} />
                            {item.id === 'chat' && (
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                            )}
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

export default BottomNav;
