import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import Carousel from '../components/ui/Carousel';
import CountUp from '../components/CountUp';
import { NotebookService } from '../services/notebooks.service';
import type { Notebook } from '../types';
// import { GlowingCards, GlowingCard } from '../components/lightswind/glowing-cards'; // Moved to UnifiedFeaturesSection
import UnifiedFeaturesSection from '../components/layout/UnifiedFeaturesSection';
import { About } from './About';
import pathsalaLogo from '../assets/images/logos/pathsala.png';
import puspanjaliPlusLogo from '../assets/images/logos/puspanjali.png';
import ruffLogo from '../assets/images/logos/ruff_copy.png';
import bulletPlusLogo from '../assets/images/logos/bullet_plus.png';

// Facility images for the slideshow
import facility1 from '../assets/images/photos/factory-1.webp';
import facility2 from '../assets/images/photos/factory-2.webp';
import facility3 from '../assets/images/photos/factory-3.webp';
import facility4 from '../assets/images/photos/factory-4.webp';
import facility5 from '../assets/images/photos/factory-5.webp';
import facilityFront from '../assets/images/photos/front.webp';
import warehouse1 from '../assets/images/photos/warehouse-1.webp';
import warehouse2 from '../assets/images/photos/warehouse-2.webp';
import warehouse3 from '../assets/images/photos/warehouse-3.webp';

// All facility images in a single slideshow
const facilityImages = [
    { src: facilityFront, label: 'Our Facility' },
    { src: facility1, label: 'Production Line' },
    { src: facility2, label: 'Manufacturing Unit' },
    { src: facility3, label: 'Quality Control' },
    { src: facility4, label: 'Printing Section' },
    { src: facility5, label: 'Finishing Area' },
    { src: warehouse1, label: 'Warehouse' },
    { src: warehouse2, label: 'Storage Facility' },
    { src: warehouse3, label: 'Distribution Center' },
];


/**
 * Modern landing page with animated hero and feature sections.
 */
