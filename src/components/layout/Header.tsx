import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Premium sticky navbar with glassmorphism effect.
 * Adds shadow and blur on scroll for elevated feel.
 */
export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path: string): boolean => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isScrolled
                ? 'glass shadow-medium py-5'
                : 'bg-transparent py-8'
                }`}
        >
            <div className="max-w-7xl mx-auto px-8 lg:px-12 w-full">
                <div className="flex items-center justify-between">
                    {/* Logo / Company Name */}
                    <Link
                        to="/"
                        className="group flex items-center gap-4"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-medium"
                        >
                            <svg
                                className="w-7 h-7 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                        </motion.div>
                        <div className="hidden sm:block">
                            <span className="block text-xl font-bold text-charcoal tracking-tight">
                                Nawa Puspanjali
                            </span>
                            <span className="block text-xs text-graphite uppercase tracking-widest">
                                Copy Tatha Stationery Udhyog
                            </span>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <nav className="flex items-center gap-2" aria-label="Main navigation">
                        <NavLink href="/" isActive={isActive('/')} label="Home" />
                        <NavLink href="/brands" isActive={isActive('/brands')} label="Products" />
                        <NavLink href="/about" isActive={isActive('/about')} label="About" />
                        <NavLink href="/contact" isActive={isActive('/contact')} label="Contact" />
                    </nav>
                </div>
            </div>
        </motion.header>
    );
}

interface NavLinkProps {
    href: string;
    isActive: boolean;
    label: string;
}

function NavLink({ href, isActive, label }: NavLinkProps) {
    return (
        <Link
            to={href}
            className="relative px-4 py-2 text-sm font-medium transition-colors group"
        >
            <span className={isActive ? 'text-amber-600' : 'text-charcoal-light hover:text-charcoal'}>
                {label}
            </span>
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-x-2 -bottom-0.5 h-0.5 bg-amber-500 rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                )}
            </AnimatePresence>
        </Link>
    );
}

export default Header;
