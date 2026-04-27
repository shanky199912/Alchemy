import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import Handpicked from './components/Handpicked';
import Discover from './components/discover/Discover';
import LikedYou from './components/LikedYou';
import ChatList from './components/chat/ChatList';
import MagicLab from './components/MagicLab';
import Profile from './components/Profile';
import BottomNav from './components/BottomNav';
import LandingPage from './components/auth/LandingPage';
import Onboarding from './components/auth/Onboarding';

import { useUser } from './context/UserContext';

export default function DatingAppPrototype() {
    const { appSettings, userStatus, activeTab, setActiveTab } = useUser();

    return (
        <div className="min-h-screen bg-slate-200 flex items-center justify-center py-4 font-sans selection:bg-indigo-100 transition-colors duration-300">
            {/* Mobile Device Mockup Wrapper */}
            <div className="w-full max-w-[414px] h-[850px] relative overflow-hidden shadow-2xl md:rounded-[40px] md:border-[12px] border-slate-900 flex flex-col transition-colors duration-300 bg-white">

                {userStatus === 'landing' && <LandingPage />}
                {userStatus === 'onboarding' && <Onboarding />}

                {userStatus === 'active' && (
                    <>
                        {/* Dynamic Content Area */}
                        <div className="flex-1 overflow-hidden relative transition-colors duration-300 bg-slate-50">
                            <AnimatePresence mode="wait">
                                {activeTab === 'matches' && <Handpicked key="matches" />}
                                {activeTab === 'discover' && <Discover key="discover" />}
                                {activeTab === 'liked' && <LikedYou key="liked" />}
                                {activeTab === 'chat' && <ChatList key="chat" />}
                                {activeTab === 'magic' && <MagicLab key="magic" />}
                                {activeTab === 'profile' && <Profile key="profile" />}
                            </AnimatePresence>
                        </div>

                        {/* Bottom Navigation */}
                        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
                    </>
                )}
            </div>
        </div>
    );
}
