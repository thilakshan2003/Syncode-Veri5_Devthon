"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ResourceCard from '@/components/ResourceCard';
import { Button } from '@/components/ui/button';
import { Search, Bell, User } from 'lucide-react';

const categories = [
    "All Resources", "Safe Sex", "Consent", "Mental Health", "Testing Guides", "Data Privacy"
];

const resources = [
    {
        title: "Understanding Regular Testing",
        excerpt: "Learn why consistency is key to your long-term wellness and how to establish a routine that works for your life.",
        category: "Health",
        readTime: "5 min",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Navigating Boundaries",
        excerpt: "A comprehensive guide to communication, respect, and establishing healthy boundaries in any relationship.",
        category: "Consent",
        readTime: "8 min",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Privacy First: Data Promise",
        excerpt: "How Veri5 uses end-to-end encryption to ensure your status remains yours and yours alone.",
        category: "Privacy",
        readTime: "4 min",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Dating in the Digital Age",
        excerpt: "Navigating the complexities of modern apps while maintaining health, safety, and personal integrity.",
        category: "Relationships",
        readTime: "10 min",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Sexual Health Basics",
        excerpt: "Everything you need to know about sexual wellness, from myths to physiological facts.",
        category: "Wellness",
        readTime: "6 min",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Building Trust with Partners",
        excerpt: "Fostering honesty and dignity through open conversations and shared health responsibility.",
        category: "Ethics",
        readTime: "7 min",
        image: "https://images.unsplash.com/photo-1623697967817-f58c40833215?auto=format&fit=crop&w=800&q=80"
    }
];

export default function ResourcesPage() {
    const [activeCategory, setActiveCategory] = useState("All Resources");

    return (
        <main className="min-h-screen bg-white pb-20">
            <Navbar />

            <div className="container mx-auto px-4 md:px-6 py-12">

                <div className="flex flex-col md:flex-row gap-12">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="sticky top-24 space-y-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`w-full text-left px-5 py-3 rounded-full text-sm font-bold transition-all
                                ${activeCategory === cat
                                            ? 'bg-veri5-teal text-white shadow-md'
                                            : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                                >
                                    {cat}
                                </button>
                            ))}

                            <div className="mt-8 bg-veri5-teal rounded-3xl p-6 text-center text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                                        <Bell className="w-6 h-6 text-white" />
                                    </div>
                                    <h4 className="font-bold mb-2">Stay Updated</h4>
                                    <p className="text-xs text-teal-50 mb-4 opacity-90">Get the latest health guides delivered to you.</p>
                                    <Button size="sm" className="w-full bg-white text-veri5-teal font-bold hover:bg-teal-50">Subscribe</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-grow">
                        <div className="mb-10 flex items-center justify-between">
                            <h1 className="text-3xl font-extrabold text-veri5-navy">Latest Educational Guides</h1>
                            <div className="hidden md:flex items-center gap-4 text-slate-400">
                                <Search className="w-5 h-5 hover:text-veri5-teal cursor-pointer" />
                                <Bell className="w-5 h-5 hover:text-veri5-teal cursor-pointer" />
                                <User className="w-5 h-5 hover:text-veri5-teal cursor-pointer" />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {resources.map((res, idx) => (
                                <ResourceCard key={idx} {...res} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
