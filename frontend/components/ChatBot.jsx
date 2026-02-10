"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Trash2, ShieldAlert, Sparkles, Loader2, Heart, ShieldCheck, HeartPulse, Scale } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@/context/AuthContext';

export default function ChatBot() {
    const { user, loading } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'model', content: 'Hello! I am Veri5 AI. How can I help you today with your sexual health, wellness, or safe sex questions?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const quickActions = [
        { label: 'Safe Sex Tips', query: 'Give me some essential safe sex tips.', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
        { label: 'STI Prevention', query: 'How can I prevent STIs effectively?', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
        { label: 'Healthy Relationships', query: 'What define a healthy relationship and consent?', icon: <Heart className="w-3.5 h-3.5" /> },
        { label: 'Communication Tips', query: 'How to talk to my partner about sexual health?', icon: <HeartPulse className="w-3.5 h-3.5" /> },
        { label: 'Consent Basics', query: 'Explain the importance of enthusiastic consent.', icon: <Scale className="w-3.5 h-3.5" /> }
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (query = input) => {
        if (!query.trim()) return;

        const newMessages = [...messages, { role: 'user', content: query }];
        setMessages(newMessages);
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages })
            });

            const data = await response.json();
            if (data.success) {
                setMessages(prev => [...prev, { role: 'model', content: data.message }]);
            } else {
                setMessages(prev => [...prev, { role: 'model', content: "I'm sorry, I'm having trouble connecting right now. Please try again later." }]);
            }
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { role: 'model', content: "Something went wrong. Please check your connection." }]);
        } finally {
            setIsTyping(false);
        }
    };

    const clearChat = () => {
        setMessages([{ role: 'model', content: 'Chat history cleared. How else can I help you today?' }]);
    };

    // Only show the chatbot if the user is logged in
    if (loading || !user) return null;

    return (
        <div className="fixed bottom-8 right-8 z-50">
            {/* Launcher - Only visible when closed */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0, opacity: 0, y: 20 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="w-16 h-16 bg-[#28A99E] text-white rounded-2xl shadow-[0_8px_30px_rgb(40,169,158,0.4)] flex items-center justify-center hover:bg-[#208d83] transition-all duration-300 group overflow-hidden relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <MessageCircle className="w-8 h-8 relative z-10" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Modal Overlay and Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-[100] cursor-pointer"
                        />

                        {/* Chat Window - Centered and Larger */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-45%' }}
                            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                            exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-45%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                            className="fixed top-1/2 left-1/2 w-[95vw] sm:w-[650px] h-[800px] max-h-[90vh] flex flex-col bg-[#0F172A] border border-[#1E293B] rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden z-[101]"
                        >
                            {/* Header */}
                            <div className="p-6 bg-[#1E293B]/50 border-b border-[#1E293B] flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#28A99E]/20 rounded-2xl flex items-center justify-center shadow-inner">
                                        <Sparkles className="w-6 h-6 text-[#28A99E]" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-[#F8FAFC]">Veri5 AI Support</h3>
                                        <span className="text-[11px] text-[#28A99E] font-semibold flex items-center gap-1.5 mt-0.5">
                                            <span className="w-2 h-2 bg-[#28A99E] rounded-full animate-pulse shadow-[0_0_8px_#28A99E]"></span>
                                            Active & Secure
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button variant="ghost" size="icon" onClick={clearChat} title="Clear Chat" className="text-slate-400 hover:text-white hover:bg-white/5 rounded-xl w-10 h-10">
                                        <Trash2 className="w-5 h-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white hover:bg-white/5 rounded-xl w-10 h-10">
                                        <X className="w-6 h-6" />
                                    </Button>
                                </div>
                            </div>

                            {/* Disclaimer */}
                            <div className="px-6 py-4 bg-amber-500/5 border-b border-amber-500/10 flex items-start gap-4">
                                <ShieldAlert className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                                <p className="text-[12px] text-amber-200/80 leading-relaxed">
                                    <strong className="text-amber-500">DISCLAIMER:</strong> Veri5 AI is an educational healthcare tool. It cannot provide medical diagnosis or treatment. Always consult a qualified doctor for clinical advice.
                                </p>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[#0B1120]/30">
                                {messages.map((msg, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[85%] rounded-[1.5rem] px-6 py-4 text-[15px] leading-relaxed shadow-xl ${msg.role === 'user'
                                                ? 'bg-[#2563EB] text-white rounded-br-sm font-medium'
                                                : 'bg-[#1E293B] text-slate-200 border border-slate-700/50 rounded-bl-sm'
                                                }`}
                                        >
                                            <p className="whitespace-pre-wrap">{msg.content}</p>
                                        </div>
                                    </motion.div>
                                ))}
                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex justify-start"
                                    >
                                        <div className="bg-[#1E293B] rounded-[1.5rem] px-6 py-5 flex items-center gap-2.5 border border-slate-700/50 rounded-bl-sm">
                                            <div className="flex gap-2">
                                                <motion.span animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.4, times: [0, 0.5, 1] }} className="w-2.5 h-2.5 bg-[#28A99E] rounded-full shadow-[0_0_8px_#28A99E]"></motion.span>
                                                <motion.span animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.4, times: [0, 0.5, 1], delay: 0.2 }} className="w-2.5 h-2.5 bg-[#28A99E] rounded-full shadow-[0_0_8px_#28A99E]"></motion.span>
                                                <motion.span animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.4, times: [0, 0.5, 1], delay: 0.4 }} className="w-2.5 h-2.5 bg-[#28A99E] rounded-full shadow-[0_0_8px_#28A99E]"></motion.span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Quick Actions */}
                            <div className="px-6 py-4 border-t border-[#1E293B] bg-[#0F172A]/80 backdrop-blur-md">
                                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                                    {quickActions.map((action, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSend(action.query)}
                                            className="flex items-center gap-2 whitespace-nowrap px-5 py-2.5 rounded-2xl bg-[#1E293B] border border-slate-700 text-[13px] font-medium text-slate-300 hover:bg-[#28A99E] hover:border-[#28A99E] hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg"
                                        >
                                            {action.icon}
                                            {action.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Input Area */}
                            <div className="p-6 bg-[#1E293B]/20 border-t border-[#1E293B]">
                                <form
                                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                    className="relative flex items-center gap-4"
                                >
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Ask about sexual health, safety, or wellness..."
                                        className="flex-1 bg-[#0F172A] border border-[#1E293B] rounded-[1.5rem] px-6 py-5 text-[15px] text-[#F8FAFC] placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#28A99E]/50 focus:border-[#28A99E] transition-all shadow-inner"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!input.trim() || isTyping}
                                        className="w-14 h-14 bg-[#28A99E] text-white rounded-2xl flex items-center justify-center shadow-xl shadow-[#28A99E]/20 hover:bg-[#208d83] hover:shadow-[#208d83]/30 disabled:opacity-50 disabled:bg-slate-700 disabled:shadow-none transition-all duration-300 group"
                                    >
                                        <Send className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
