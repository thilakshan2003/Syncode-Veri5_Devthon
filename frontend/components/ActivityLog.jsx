"use client";

import { useState } from 'react';
import { Share2, FlaskConical, Stethoscope, Clock } from 'lucide-react';

const mockActivity = [
    { id: 1, type: 'share', title: 'Shared status with Alex M.', time: '2 hours ago', icon: Share2, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 2, type: 'test', title: 'Test Kit Ordered (Standard)', time: '1 day ago', icon: FlaskConical, color: 'text-veri5-teal', bg: 'bg-cyan-50' },
    { id: 3, type: 'consultation', title: 'Consultation with Dr. Perera', time: '3 days ago', icon: Stethoscope, color: 'text-purple-500', bg: 'bg-purple-50' },
    { id: 4, type: 'share', title: 'Shared status with Sarah K.', time: '5 days ago', icon: Share2, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 5, type: 'test', title: 'Result Verified (Negative)', time: '1 week ago', icon: FlaskConical, color: 'text-emerald-500', bg: 'bg-emerald-50' },
];

export default function ActivityLog({ limit }) {
    const [filter, setFilter] = useState('all');

    const filteredActivity = mockActivity.filter(item => {
        if (filter === 'all') return true;
        return item.type === filter;
    });

    const displayList = limit ? filteredActivity.slice(0, limit) : filteredActivity;

    return (
        <div className="w-full">
            {!limit && (
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
                    {['all', 'share', 'test', 'consultation'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all whitespace-nowrap
                 ${filter === f
                                    ? 'bg-veri5-navy text-white shadow-md'
                                    : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                        >
                            {f === 'all' ? 'All Activity' : f + 's'}
                        </button>
                    ))}
                </div>
            )}

            <div className="space-y-4">
                {displayList.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.bg} ${item.color}`}>
                            <item.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-grow">
                            <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                            <div className="flex items-center text-xs text-slate-400 mt-1">
                                <Clock className="w-3 h-3 mr-1" /> {item.time}
                            </div>
                        </div>
                        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">{item.type}</div>
                    </div>
                ))}

                {displayList.length === 0 && (
                    <div className="text-center py-10 text-slate-400 text-sm">No activity found.</div>
                )}
            </div>
        </div>
    );
}
