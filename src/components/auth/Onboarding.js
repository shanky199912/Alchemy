import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Camera, User, MapPin, Edit3, BadgeCheck, Video, Mic } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const PROMPT_CATEGORIES = [
    { id: 'fun',     label: '😄 Fun',     prompts: ["I'm weirdly obsessed with...","My most controversial opinion is...","I will immediately trust you if...","Weirdest talent I have:"] },
    { id: 'deep',    label: '🌊 Deep',    prompts: ['A boundary of mine is...','The most important thing I am looking for is...','I feel most myself when...','Something that changed my perspective:'] },
    { id: 'virtues', label: '✨ Virtues', prompts: ['I take pride in...','The way to win me over is...','I go out of my way to...','My love language is...'] },
    { id: 'travel',  label: '✈️ Travel',  prompts: ['Best trip I ever took:','Place I dream of visiting:','I travel because...','My travel style is...'] },
    { id: 'food',    label: '🍜 Food',    prompts: ['My go-to comfort food:','Best meal I ever had:','I cook a mean...','I judge people who do not like...'] },
];

const INTEREST_TAGS = [
    {label:'Music',emoji:'🎵'},{label:'Cooking',emoji:'🍳'},{label:'Yoga',emoji:'🧘'},
    {label:'Tech',emoji:'💻'},{label:'Travel',emoji:'✈️'},{label:'Photography',emoji:'📷'},
    {label:'Gaming',emoji:'🎮'},{label:'Hiking',emoji:'🥾'},{label:'Coffee',emoji:'☕'},
    {label:'Reading',emoji:'📚'},{label:'Art',emoji:'🎨'},{label:'Fitness',emoji:'💪'},
    {label:'Movies',emoji:'🎬'},{label:'Dogs',emoji:'🐶'},{label:'Foodie',emoji:'🍜'},
    {label:'Dancing',emoji:'💃'},{label:'Meditation',emoji:'🌿'},{label:'Surfing',emoji:'🏄'},
    {label:'Astronomy',emoji:'🔭'},{label:'Cycling',emoji:'🚴'},
];

/* ── Age Drum Picker ── */
const AGES = Array.from({ length: 63 }, (_, i) => i + 18);
const ITEM_H = 56;

const AgePicker = ({ value, onChange }) => {
    const ref = useRef(null);
    const timer = useRef(null);
    useEffect(() => {
        const idx = AGES.indexOf(value);
        if (ref.current && idx !== -1) ref.current.scrollTop = idx * ITEM_H;
    }, []); // eslint-disable-line
    const onScroll = () => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            const idx = Math.max(0, Math.min(Math.round(ref.current.scrollTop / ITEM_H), AGES.length - 1));
            ref.current.scrollTop = idx * ITEM_H;
            onChange(AGES[idx]);
        }, 120);
    };
    return (
        <div className="relative mx-auto" style={{ width: 180 }}>
            <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-slate-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-slate-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute left-0 right-0 z-20 pointer-events-none" style={{ top: ITEM_H * 2, height: ITEM_H }}>
                <div className="h-full mx-3 rounded-2xl border-2 border-indigo-400 bg-indigo-50/60" />
            </div>
            <div ref={ref} onScroll={onScroll} className="overflow-y-scroll no-scrollbar" style={{ height: ITEM_H * 5 }}>
                <div style={{ height: ITEM_H * 2 }} />
                {AGES.map(a => (
                    <div key={a} style={{ height: ITEM_H }} className="flex items-center justify-center">
                        <span className={`font-bold select-none transition-all duration-150 ${a === value ? 'text-indigo-600 text-3xl' : 'text-slate-300 text-xl'}`}>{a}</span>
                    </div>
                ))}
                <div style={{ height: ITEM_H * 2 }} />
            </div>
        </div>
    );
};

/* ── Chip Selector ── */
const ChipSelector = ({ options, value, onChange, multi = false }) => (
    <div className="flex flex-wrap gap-2">
        {options.map(opt => {
            const sel = multi ? value.includes(opt) : value === opt;
            return (
                <button key={opt} onClick={() => multi
                    ? onChange(sel ? value.filter(v => v !== opt) : [...value, opt])
                    : onChange(opt)}
                    className={`px-4 py-2 rounded-2xl font-bold text-sm border-2 transition-all ${sel ? 'bg-indigo-500 border-indigo-500 text-white shadow-md shadow-indigo-200' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-200'}`}
                >{opt}</button>
            );
        })}
    </div>
);

