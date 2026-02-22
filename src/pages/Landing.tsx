import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import Carousel from '../components/ui/Carousel';
import CountUp from '../components/CountUp';
import { AngledSlider } from '../components/lightswind/angled-slider';
import { NotebookService } from '../services/notebooks.service';
import type { Notebook } from '../types';
// import { GlowingCards, GlowingCard } from '../components/lightswind/glowing-cards'; // Moved to UnifiedFeaturesSection
import UnifiedFeaturesSection from '../components/layout/UnifiedFeaturesSection';
import { About } from './About';
import pathsalaLogo from '../assets/logos/pathsala.png';
import puspanjaliPlusLogo from '../assets/logos/puspanjali_plus.png';
import ruffLogo from '../assets/logos/ruff.png';
import bulletPlusLogo from '../assets/logos/bullet_plus.png';



/**
 * Modern landing page with animated hero and feature sections.
 */
export function Landing() {
    const navigate = useNavigate();
    const [showAllDistricts, setShowAllDistricts] = useState(false);
    const [brandedProducts, setBrandedProducts] = useState<Notebook[]>([]);

    useEffect(() => {
        const fetchBrandedProducts = async () => {
            const res = await NotebookService.getNotebooks({});
            if (res.success && res.data) {
                // Get one item per brand
                const brandMap = new Map<number, Notebook>();
                res.data.forEach(notebook => {
                    const brandId = notebook.brand?.id || (notebook.brand as unknown as number);
                    if (!brandMap.has(brandId)) {
                        brandMap.set(brandId, notebook);
                    }
                });
                setBrandedProducts(Array.from(brandMap.values()));
            }
        };
        fetchBrandedProducts();
    }, []);

    const sliderItems = brandedProducts.map(product => ({
        id: product.id,
        url: product.image,
        title: product.name,
        alt: product.name,
        onClick: () => {
            const params = new URLSearchParams();
            if (product.brand) {
                params.append('brand', product.brand.slug);
            }
            if (product.notebook_type) {
                params.append('notebook_type', product.notebook_type.slug);
            }
            // If we have variants, we can also set the first size
            if (product.available_sizes && product.available_sizes.length > 0) {
                params.append('size', product.available_sizes[0].slug);
            }
            navigate(`/products?${params.toString()}`);
        }
    }));
    return (
        <div>
            {/* Hero Section */}
            <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center w-full">
                {/* Transparent Background */}
                <div className="absolute inset-0 bg-transparent" />

                {/* Animated Grid Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
                                            linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
                            backgroundSize: '60px 60px'
                        }}
                    />
                </div>

                {/* Animated Floating Orbs */}
                <motion.div
                    animate={{
                        y: [0, -30, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-20 left-[15%] w-72 h-72 bg-brand-light/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        y: [0, 40, 0],
                        scale: [1, 1.15, 1],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute bottom-20 right-[10%] w-96 h-96 bg-brand-lightest/15 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, 20, 0],
                        y: [0, -20, 0],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    className="absolute top-1/2 right-[25%] w-48 h-48 bg-brand-mid/25 rounded-full blur-2xl"
                />

                {/* 3D Floating Stationery Elements */}
                {/* Floating Notebook - Left Side */}
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        y: [0, -15, 0],
                        rotateY: [0, 10, 0],
                        rotateX: [-5, 5, -5],
                    }}
                    transition={{
                        opacity: { duration: 0.8, delay: 0.5 },
                        x: { duration: 0.8, delay: 0.5 },
                        y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                        rotateY: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
                        rotateX: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    className="absolute left-[5%] top-[30%] hidden lg:block"
                    style={{ perspective: '1000px' }}
                >
                    <div
                        className="w-28 h-36 bg-gradient-to-br from-white to-brand-lightest rounded-lg shadow-2xl"
                        style={{
                            transformStyle: 'preserve-3d',
                            transform: 'rotateY(-15deg) rotateX(5deg)',
                        }}
                    >
                        {/* Notebook Lines */}
                        <div className="absolute inset-3 flex flex-col gap-2 pt-4">
                            <div className="h-0.5 bg-brand-mid/30 rounded" />
                            <div className="h-0.5 bg-brand-mid/30 rounded" />
                            <div className="h-0.5 bg-brand-mid/30 rounded" />
                            <div className="h-0.5 bg-brand-mid/30 rounded w-3/4" />
                        </div>
                        {/* Notebook Spiral */}
                        <div className="absolute left-1 top-0 bottom-0 w-2 flex flex-col justify-evenly">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="w-2 h-2 rounded-full bg-brand-deep/40" />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Floating Pencil - Right Side */}
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        y: [0, 20, 0],
                        rotate: [-10, -5, -10],
                    }}
                    transition={{
                        opacity: { duration: 0.8, delay: 0.7 },
                        x: { duration: 0.8, delay: 0.7 },
                        y: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 },
                        rotate: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    className="absolute right-[8%] top-[25%] hidden lg:block"
                    style={{ perspective: '800px' }}
                >
                    <div
                        className="relative"
                        style={{
                            transformStyle: 'preserve-3d',
                            transform: 'rotateY(15deg) rotateZ(-30deg)',
                        }}
                    >
                        {/* Pencil Body */}
                        <div className="w-4 h-32 bg-gradient-to-b from-amber-400 to-amber-500 rounded-sm shadow-lg" />
                        {/* Pencil Tip */}
                        <div
                            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0"
                            style={{
                                borderLeft: '8px solid transparent',
                                borderRight: '8px solid transparent',
                                borderTop: '16px solid #f59e0b',
                            }}
                        />
                        <div
                            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0"
                            style={{
                                borderLeft: '4px solid transparent',
                                borderRight: '4px solid transparent',
                                borderTop: '8px solid #1f2937',
                            }}
                        />
                        {/* Pencil Eraser */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-3 bg-pink-400 rounded-t-sm" />
                        <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-5 h-1.5 bg-gray-400 rounded-sm" />
                    </div>
                </motion.div>

                {/* Floating Paper Stack - Bottom Left */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                        opacity: 1,
                        y: [0, -10, 0],
                        rotateZ: [2, -2, 2],
                    }}
                    transition={{
                        opacity: { duration: 0.8, delay: 0.9 },
                        y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 },
                        rotateZ: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    className="absolute left-[10%] bottom-[25%] hidden lg:block"
                    style={{ perspective: '600px' }}
                >
                    <div
                        className="relative"
                        style={{
                            transformStyle: 'preserve-3d',
                            transform: 'rotateX(20deg) rotateY(-10deg)',
                        }}
                    >
                        {/* Stacked Papers */}
                        <div className="absolute w-20 h-24 bg-white/90 rounded shadow-md" style={{ transform: 'translateZ(0px) rotate(-3deg)' }} />
                        <div className="absolute w-20 h-24 bg-white/95 rounded shadow-md" style={{ transform: 'translateZ(2px) rotate(1deg)' }} />
                        <div className="w-20 h-24 bg-white rounded shadow-lg" style={{ transform: 'translateZ(4px) rotate(-1deg)' }}>
                            <div className="p-2 flex flex-col gap-1.5 pt-3">
                                <div className="h-0.5 bg-brand-mid/20 rounded w-full" />
                                <div className="h-0.5 bg-brand-mid/20 rounded w-full" />
                                <div className="h-0.5 bg-brand-mid/20 rounded w-3/4" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Floating Bookmark - Top Right */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: [0, 12, 0],
                        rotate: [5, 15, 5],
                    }}
                    transition={{
                        opacity: { duration: 0.6, delay: 1.1 },
                        scale: { duration: 0.6, delay: 1.1 },
                        y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
                        rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    className="absolute right-[15%] bottom-[30%] hidden lg:block"
                >
                    <div
                        className="w-8 h-20 bg-gradient-to-b from-brand-mid to-brand-deep rounded-t-sm shadow-lg"
                        style={{
                            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
                        }}
                    />
                </motion.div>

                {/* Content Container */}
                <div className="relative z-10 max-w-5xl mx-auto px-8 py-24 text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8"
                    >
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-deep/5 backdrop-blur-sm text-brand-deep/90 text-sm font-medium rounded-full border border-brand-deep/10">
                            <span className="w-2 h-2 bg-brand-light rounded-full animate-pulse" />
                            Proudly Crafted in Nepal 🇳🇵
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight mb-6"
                    >
                        Premium Notebooks.
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-deep via-brand-mid to-brand-light">
                            Crafted with Purpose.
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto"
                    >
                        From classrooms to boardrooms — quality stationery that inspires
                        creativity and supports your every written word.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.45 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            to="/products"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-deep text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            Explore Products
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <Link
                            to="/#about"
                            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-brand-deep/20 text-brand-deep font-semibold rounded-xl hover:bg-brand-deep/5 hover:border-brand-deep/40 backdrop-blur-sm transition-all duration-300"
                        >
                            Learn About Us
                        </Link>
                    </motion.div>
                </div>

                {/* Bottom Gradient Fade - taller for smoother blend */}
                {/* <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent" /> */}
            </section>

            {/* Featured Products Angled Slider */}
            {sliderItems.length > 0 && (
                <section className="bg-white">
                    <div className="max-w-7xl mx-auto px-8 lg:px-12 pt-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-0"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-charcoal">
                                Featured Collections
                            </h2>
                        </motion.div>
                    </div>
                    <AngledSlider
                        items={sliderItems}
                        speed={10}
                        angle={15}
                        containerHeight="450px"
                        cardWidth="320px"
                    />
                </section>
            )}

            {/* Unified Features & Quality Section */}
            <UnifiedFeaturesSection />

            {/* Product Lines Preview */}
            <section className="py-24 bg-ivory w-full">
                <div className="max-w-7xl mx-auto px-8 lg:px-12 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
                    >
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                                Our Product Lines
                            </h2>
                            <p className="text-graphite text-lg max-w-xl">
                                Three distinct brands designed to meet specific needs
                            </p>
                        </div>
                        <Link
                            to="/products"
                            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors"
                        >
                            View all products
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </motion.div>

                    <div className="mt-8">
                        <Carousel
                            items={productLines.map((line, index) => ({
                                id: index,
                                title: line.name,
                                description: line.tagline,
                                color: line.color,
                                href: line.href,
                                image: line.image
                            }))}
                            baseWidth={375}
                            autoplay={true}
                            autoplayDelay={4000}
                            loop={true}
                            round={true}
                        />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 bg-white w-full">
                <div className="max-w-7xl mx-auto px-8 lg:px-12 w-full">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-bold text-charcoal mb-2">
                                    {(() => {
                                        const numericMatch = stat.value.match(/(\d+)(.*)/);
                                        if (numericMatch) {
                                            const [_, number, suffix] = numericMatch;
                                            return (
                                                <>
                                                    <CountUp
                                                        to={parseInt(number)}
                                                        duration={2}
                                                        startWhen={true}
                                                    />
                                                    {suffix}
                                                </>
                                            );
                                        }
                                        return stat.value;
                                    })()}
                                </div>
                                <div className="text-sm text-slate-text uppercase tracking-wider">
                                    {stat.label}
                                </div>

                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Distribution Districts Section */}
            <section className="py-24 bg-gradient-to-r from-brand-darkest via-brand-deep to-brand-darkest overflow-hidden">
                <div className="max-w-7xl mx-auto px-8 lg:px-12 w-full mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white/80 text-sm font-medium rounded-full mb-4">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Our Reach Across Nepal
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Distributing Nationwide
                        </h2>
                        <p className="text-white/60 text-lg max-w-2xl mx-auto">
                            Bringing quality notebooks to students and professionals across these districts
                        </p>
                    </motion.div>
                </div>

                {/* Districts Display - Responsive Container */}
                <div className="relative">
                    {/* Mobile Compact Grid Layout */}
                    <div className="md:hidden px-6 mb-12">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {(showAllDistricts ? distributionDistricts : distributionDistricts.slice(0, 9)).map((district, index) => (
                                <motion.div
                                    key={`grid-${index}`}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: (index % 9) * 0.02 }}
                                    className="px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 text-center flex flex-col items-center justify-center gap-2 group hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                                >
                                    <span className="w-1.5 h-1.5 bg-brand-light rounded-full group-hover:scale-125 transition-transform" />
                                    <span className="text-white text-xs font-medium tracking-wide truncate w-full">
                                        {district}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* View All Toggle Button */}
                        <motion.button
                            onClick={() => setShowAllDistricts(!showAllDistricts)}
                            className="w-full mt-6 py-4 px-6 bg-white/5 border border-white/10 rounded-xl text-white/80 font-medium text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                            whileTap={{ scale: 0.98 }}
                        >
                            {showAllDistricts ? 'Show Less' : `View All ${distributionDistricts.length} Districts`}
                            <svg
                                className={`w-4 h-4 transition-transform duration-300 ${showAllDistricts ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </motion.button>
                    </div>

                    {/* Desktop Marquee Layout (hidden on mobile) */}
                    <div className="hidden md:block">
                        {/* Gradient Overlays for smooth fade effect */}
                        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-darkest to-transparent z-10" />
                        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-darkest to-transparent z-10" />

                        {/* First Marquee - Left to Right */}
                        <Marquee
                            speed={40}
                            gradient={false}
                            className="py-4"
                        >
                            {distributionDistricts.slice(0, Math.ceil(distributionDistricts.length / 2)).map((district, index) => (
                                <div
                                    key={`row1-${index}`}
                                    className="mx-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-default"
                                >
                                    <span className="text-white font-medium whitespace-nowrap flex items-center gap-2">
                                        <span className="w-2 h-2 bg-brand-light rounded-full" />
                                        {district}
                                    </span>
                                </div>
                            ))}
                        </Marquee>

                        {/* Second Marquee - Right to Left */}
                        <Marquee
                            speed={35}
                            gradient={false}
                            direction="right"
                            className="py-4"
                        >
                            {distributionDistricts.slice(Math.ceil(distributionDistricts.length / 2)).map((district, index) => (
                                <div
                                    key={`row2-${index}`}
                                    className="mx-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-default"
                                >
                                    <span className="text-white font-medium whitespace-nowrap flex items-center gap-2">
                                        <span className="w-2 h-2 bg-brand-mid rounded-full" />
                                        {district}
                                    </span>
                                </div>
                            ))}
                        </Marquee>
                    </div>
                </div>

                {/* Stats under marquee */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="max-w-7xl mx-auto px-8 lg:px-12 mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-16"
                >
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                            <CountUp to={distributionDistricts.length} duration={2} startWhen={true} />+
                        </div>
                        <div className="text-white/50 text-sm uppercase tracking-wider">Districts</div>
                    </div>
                    <div className="w-px h-12 bg-white/20 hidden md:block" />
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-white mb-1">500+</div>
                        <div className="text-white/50 text-sm uppercase tracking-wider">Retailers</div>
                    </div>
                    <div className="w-px h-12 bg-white/20 hidden md:block" />
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-white mb-1">Pan Nepal</div>
                        <div className="text-white/50 text-sm uppercase tracking-wider">Coverage</div>
                    </div>
                </motion.div> */}
            </section>


            {/* <NepalOutline>
                <div></div>
            </NepalOutline> */}

            {/* About Section Continuation */}
            <div id="about">
                <About />
            </div>
        </div>
    );
}


const productLines = [
    {
        name: 'Pathsala',
        tagline: 'Timeless quality for everyday writing',
        href: '/products?brand=pathsala',
        color: '#b45309',
        image: pathsalaLogo,
    },
    {
        name: 'Puspanjali Plus',
        tagline: 'Empowering education through quality stationery',
        href: '/products?brand=puspanjali-plus',
        color: '#0d9488',
        image: puspanjaliPlusLogo,
    },
    {
        name: 'Ruff',
        tagline: 'Where professionalism meets precision',
        href: '/products?brand=campus-ruff',
        color: '#4338ca',
        image: ruffLogo,
    },
    {
        name: 'Bullet Plus',
        tagline: 'Where professionalism meets precision',
        href: '/products?brand=bullet-plus',
        color: '#ff00ea',
        image: bulletPlusLogo,
    },
];

const stats = [
    { value: '4', label: 'Product Lines' },
    { value: '30+', label: 'Notebook Variants' },
    { value: '100%', label: 'Quality Tested' },
    { value: 'Nepal', label: 'Proudly Made In' },
];

const distributionDistricts: string[] = [
    'Kathmandu',
    'Chitwan',
    'Pokhara',
    'Butwal',
    'Biratnagar',
    'Birgunj',
    'Dharan',
    'Bharatpur',
    'Hetauda',
    'Janakpur',
    'Nepalgunj',
    'Dhangadhi',
    'Itahari',
    'Bhaktapur',
    'Lalitpur',
    'Kirtipur',
    'Damak',
    'Tulsipur',
    'Ghorahi',
    'Birendranagar',
    'Mahendranagar',
    'Lahan',
    'Rajbiraj',
    'Gaur',
    'Tansen',
    'Baglung',
    'Beni',
    'Damauli',
    'Gorkha',
    'Syangja',
];

export default Landing;