export function Landing() {
    const navigate = useNavigate();
    const [brandedProducts, setBrandedProducts] = useState<Notebook[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-advance slideshows (staggered timers)
    // Auto-advance the single background slideshow
    useEffect(() => {
        const t1 = setInterval(() => setCurrentSlide((p) => (p + 1) % facilityImages.length), 4000);
        return () => { clearInterval(t1); };
    }, []);

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
            {/* ===== TEMPORARY HERO SECTION (Testing) ===== */}
            {/* ===== TEMPORARY HERO SECTION (Testing) ===== */}
            <section className="relative overflow-hidden w-full bg-ivory">
                {/* ── Desktop-only Full-bleed Background ── */}
                <div className="absolute inset-0 z-0 hidden lg:block">
                    <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/40 to-transparent z-10" />
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={`bg-desktop-${currentSlide}`}
                            src={facilityImages[currentSlide].src}
                            alt={facilityImages[currentSlide].label}
                            initial={{ opacity: 0, scale: 1.06 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 1.2, ease: 'easeInOut' }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>
                </div>

                {/* Content Container */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-20 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16 items-center">

                        {/* 1. Text Content (Always first in flow) */}
                        <div className="relative text-center lg:text-left flex flex-col items-center lg:items-start z-20">
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

                            {/* Subheadline (Brief on mobile) */}
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className=" text-sm text-lg md:text-xl text-slate-600 leading-relaxed mb-10 max-w-xl"
                            >
                                From classrooms to boardrooms, quality stationery that inspires
                                creativity and supports your every written word.
                            </motion.p>

                            {/* CTA Buttons (Desktop only or below slideshow on mobile?) */}
                            {/* User asked for title at top, slideshow below it. CTA fits best below text or below slideshow. 
                                Usually title+subtext go together. Let's keep CTAs below subheadline for now. */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.45 }}
                                className="hidden lg:flex flex-row items-start gap-4"
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

                        {/* 2. Mobile-only Slideshow Block / Desktop visual space */}
                        <div className="relative">
                            {/* Mobile Slideshow */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="lg:hidden relative aspect-[4/3] sm:aspect-video w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={`bg-mobile-${currentSlide}`}
                                        src={facilityImages[currentSlide].src}
                                        alt={facilityImages[currentSlide].label}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.8 }}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </AnimatePresence>

                                {/* Label in center */}
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <motion.div
                                        key={`label-mobile-${currentSlide}`}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="px-6 py-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-medium tracking-wide"
                                    >
                                        {facilityImages[currentSlide].label}
                                    </motion.div>
                                </div>

                                {/* Dark overlay for readability if needed, but centering label is the goal */}
                                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                            </motion.div>

                            {/* Mobile CTA Buttons (Below slideshow) */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="lg:hidden flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
                            >
                                <Link
                                    to="/products"
                                    className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-deep text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                                >
                                    Explore Products
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                                <Link
                                    to="/#about"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-brand-deep/20 text-brand-deep font-semibold rounded-xl hover:bg-brand-deep/5 transition-all duration-300"
                                >
                                    Learn About Us
                                </Link>
                            </motion.div>

                            {/* Desktop Label (Optional, but user said "label in the center of the image" for mobile, let's add it to desktop background too for consistency if it looks good) */}
                            {/* Actually, user specified "in mobile view". Let's stick to mobile primarily. */}
                        </div>
                    </div>
                </div>

                {/* Accent glows for desktop background */}
                <div className="hidden lg:block">
                    <motion.div
                        animate={{ opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-brand-light/20 to-brand-mid/10 rounded-full blur-3xl z-[1]"
                    />
                    <motion.div
                        animate={{ opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                        className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-gradient-to-tl from-brand-deep/15 to-brand-lightest/10 rounded-full blur-3xl z-[1]"
                    />
                </div>
            </section>
            {/* ===== END TEMPORARY HERO SECTION ===== */}


            {/* ===== LOGO MARQUEE SECTION ===== */}
            <section className='py-12 md:py-24 bg-ivory w-full'>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-full mb-16 px-4 sm:px-6 lg:px-12 overflow-hidden"
                >
                    {/* Decorative Quote Marks Background */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 select-none opacity-[0.03] pointer-events-none">
                        <span className="text-[20rem] font-serif leading-none">"</span>
                    </div>

                    <div className="max-w-5xl mx-auto text-center relative z-10">
                        <div className="inline-flex items-center justify-center mb-6">
                            {/* <div className="h-[1px] w-8 bg-amber-500/30"></div> */}
                            {/* <span className="mx-4 text-xs font-bold uppercase tracking-[0.3em] text-amber-600/60">Our Philosophy</span> */}
                            <div className="h-[1px] w-8 bg-transparent"></div>
                        </div>

                        <div className="relative inline-block">
                            <span className="absolute -top-8 -left-10 text-6xl text-amber-500/20 font-serif">"</span>
                            <h2 className="font-ananda italic text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight bg-gradient-to-r from-charcoal via-amber-600 to-charcoal bg-clip-text text-transparent px-4 py-2">
                                {"u'0f:t/Lo pTkfbg dof{lbt Jofkf/, gj k'ikf~hnL slk pBf]usf] cfwf/"}
                            </h2>
                            <span className="absolute -bottom-8 -right-10 text-6xl text-amber-500/20 font-serif">"</span>
                        </div>
                    </div>
                </motion.div>
                <Marquee>
                    {logos.map((logo, index) => (
                        <div className='w-32 mx-8 md:w-54 md:mx-20'>
                            <img key={index} src={logo.img} alt={logo.name} />
                        </div>
                    ))}
                </Marquee>


            </section>



            {/* Unified Features & Quality Section */}
            <UnifiedFeaturesSection />

            {/* Product Lines Preview */}
            <section className="py-12 md:py-24 bg-ivory w-full hidden md:block">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
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
                                Four distinct brands designed to meet specific needs
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

                    {/* Product Lines Carousel */}
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
            <section className="py-12 md:py-24 bg-white w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
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
                                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal mb-2">
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
            <section className="py-12 md:py-24 bg-transparent overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-darkest/5 text-brand-darkest/80 text-sm font-medium rounded-full mb-4 border border-brand-darkest/10">
                            <svg className="w-4 h-4 text-brand-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Our Reach Across Nepal
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                            Distributing Nationwide
                        </h2>
                        <p className="text-graphite text-lg max-w-2xl mx-auto">
                            Reaching every district in Nepal with quality notebooks that inspire.
                        </p>
                    </motion.div>
                </div>

                {/* Districts Display - Responsive Container */}
                <div className="relative">
                    {/* Mobile Compact Description */}
                    <div className="md:hidden px-6 mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl border border-brand-darkest/10 p-8 flex flex-col items-center text-center gap-6 shadow-subtle"
                        >
                            <div className="w-16 h-16 bg-brand-deep/10 flex items-center justify-center rounded-full">
                                <svg className="w-8 h-8 text-brand-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-charcoal mb-2">Nationwide Coverage</h3>
                                <p className="text-slate-text leading-relaxed">
                                    We are proud to distribute our premium notebooks to every corner of Nepal, reaching students and professionals across all <strong>77 districts</strong>.
                                </p>
                            </div>
                            <div className="w-full h-px bg-brand-darkest/5" />
                            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                                <span className="text-brand-deep font-medium text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-brand-deep rounded-full" />
                                    Mechi to Mahakali
                                </span>
                                <span className="text-brand-mid font-medium text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-brand-mid rounded-full" />
                                    Himal to Terai
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Desktop Marquee Layout (hidden on mobile) */}
                    <div className="hidden md:block">
                        {/* Gradient Overlays for smooth fade effect */}
                        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-ivory to-transparent z-10" />
                        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-ivory to-transparent z-10" />

                        {/* First Marquee - Left to Right */}
                        <Marquee
                            speed={40}
                            gradient={false}
                            className="py-4"
                        >
                            {distributionDistricts.slice(0, Math.ceil(distributionDistricts.length / 2)).map((district, index) => (
                                <div
                                    key={`row1-${index}`}
                                    className="mx-3 px-6 py-3 bg-white/50 backdrop-blur-sm rounded-full border border-brand-darkest/10 hover:bg-brand-deep/5 hover:border-brand-deep/20 hover:scale-105 transition-all duration-300 cursor-default shadow-sm"
                                >
                                    <span className="text-charcoal font-medium whitespace-nowrap flex items-center gap-2">
                                        <span className="w-2 h-2 bg-brand-deep rounded-full" />
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
                                    className="mx-3 px-6 py-3 bg-white/50 backdrop-blur-sm rounded-full border border-brand-darkest/10 hover:bg-brand-mid/5 hover:border-brand-mid/20 hover:scale-105 transition-all duration-300 cursor-default shadow-sm"
                                >
                                    <span className="text-charcoal font-medium whitespace-nowrap flex items-center gap-2">
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
        name: 'Puspanjali',
        tagline: 'Empowering education through quality stationery',
        href: '/products?brand=puspanjali',
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

const logos = [
    { name: 'Pathsala', img: pathsalaLogo },
    { name: 'Puspanjali', img: puspanjaliPlusLogo },
    { name: 'Ruff', img: ruffLogo },
    { name: 'Bullet Plus', img: bulletPlusLogo },
]

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

