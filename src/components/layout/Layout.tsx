import type { ReactNode } from 'react';
import { Header } from './Header';
import { motion } from 'framer-motion';
import GridPattern from '@/components/ui/grid-pattern';
import { cn } from '@/lib/utils';
import StaggeredMenu from '../StaggeredMenu';

interface LayoutProps {
    children: ReactNode;
}

/**
 * Layout component with premium header and footer.
 * Provides consistent structure and spacing for all pages.
 */
export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-ivory relative overflow-hidden scroll-smooth">
            <GridPattern
                width={30}
                height={30}
                x={-1}
                y={-1}
                strokeDasharray={"4 2"}
                className={cn(
                    "fixed inset-0 z-0 opacity-40",
                )}
            />
            <div className="lg:hidden">
                <StaggeredMenu
                    isFixed={true}
                    position="right"
                    displayLogo={false} // Header logo is already visible
                    menuButtonColor="#011627"
                    openMenuButtonColor="#011627"
                    accentColor="#e71d36"
                    colors={['#fdfffc', '#011627', '#e71d36']}
                    items={[
                        { label: 'Home', link: '/', ariaLabel: 'Go to home' },
                        { label: 'Products', link: '/products', ariaLabel: 'Go to products' },
                        { label: 'About', link: '/#about', ariaLabel: 'Go to about' },
                        { label: 'Contact', link: '/contact', ariaLabel: 'Go to contact' }
                    ]}
                    displaySocials={true}
                    socialItems={[
                        { label: 'Facebook', link: '#' },
                        { label: 'Instagram', link: '#' }
                    ]}
                />
            </div>
            <Header />

            {/* Spacer for fixed header */}
            <div className="h-24" />

            <main className="max-w-7xl mx-auto px-8 lg:px-12 flex-1">
                {children}
            </main>

            <footer className="mt-10 bg-charcoal text-white">
                <div className="max-w-7xl mx-auto px-8 lg:px-12 py-16 lg:py-20">
                    <div className="flex flex-col md:flex-row md:justify-between items-start gap-12 md:gap-8">
                        {/* Brand Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className='md:max-w-xs'
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Puspanjali</span>
                            </div>
                            <p className="text-slate-text leading-relaxed mb-8 text-sm lg:text-base">
                                Premium notebook manufacturing from Nepal. Crafting exceptional stationery
                                with precision, purpose, and sustainable practices since 2020.
                            </p>
                            <div className="flex gap-3">
                                <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-amber-500/20 hover:scale-105 transition-all duration-300 border border-white/10">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-amber-500/20 hover:scale-105 transition-all duration-300 border border-white/10">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                                    </svg>
                                </a>
                            </div>
                        </motion.div>

                        {/* Links Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                            className='flex flex-col items-start '
                        >
                            <div>
                                <h3 className="text-lg font-semibold mb-8 text-white text-left">Quick Links</h3>
                                <nav>
                                    <ul className="space-y-4">
                                        <li>
                                            <a href="/brands" className="text-gray-300 hover:text-amber-400 transition-colors duration-300 relative group">
                                                Products
                                                <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/#about" className="text-gray-300 hover:text-amber-400 transition-colors duration-300 relative group">
                                                About Us
                                                <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/contact" className="text-gray-300 hover:text-amber-400 transition-colors duration-300 relative group">

                                                Contact
                                                <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/" className="text-gray-300 hover:text-amber-400 transition-colors duration-300 relative group">
                                                Sustainability
                                                <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </motion.div>

                        {/* Contact Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            className=''
                        >
                            <div>
                                <h3 className="text-lg font-semibold mb-8 text-white">Get in Touch</h3>
                                <address className="not-italic space-y-4 text-gray-300">
                                    <div className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>Jyamire, Chitwan, Nepal</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <a href="mailto:info@puspanjali.com.np" className="hover:text-amber-400 transition-colors duration-300 relative group">
                                            info@puspanjali.com.np
                                            <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <a href="tel:+977-1-XXXXXXX" className="hover:text-amber-400 transition-colors duration-300 relative group">
                                            +977-1-XXXXXXX
                                            <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                                        </a>
                                    </div>
                                </address>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                        className="mt-16 pt-8 border-t border-white/10"
                    >
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                            <p className="text-sm text-gray-400 text-center lg:text-left">
                                &copy; {new Date().getFullYear()} Puspanjali Industries. All rights reserved.
                            </p>
                            <div className="flex gap-6 text-sm">
                                <a href="/privacy" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 relative group">
                                    Privacy Policy
                                    <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                                </a>
                                <a href="/terms" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 relative group">
                                    Terms of Service
                                    <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </footer>
        </div>
    );
}

export default Layout;
