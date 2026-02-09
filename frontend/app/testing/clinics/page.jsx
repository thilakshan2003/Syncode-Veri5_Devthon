"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ClinicSearch from '@/components/ClinicSearch';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Loader2 } from 'lucide-react';
import { clinicApi } from '@/lib/api';

export default function ClinicsPage() {
    const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'
    const [clinics, setClinics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchClinics();
    }, []);

    const fetchClinics = async (search = '') => {
        try {
            setLoading(true);
            setError(null);
            const data = await clinicApi.getClinics(search);
            setClinics(data);
        } catch (err) {
            console.error('Error fetching clinics:', err);
            setError('Failed to load clinics. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        fetchClinics(query);
    };

    // Helper to get clinic hours display text
    const getClinicHours = (availableTime) => {
        if (!availableTime) return 'Hours not available';
        return availableTime;
    };

    return (
        <main className="min-h-screen bg-white pb-20">
            <Navbar />

            <div className="container mx-auto px-4 md:px-6 py-12">

                <div className="mb-12">
                    <ClinicSearch 
                        onToggleView={setViewMode} 
                        viewMode={viewMode} 
                        onSearch={handleSearch}
                    />
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left: List functionality/Sidebar */}
                    <div className="w-full lg:w-1/3 space-y-4">
                        <div className="bg-white border boundary-slate-200 p-4 rounded-xl flex items-center justify-between mb-2">
                            <div className="flex items-center text-sm font-medium text-slate-700">
                                <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                                Wellawatte, Colombo
                            </div>
                            <Button variant="ghost" size="sm" className="text-xs text-veri5-teal">Change</Button>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="w-8 h-8 animate-spin text-veri5-teal" />
                            </div>
                        ) : error ? (
                            <div className="bg-red-50 border border-red-200 p-6 rounded-2xl text-center">
                                <p className="text-red-600">{error}</p>
                                <Button 
                                    variant="ghost" 
                                    className="mt-4 text-red-600"
                                    onClick={() => fetchClinics(searchQuery)}
                                >
                                    Try Again
                                </Button>
                            </div>
                        ) : clinics.length === 0 ? (
                            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl text-center">
                                <p className="text-slate-600">No clinics found.</p>
                            </div>
                        ) : (
                            clinics.map((clinic) => {
                                const hours = getClinicHours(clinic.availableTime);
                                return (
                                    <div key={clinic.id} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                                        <h3 className="font-bold text-slate-900 mb-1 group-hover:text-veri5-teal transition-colors">{clinic.name}</h3>
                                        <p className="text-xs text-slate-500 mb-2">{clinic.address}</p>
                                        <div className="flex items-center text-xs text-slate-500 mb-4 space-x-3">
                                            <span className="flex items-center">
                                                <Clock className="w-3 h-3 mr-1" />
                                                <span className="text-slate-600">{hours}</span>
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex gap-2">
                                                <span className="bg-cyan-50 text-veri5-teal text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                                                    Accepts Veri5 ID
                                                </span>
                                            </div>
                                            <Button variant="ghost" className="text-veri5-teal font-bold hover:bg-cyan-50 h-8 px-4 text-xs">Book Now</Button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Right: Map Placeholder */}
                    <div className="w-full lg:w-2/3 min-h-[500px] bg-slate-100 rounded-3xl relative overflow-hidden flex items-center justify-center border border-slate-200">
                        {/* This would be an interactive map in production */}
                        <div className="absolute inset-0 grayscale opacity-40 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Colombo&zoom=13&size=800x600&sensor=false')] bg-cover bg-center"></div>

                        <div className="relative bg-white/90 backdrop-blur-md p-8 rounded-2xl text-center max-w-sm border border-white shadow-xl">
                            <div className="w-12 h-12 bg-veri5-teal text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-500/30">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Interactive Map Area</h3>
                            <p className="text-slate-500 text-sm">
                                This area is reserved for the Maps API integration to show real-time clinic locations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
