import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Premium sticky navbar with glassmorphism effect.
 * Adds shadow and blur on scroll for elevated feel.
 */
export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [lastHoveredIndex, setLastHoveredIndex] = useState<number | null>(null);
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/products', label: 'Products' },
        { path: '/#about', label: 'About' },
        { path: '/contact', label: 'Contact' }
    ];

    const activeIndex = navItems.findIndex(item => {
        if (item.path.includes('#')) {
            const [urlPath, urlHash] = item.path.split('#');
            return location.pathname === urlPath && location.hash === `#${urlHash}`;
        }
        if (item.path === '/') return location.pathname === '/' && !location.hash;
        return location.pathname.startsWith(item.path) ||
            (item.path === '/products' && location.pathname.startsWith('/notebooks/'));
    });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Track last hovered to determine return direction
    useEffect(() => {
        if (hoveredIndex !== null) {
            setLastHoveredIndex(hoveredIndex);
        }
    }, [hoveredIndex]);

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
                        {/* <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-12 h-12 bg-brand-deep rounded-xl flex items-center justify-center shadow-medium"
                        >
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </motion.div> */}
                        <div className="hidden sm:block">
                            <span className="block text-2xl font-bold text-charcoal tracking-tight">Nawa Puspanjali</span>
                            <span className="block text-xs text-graphite uppercase tracking-widest">Copy Tatha Stationery Udhyog Pvt. Ltd.</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav
                        className="hidden lg:flex items-center gap-2"
                        aria-label="Main navigation"
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {navItems.map((item, idx) => (
                            <NavLink
                                key={item.path}
                                href={item.path}
                                label={item.label}
                                isActive={activeIndex === idx}
                                currentIndex={idx}
                                hoveredIndex={hoveredIndex}
                                lastHoveredIndex={lastHoveredIndex}
                                onHover={setHoveredIndex}
                            />
                        ))}
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
    currentIndex: number;
    hoveredIndex: number | null;
    lastHoveredIndex: number | null;
    onHover: (idx: number | null) => void;
}

function NavLink({ href, isActive, label, currentIndex, hoveredIndex, lastHoveredIndex, onHover }: NavLinkProps) {
    const isHovered = hoveredIndex === currentIndex;
    const isShowing = (isActive && hoveredIndex === null) || isHovered;

    // Determine transform origin based on direction
    let originX = 0; // default left

    if (isActive && hoveredIndex !== null && hoveredIndex !== currentIndex) {
        // Active link collapsing because someone else is hovered
        originX = hoveredIndex > currentIndex ? 1 : 0;
    } else if (isActive && hoveredIndex === null && lastHoveredIndex !== null) {
        // Active link returning from a hover
        originX = lastHoveredIndex > currentIndex ? 1 : 0;
    } else {
        // Generic entry (always from left to right as requested)
        originX = 0;
    }

    return (
        <Link
            to={href}
            className="relative px-4 py-2 text-sm font-medium transition-colors group flex items-center"
            onMouseEnter={() => onHover(currentIndex)}
        >
            <span className="relative">
                <span className={`transition-colors duration-500 ${isActive ? 'text-brand-deep' : 'text-charcoal-light hover:text-charcoal'}`}>
                    {label}
                </span>

                <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-deep rounded-full shadow-[0_0_8px_rgba(231,29,54,0.4)]"
                    initial={false}
                    animate={{
                        scaleX: isShowing ? 1 : 0,
                        opacity: isShowing ? 1 : 0
                    }}
                    style={{ originX }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 40,
                        mass: 1.2,
                        delay: isHovered ? 0.25 : 0 // Hover delay remains
                    }}
                />
            </span>
        </Link>
    );
}

export default Header;
