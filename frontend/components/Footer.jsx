import Link from 'next/link';
import { ShieldCheck, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <ShieldCheck className="h-8 w-8 text-veri5-teal" />
                            <span className="text-2xl font-bold text-veri5-navy tracking-tight">Veri5</span>
                        </Link>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">
                            Secure, private, and verified sexual health testing and status sharing. Empowering you to take control of your health.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-slate-400 hover:text-veri5-teal transition-colors"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="text-slate-400 hover:text-veri5-teal transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="text-slate-400 hover:text-veri5-teal transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="text-slate-400 hover:text-veri5-teal transition-colors"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Platform</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><Link href="/dashboard" className="hover:text-veri5-teal transition-colors">Health Dashboard</Link></li>
                            <li><Link href="/testing" className="hover:text-veri5-teal transition-colors">Testing Options</Link></li>
                            <li><Link href="/consultation" className="hover:text-veri5-teal transition-colors">Consultations</Link></li>
                            <li><Link href="/resources" className="hover:text-veri5-teal transition-colors">Resources</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><Link href="#" className="hover:text-veri5-teal transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-veri5-teal transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-veri5-teal transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-veri5-teal transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><Link href="#" className="hover:text-veri5-teal transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-veri5-teal transition-colors">Contact Us</Link></li>
                            <li><Link href="#" className="hover:text-veri5-teal transition-colors">Partner with Us</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-400 text-xs">
                        &copy; {new Date().getFullYear()} Veri5 Health Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-slate-400 font-medium">
                        <Link href="#">Privacy</Link>
                        <Link href="#">Terms</Link>
                        <Link href="#">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
