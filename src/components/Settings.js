import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronLeft, MapPin, Globe, Bell, Mail, Smartphone, 
    Moon, Ruler, LogOut, Trash2, PauseCircle, CheckCheck, Search
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const LocationModal = ({ setLocView, updateAppSetting, currentLocation }) => {
    const CITIES = ['New York', 'Los Angeles', 'Chicago', 'London', 'Paris', 'Tokyo', 'Sydney', 'Toronto', 'Berlin'];
    const [search, setSearch] = useState('');

    const filtered = CITIES.filter(c => c.toLowerCase().includes(search.toLowerCase()));

    return (
        <motion.div 
            key="location_modal"
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 50 }} 
            className="absolute inset-0 z-[200] dark:bg-slate-950 bg-slate-50 flex flex-col h-full transition-colors duration-300"
        >
            <div className="px-4 py-4 flex items-center justify-between border-b dark:border-slate-800 border-slate-200 shrink-0">
                <button onClick={() => setLocView(false)} className="w-10 h-10 dark:bg-slate-800 bg-white rounded-full shadow-sm flex items-center justify-center border dark:border-slate-700 border-slate-100 dark:text-slate-300 text-slate-600 hover:bg-slate-100 transition">
                    <ChevronLeft className="w-6 h-6 pr-0.5" />
                </button>
                <h1 className="font-bold dark:text-white text-slate-800 text-lg">Choose Location</h1>
                <div className="w-10"></div>
            </div>

            <div className="p-4">
                <div className="relative">
                    <Search className="w-5 h-5 absolute left-4 top-3.5 dark:text-slate-400 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search for a city..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full dark:bg-slate-900 bg-white dark:border-slate-800 border-slate-200 border rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-indigo-500 transition dark:text-white text-slate-800 font-medium"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-4 pt-0">
                <div className="dark:bg-slate-900 bg-white rounded-3xl border dark:border-slate-800 border-slate-200 shadow-sm overflow-hidden divide-y dark:divide-slate-800 divide-slate-100">
                    {filtered.map(city => (
                        <div 
                            key={city}
                            onClick={() => {
                                updateAppSetting('location', city);
                                setLocView(false);
                            }}
                            className="p-4 flex items-center justify-between cursor-pointer dark:hover:bg-slate-800 hover:bg-slate-50 transition"
                        >
                            <span className={`font-semibold ${currentLocation === city ? 'text-indigo-500' : 'dark:text-slate-200 text-slate-700'}`}>{city}</span>
                            {currentLocation === city && <CheckCheck className="w-5 h-5 text-indigo-500" />}
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="p-8 text-center text-slate-500 font-medium text-sm">No cities found.</div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const Settings = ({ setView }) => {
    const { appSettings, updateAppSetting } = useUser();
    const [locView, setLocView] = useState(false);

    const Toggle = ({ active, onClick }) => (
        <div 
            onClick={onClick} 
            className={`w-12 h-6 rounded-full relative cursor-pointer transition ${active ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-700'}`}
        >
            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${active ? 'left-6' : 'left-0.5'}`}></div>
        </div>
    );

    return (
        <div className="absolute inset-0 z-[150]">
            <AnimatePresence>
                {locView && <LocationModal key="locModal" setLocView={setLocView} updateAppSetting={updateAppSetting} currentLocation={appSettings.location} />}
            </AnimatePresence>

            <motion.div 
                key="settings"
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: 20 }} 
                className="absolute inset-0 bg-slate-50 dark:bg-slate-950 flex flex-col h-full transition-colors duration-300"
            >
                {/* Header Sticky */}
                <div className="sticky top-0 z-50 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 shrink-0 transition-colors duration-300">
                    <button onClick={() => setView('main')} className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-sm flex items-center justify-center border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition">
                        <ChevronLeft className="w-6 h-6 pr-0.5" />
                    </button>
                    <h1 className="font-bold text-slate-800 dark:text-white text-lg">Settings</h1>
                    <div className="w-10"></div>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-8 pb-12">
                    {/* Discovery Settings */}
                    <section>
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Discovery Settings</h2>
                        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 transition-colors duration-300">
                            <div onClick={() => setLocView(true)} className="p-4 flex items-center justify-between cursor-pointer dark:hover:bg-slate-800 hover:bg-slate-50 transition">
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-slate-400" />
                                    <span className="font-semibold text-slate-700 dark:text-slate-200">Location</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-500 font-medium text-sm">{appSettings.location}</span>
                                    <ChevronLeft className="w-5 h-5 rotate-180 text-slate-300 dark:text-slate-500" />
                                </div>
                            </div>
                            <div className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Globe className="w-5 h-5 text-slate-400" />
                                    <span className="font-semibold text-slate-700 dark:text-slate-200">Global Mode</span>
                                </div>
                                <Toggle active={appSettings.globalMode} onClick={() => updateAppSetting('globalMode', !appSettings.globalMode)} />
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-slate-700 dark:text-slate-200">Maximum Distance</span>
                                    <span className="font-bold text-slate-800 dark:text-white">{appSettings.distance} mi</span>
                                </div>
                                <input 
                                    type="range" min="1" max="100" value={appSettings.distance} 
                                    onChange={(e) => updateAppSetting('distance', parseInt(e.target.value))}
                                    className="w-full accent-indigo-500" 
                                />
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-slate-700 dark:text-slate-200">Age Range</span>
                                    <span className="font-bold text-slate-800 dark:text-white">{appSettings.ageRange[0]} - {appSettings.ageRange[1]}</span>
                                </div>
                                <input 
                                    type="range" min="18" max="65" value={appSettings.ageRange[1]} 
                                    onChange={(e) => updateAppSetting('ageRange', [appSettings.ageRange[0], Math.max(appSettings.ageRange[0] + 1, parseInt(e.target.value))])}
                                    className="w-full accent-indigo-500" 
                                />
                            </div>
                        </div>
                    </section>

                    {/* Account Settings */}
                    <section>
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Account Settings</h2>
                        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 transition-colors duration-300">
                            <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                                <div className="flex items-center gap-3">
                                    <Smartphone className="w-5 h-5 text-slate-400" />
                                    <span className="font-semibold text-slate-700 dark:text-slate-200">Phone Number</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-500 font-medium text-sm">+1 555-0199</span>
                                    <ChevronLeft className="w-5 h-5 rotate-180 text-slate-300 dark:text-slate-500" />
                                </div>
                            </div>
                            <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-slate-400" />
                                    <span className="font-semibold text-slate-700 dark:text-slate-200">Email Address</span>
                                </div>
                                <ChevronLeft className="w-5 h-5 rotate-180 text-slate-300 dark:text-slate-500" />
                            </div>
                        </div>
                    </section>

                    {/* App Preferences */}
                    <section>
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">App Preferences</h2>
                        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 transition-colors duration-300">
                            <div className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Bell className="w-5 h-5 text-slate-400" />
                                    <span className="font-semibold text-slate-700 dark:text-slate-200">Push Notifications</span>
                                </div>
                                <Toggle active={appSettings.pushNotifications} onClick={() => updateAppSetting('pushNotifications', !appSettings.pushNotifications)} />
                            </div>
                            <div className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <CheckCheck className="w-5 h-5 text-slate-400" />
                                    <span className="font-semibold text-slate-700 dark:text-slate-200">Read Receipts</span>
                                </div>
                                <Toggle active={appSettings.readReceipts} onClick={() => updateAppSetting('readReceipts', !appSettings.readReceipts)} />
                            </div>
                            <div className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Moon className="w-5 h-5 text-slate-400" />
                                    <span className="font-semibold text-slate-700 dark:text-slate-200">Dark Mode</span>
                                </div>
                                <Toggle active={appSettings.darkMode} onClick={() => updateAppSetting('darkMode', !appSettings.darkMode)} />
                            </div>
                            <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                                <div className="flex items-center gap-3">
                                    <Ruler className="w-5 h-5 text-slate-400" />
                                    <span className="font-semibold text-slate-700 dark:text-slate-200">Units</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-500 font-medium text-sm">{appSettings.units}</span>
                                    <ChevronLeft className="w-5 h-5 rotate-180 text-slate-300 dark:text-slate-500" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Danger Zone */}
                    <section>
                        <h2 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-3 px-2">Danger Zone</h2>
                        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 transition-colors duration-300">
                            <div className="p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition text-slate-700 dark:text-slate-300">
                                <PauseCircle className="w-5 h-5 text-slate-400" />
                                <span className="font-semibold">Pause My Account</span>
                            </div>
                            <div className="p-4 flex items-center gap-3 cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-900/20 transition text-rose-600 dark:text-rose-500">
                                <LogOut className="w-5 h-5" />
                                <span className="font-semibold">Log Out</span>
                            </div>
                            <div className="p-4 flex items-center gap-3 cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-900/20 transition text-rose-600 dark:text-rose-500">
                                <Trash2 className="w-5 h-5" />
                                <span className="font-semibold">Delete Account</span>
                            </div>
                        </div>
                    </section>
                    
                    <div className="text-center mt-10">
                        <p className="text-slate-400 text-xs font-bold">App Version 1.0.4 (Build 492)</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Settings;
