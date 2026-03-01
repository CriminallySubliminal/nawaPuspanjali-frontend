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
    const [showAllDistricts, setShowAllDistricts] = useState(false);
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
            <section
                className="relative overflow-hidden w-full min-h-[40vh] md:min-h-[60vh]"
            >
                {/* ── Full-bleed Background Slideshow ── */}
                <div
                    className="absolute inset-0"
                    style={{
                        WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0) 75%)',
                        maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0) 75%)',
                    }}
                >
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={`bg-${currentSlide}`}
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

                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-[0.03] z-[1]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
                        backgroundSize: '24px 24px',
                    }}
                />

                {/* Accent glow */}
                <motion.div
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-32 -left-32 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-brand-light/20 to-brand-mid/10 rounded-full blur-3xl z-[1]"
                />
                <motion.div
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    className="absolute -bottom-32 -right-32 w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-gradient-to-tl from-brand-deep/15 to-brand-lightest/10 rounded-full blur-3xl z-[1]"
                />

                {/* Hero Content: Text + SVG Illustration */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
                        {/* Left Side - Text Content */}
                        <div className="text-left">
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="mb-8"
                            >
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
                                className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 max-w-xl"
                            >
                                From classrooms to boardrooms — quality stationery that inspires
                                creativity and supports your every written word.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.45 }}
                                className="flex flex-col sm:flex-row items-start gap-4"
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

                        {/* Right Side - SVG Illustration */}
                        {/* <motion.div
                            initial={{ opacity: 0, x: 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative flex items-center justify-center"
                        >
                            <img
                                src={documentSvg}
                                alt="Stationery illustration"
                                className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto drop-shadow-lg"
                            />
                        </motion.div> */}
                    </div>
                </div>


            </section>
            {/* ===== END TEMPORARY HERO SECTION ===== */}


            {/* ===== LOGO MARQUEE SECTION ===== */}
            <section className='py-12 md:py-24 bg-ivory w-full'>
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
            <section className="py-12 md:py-24 bg-gradient-to-r from-brand-darkest via-brand-deep to-brand-darkest overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full mb-12">
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

