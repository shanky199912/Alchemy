import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const LandingPage = () => {
    const { setUserStatus } = useUser();

    return (
        <div className="h-full flex flex-col bg-slate-50 text-slate-800 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

            <div className="flex-1 flex flex-col justify-center items-center px-8 z-10">
                <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-8 border border-slate-100 shadow-xl"
                >
                    <Sparkles className="w-12 h-12 text-indigo-500" />
                </motion.div>
                
                <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold tracking-tight text-center mb-4"
                >
                    Find Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-400">Perfect Match</span>
                </motion.h1>

                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-slate-400 text-center text-sm font-medium mb-12 max-w-xs"
                >
                    Discover a dating experience that actually respects your time and energy.
                </motion.p>

                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="w-full space-y-4"
                >
                    <button 
                        onClick={() => setUserStatus('onboarding')}
                        className="w-full bg-white text-slate-900 font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-100 transition shadow-lg"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>

                    <button 
                        onClick={() => setUserStatus('onboarding')}
                        className="w-full bg-slate-100 text-slate-700 font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-200 border border-slate-200 transition shadow-sm"
                    >
                        <Mail className="w-5 h-5" />
                        Continue with Email
                    </button>
                </motion.div>
                
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-xs text-slate-500 mt-8 text-center"
                >
                    By tapping Continue, you agree to our Terms and Privacy Policy.
                </motion.p>
            </div>
        </div>
    );
};

export default LandingPage;