const TOTAL = 8;

const Onboarding = () => {
    const { setUserStatus, updateProfile, updateBasicInfo } = useUser();
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        name: '', age: 24, gender: 'Male', pronouns: 'He/Him',
        interestedIn: 'Everyone', bio: '', interests: [],
        prompts: [], isVerified: false,
    });
    const [verifying, setVerifying] = useState(false);
    const [verifyDone, setVerifyDone] = useState(false);
    const [promptCat, setPromptCat] = useState('fun');
    const [activePromptQ, setActivePromptQ] = useState(null);
    const [draftAnswer, setDraftAnswer] = useState('');
    const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

    const canNext = () => {
        if (step === 6) return form.prompts.length >= 1;
        if (step === 7) return form.interests.length >= 3;
        return true;
    };

    const addPrompt = (q) => {
        if (form.prompts.length >= 5) return;
        const existing = form.prompts.find(p => p.question === q);
        setDraftAnswer(existing ? existing.answer : '');
        setActivePromptQ(q);
    };

    const savePrompt = () => {
        if (!activePromptQ || !draftAnswer.trim()) return;
        set('prompts', [
            ...form.prompts.filter(p => p.question !== activePromptQ),
            { id: Date.now(), question: activePromptQ, answer: draftAnswer.trim().slice(0, 150) }
        ]);
        setActivePromptQ(null);
        setDraftAnswer('');
    };

    const removePrompt = (q) => set('prompts', form.prompts.filter(p => p.question !== q));

    const toggleInterest = (label) => {
        const has = form.interests.includes(label);
        if (!has && form.interests.length >= 10) return;
        set('interests', has ? form.interests.filter(i => i !== label) : [...form.interests, label]);
    };

    const startVerify = () => {
        setVerifying(true);
        setTimeout(() => { setVerifying(false); setVerifyDone(true); set('isVerified', true); }, 2000);
    };

    const handleComplete = () => {
        updateProfile('name', form.name || 'Alex');
        updateProfile('age', form.age);
        updateProfile('bio', form.bio);
        updateProfile('pronouns', form.pronouns);
        updateProfile('isVerified', form.isVerified);
        updateProfile('interests', form.interests.length ? form.interests : ['Music', 'Coffee', 'Travel']);
        updateProfile('prompts', form.prompts.length ? form.prompts : [{ id: 1, question: "I'm weirdly obsessed with...", answer: 'Coffee.' }]);
        updateBasicInfo('Interested in', form.interestedIn);
        updateBasicInfo('Pronouns', form.pronouns);
        updateBasicInfo('Location', 'Lives in India');
        setUserStatus('active');
    };

    const next = () => {
        if (!canNext()) return;
        if (step < TOTAL) setStep(s => s + 1);
        else handleComplete();
    };

    const LABELS = ['Name', 'Basics', 'Interested In', 'Photo', 'Bio', 'Prompts', 'Interests', 'Verify'];

    return (
        <div className="h-full flex flex-col bg-slate-50 relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 z-30" />

            {/* Header */}
            <div className="px-6 pt-12 pb-4 shrink-0">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
                        Step {step} of {TOTAL}
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{LABELS[step - 1]}</span>
                </div>
                <div className="flex gap-1.5">
                    {Array.from({ length: TOTAL }, (_, i) => i + 1).map(i => (
                        <div key={i} className="h-1 flex-1 rounded-full bg-slate-200 overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                                animate={{ width: i <= step ? '100%' : '0%' }}
                                transition={{ duration: 0.35 }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Steps */}
            <div className="flex-1 overflow-y-auto no-scrollbar relative px-6">
                <AnimatePresence mode="wait">

                    {/* Step 1 — Name */}
                    {step === 1 && (
                        <motion.div key="s1" initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -60, opacity: 0 }} className="pt-6">
                            <h2 className="text-3xl font-extrabold text-slate-800 mb-1">What's your<br />first name?</h2>
                            <p className="text-slate-400 font-medium mb-8">You won't be able to change this later.</p>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                                <input type="text" placeholder="Your first name" value={form.name} autoFocus
                                    onChange={e => set('name', e.target.value)}
                                    className="w-full bg-white border-2 border-slate-200 focus:border-indigo-400 rounded-2xl py-4 pl-12 pr-4 text-xl font-bold text-slate-800 outline-none transition shadow-sm placeholder-slate-300"
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2 — Basics */}
                    {step === 2 && (
                        <motion.div key="s2" initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -60, opacity: 0 }} className="pt-6 space-y-7">
                            <div>
                                <h2 className="text-3xl font-extrabold text-slate-800 mb-1">The Basics</h2>
                                <p className="text-slate-400 font-medium">A little more about you.</p>
                            </div>

                            {/* Age */}
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Age</label>
                                <div className="bg-white rounded-3xl border-2 border-slate-100 shadow-sm py-2">
                                    <AgePicker value={form.age} onChange={v => set('age', v)} />
                                    <p className="text-center text-xs text-slate-400 font-medium pb-2">Scroll to select</p>
                                </div>
                            </div>

                            {/* Gender */}
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Gender</label>
                                <ChipSelector options={['Male', 'Female', 'LGBTQ+']} value={form.gender} onChange={v => set('gender', v)} />
                            </div>

                            {/* Pronouns */}
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Pronouns</label>
                                <ChipSelector options={['He/Him', 'She/Her', 'They/Them', 'She/They', 'He/They']} value={form.pronouns} onChange={v => set('pronouns', v)} />
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3 — Interested In */}
                    {step === 3 && (
                        <motion.div key="s3" initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -60, opacity: 0 }} className="pt-6 space-y-7">
                            <div>
                                <h2 className="text-3xl font-extrabold text-slate-800 mb-1">Who would you like<br />to meet?</h2>
                                <p className="text-slate-400 font-medium">We'll use this to find your best matches.</p>
                            </div>

                            {/* Interested In */}
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Interested In</label>
                                <ChipSelector
                                    options={['Men', 'Women', 'Others', 'Everyone']}
                                    value={form.interestedIn}
                                    onChange={v => set('interestedIn', v)}
                                />
                            </div>

                            {/* Region */}
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Region</label>
                                <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-slate-400 font-bold cursor-not-allowed">
                                    <MapPin className="w-4 h-4" /> India (Default)
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 4 — Photo */}
                    {step === 4 && (
                        <motion.div key="s4" initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -60, opacity: 0 }} className="pt-6">
                            <h2 className="text-3xl font-extrabold text-slate-800 mb-1">Add a Photo</h2>
                            <p className="text-slate-400 font-medium mb-8">Show them your best angle. ✨</p>
                            <div className="aspect-[3/4] w-full max-w-[260px] mx-auto rounded-[32px] overflow-hidden relative shadow-2xl shadow-slate-200 cursor-pointer group">
                                <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=400&q=80" alt="Mock" className="absolute inset-0 w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                    <Camera className="w-10 h-10 text-white" />
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center gap-2">
                                    <Camera className="w-4 h-4 text-indigo-500 shrink-0" />
                                    <span className="text-sm font-bold text-slate-700">Tap to upload</span>
                                </div>
                            </div>
                            <p className="text-center text-xs text-slate-400 mt-4 font-medium">Only shared with your matches.</p>
                        </motion.div>
                    )}

                    {/* Step 5 — Bio */}
                    {step === 5 && (
                        <motion.div key="s5" initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -60, opacity: 0 }} className="pt-6">
                            <h2 className="text-3xl font-extrabold text-slate-800 mb-1">Write a Bio</h2>
                            <p className="text-slate-400 font-medium mb-8">A little blurb that makes you, you.</p>
                            <div className="bg-white rounded-3xl border-2 border-slate-100 p-5 shadow-sm relative">
                                <Edit3 className="absolute top-5 right-5 text-slate-200 w-5 h-5" />
                                <textarea
                                    className="w-full bg-transparent resize-none outline-none text-slate-700 font-medium placeholder-slate-300 leading-relaxed"
                                    rows="6"
                                    placeholder="I love finding hidden gem restaurants..."
                                    value={form.bio}
                                    onChange={e => set('bio', e.target.value)}
                                />
                                <div className="flex justify-between pt-2 border-t border-slate-100 mt-1">
                                    <span className="text-xs text-slate-300 font-medium">Be authentic ✦</span>
                                    <span className={`text-xs font-bold ${form.bio.length > 280 ? 'text-rose-400' : 'text-slate-300'}`}>{form.bio.length}/300</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 6: Prompt Library */}
                    {step === 6 && (
                        <motion.div key="s6" initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -60, opacity: 0 }} className="pt-6 pb-4">
                            <h2 className="text-3xl font-extrabold text-slate-800 mb-1">Prompt Library</h2>
                            <p className="text-slate-400 font-medium mb-4">Pick up to <span className="font-bold text-indigo-500">5 prompts</span>. At least 1 required.</p>

                            {form.prompts.length > 0 && (
                                <div className="space-y-2 mb-4">
                                    {form.prompts.map(p => (
                                        <div key={p.id} className="bg-white rounded-2xl border-2 border-indigo-100 p-3 flex items-start justify-between gap-2">
                                            <div className="min-w-0">
                                                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{p.question}</p>
                                                <p className="text-sm font-bold text-slate-700 mt-0.5 truncate">"{p.answer}"</p>
                                            </div>
                                            <button onClick={() => removePrompt(p.question)} className="shrink-0 w-6 h-6 bg-slate-100 rounded-full text-slate-400 flex items-center justify-center text-xs font-bold hover:bg-rose-50 hover:text-rose-400 transition">x</button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activePromptQ && (
                                <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-4 mb-4">
                                    <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">{activePromptQ}</p>
                                    <textarea autoFocus rows={3} value={draftAnswer}
                                        onChange={e => setDraftAnswer(e.target.value.slice(0, 150))}
                                        placeholder="Type your answer..."
                                        className="w-full bg-transparent resize-none outline-none text-slate-700 font-medium placeholder-indigo-300 text-sm leading-relaxed"
                                    />
                                    <div className="flex justify-between items-center border-t border-indigo-100 pt-2 mt-1">
                                        <span className={`text-xs font-bold ${draftAnswer.length >= 140 ? 'text-rose-400' : 'text-indigo-300'}`}>{draftAnswer.length}/150</span>
                                        <div className="flex gap-2">
                                            <button onClick={() => { setActivePromptQ(null); setDraftAnswer(''); }} className="text-xs font-bold text-slate-400 px-3 py-1 rounded-full hover:bg-slate-100 transition">Cancel</button>
                                            <button onClick={savePrompt} disabled={!draftAnswer.trim()} className="text-xs font-bold bg-indigo-500 text-white px-4 py-1.5 rounded-full disabled:opacity-40 transition">Save</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-2 mb-3">
                                <div className="flex-1 flex items-center gap-2 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-3 opacity-50 cursor-not-allowed">
                                    <Mic className="w-4 h-4 text-slate-400" />
                                    <div><p className="text-xs font-bold text-slate-500">Voice Note</p><p className="text-[10px] text-slate-300">Premium</p></div>
                                </div>
                                <div className="flex-1 flex items-center gap-2 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-3 opacity-50 cursor-not-allowed">
                                    <Video className="w-4 h-4 text-slate-400" />
                                    <div><p className="text-xs font-bold text-slate-500">Video Prompt</p><p className="text-[10px] text-slate-300">Premium</p></div>
                                </div>
                            </div>

                            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-3">
                                {PROMPT_CATEGORIES.map(cat => (
                                    <button key={cat.id} onClick={() => setPromptCat(cat.id)}
                                        className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${promptCat === cat.id ? 'bg-indigo-500 border-indigo-500 text-white' : 'bg-white border-slate-200 text-slate-500'}`}>
                                        {cat.label}
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-2">
                                {PROMPT_CATEGORIES.find(c => c.id === promptCat)?.prompts.map(q => {
                                    const chosen = form.prompts.find(p => p.question === q);
                                    const atMax  = form.prompts.length >= 5 && !chosen;
                                    return (
                                        <div key={q} onClick={() => !atMax && addPrompt(q)}
                                            className={`p-3.5 rounded-2xl border-2 flex items-center justify-between gap-2 transition-all ${chosen ? 'border-indigo-300 bg-indigo-50 cursor-pointer' : atMax ? 'border-slate-100 bg-slate-50 opacity-40 cursor-not-allowed' : 'border-slate-100 bg-white hover:border-indigo-200 cursor-pointer'}`}>
                                            <span className="text-sm font-semibold text-slate-700">{q}</span>
                                            {chosen && <span className="text-indigo-500 font-bold text-xs shrink-0">Done</span>}
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 7: Interests */}
                    {step === 7 && (
                        <motion.div key="s7" initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -60, opacity: 0 }} className="pt-6 pb-4">
                            <h2 className="text-3xl font-extrabold text-slate-800 mb-1">Your Interests</h2>
                            <p className="text-slate-400 font-medium mb-3">Pick at least <span className="font-bold text-indigo-500">3 things</span> you love.</p>
                            <div className="flex items-center gap-1.5 mb-6">
                                {[1,2,3].map(i => (
                                    <div key={i} className={`h-1.5 w-8 rounded-full transition-all duration-300 ${form.interests.length >= i ? 'bg-indigo-500' : 'bg-slate-200'}`} />
                                ))}
                                <span className="text-xs text-slate-400 font-medium ml-1">{form.interests.length} selected</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {INTEREST_TAGS.map(tag => {
                                    const sel = form.interests.includes(tag.label);
                                    return (
                                        <motion.button key={tag.label} whileTap={{ scale: 0.92 }}
                                            onClick={() => toggleInterest(tag.label)}
                                            className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl font-bold text-sm border-2 transition-all ${sel ? 'bg-indigo-500 border-indigo-500 text-white shadow-md shadow-indigo-200' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-200'}`}>
                                            <span>{tag.emoji}</span><span>{tag.label}</span>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 8: Verify */}
                    {step === 8 && (
                        <motion.div key="s8" initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -60, opacity: 0 }} className="pt-6">
                            <h2 className="text-3xl font-extrabold text-slate-800 mb-1">Verify Your Profile</h2>
                            <p className="text-slate-400 font-medium mb-8">Get a blue badge and rank higher in Top Picks.</p>
                            <div className="bg-white border-2 border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col items-center gap-5">
                                {!verifying && !verifyDone && (
                                    <>
                                        <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center">
                                            <Camera className="w-10 h-10 text-slate-300" />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-bold text-slate-700 mb-1">Take a quick selfie</p>
                                            <p className="text-sm text-slate-400">We confirm it is really you — never shared.</p>
                                        </div>
                                        <button onClick={startVerify} className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold px-8 py-3 rounded-2xl shadow-lg shadow-blue-200 hover:opacity-90 transition">Take Selfie</button>
                                        <button onClick={next} className="text-slate-400 text-sm font-medium underline underline-offset-2">Skip for now</button>
                                    </>
                                )}
                                {verifying && (
                                    <>
                                        <div className="w-20 h-20 rounded-full border-4 border-blue-200 border-t-blue-500 animate-spin" />
                                        <p className="font-bold text-slate-600">Verifying...</p>
                                    </>
                                )}
                                {verifyDone && (
                                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', bounce: 0.5 }} className="flex flex-col items-center gap-4">
                                        <div className="w-24 h-24 rounded-full bg-blue-50 border-4 border-blue-400 flex items-center justify-center">
                                            <BadgeCheck className="w-12 h-12 text-blue-500" />
                                        </div>
                                        <p className="font-extrabold text-slate-800 text-xl">Verified!</p>
                                        <p className="text-sm text-slate-400 text-center">You now get a blue badge and priority in Top Picks.</p>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

            {/* CTA */}
            <div className="px-6 pt-4 pb-8 shrink-0 bg-slate-50">
                <motion.button whileTap={{ scale: 0.97 }} onClick={next} disabled={!canNext()}
                    className={`w-full font-extrabold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all text-base ${canNext() ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-xl shadow-indigo-200' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
                >
                    {step === TOTAL ? 'Finish & Explore' : 'Continue'} <ChevronRight className="w-5 h-5" strokeWidth={3} />
                </motion.button>
            </div>
        </div>
    );
};

export default Onboarding;
