import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Modern landing page with animated hero and feature sections.
 */
export function Landing() {
    return (
        <div>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-ivory via-warm-gray to-ivory py-32 lg:py-40 w-full">
                <div className="w-full p-5">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Text content */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-block px-4 py-2 bg-amber-500/10 text-amber-700 text-sm font-semibold rounded-full mb-6"
                            >
                                Crafted in Nepal 🇳🇵
                            </motion.span>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-normal mb-6"
                            >
                                Quality Notebooks for{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">
                                    Every Purpose
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-lg text-graphite leading-relaxed mb-8 max-w-lg"
                            >
                                Puspanjali brings precision manufacturing to stationery. From academic
                                essentials to professional journals, we craft notebooks that serve your
                                writing needs with reliability.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-wrap gap-4"
                            >
                                <Link
                                    to="/brands"
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-charcoal text-white font-semibold rounded-xl shadow-medium hover:shadow-heavy hover:bg-charcoal-light transition-all duration-200"
                                >
                                    Explore Products
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                                <Link
                                    to="/about"
                                    className="inline-flex items-center gap-2 px-8 py-4 border-2 border-charcoal text-charcoal font-semibold rounded-xl hover:bg-charcoal hover:text-white transition-all duration-200"
                                >
                                    Learn About Us
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Visual element */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative hidden lg:block"
                        >
                            <div className="relative">
                                {/* Decorative circles */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                                    className="absolute -top-8 -right-8 w-64 h-64 border border-amber-200 rounded-full"
                                />
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                                    className="absolute -bottom-4 -left-4 w-48 h-48 border border-teal-200 rounded-full"
                                />

                                {/* Main image grid */}
                                <div className="grid grid-cols-2 gap-4 relative z-10">
                                    <motion.div
                                        whileHover={{ y: -8, rotate: -2 }}
                                        className="aspect-notebook bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl shadow-heavy overflow-hidden"
                                    >
                                        <img
                                            src="https://picsum.photos/seed/notebook1/400/560"
                                            alt="Notebook sample"
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ y: -8, rotate: 2 }}
                                        className="aspect-notebook bg-gradient-to-br from-teal-100 to-teal-50 rounded-2xl shadow-heavy overflow-hidden mt-8"
                                    >
                                        <img
                                            src="https://picsum.photos/seed/notebook2/400/560"
                                            alt="Notebook sample"
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-32 bg-white w-full">
                <div className="max-w-7xl mx-auto px-8 lg:px-12 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                            Why Puspanjali
                        </h2>
                        <p className="text-graphite text-lg max-w-2xl mx-auto">
                            Built on principles of quality, reliability, and thoughtful design
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="bg-ivory rounded-2xl p-8 shadow-subtle hover:shadow-medium transition-all"
                            >
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                                    style={{ backgroundColor: `${feature.color}15` }}
                                >
                                    <div style={{ color: feature.color }}>
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-charcoal mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-graphite leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Product Lines Preview */}
            <section className="py-32 bg-ivory w-full">
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
                            to="/brands"
                            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors"
                        >
                            View all products
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </motion.div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {productLines.map((line, index) => (
                            <motion.div
                                key={line.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link
                                    to={line.href}
                                    className="group block bg-white rounded-2xl p-8 shadow-subtle hover:shadow-heavy transition-all h-full"
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                                        style={{ backgroundColor: line.color }}
                                    >
                                        <span className="text-white text-xl font-bold">
                                            {/* Brand Logo Here */}
                                            {line.name.charAt(0)} 
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-charcoal mb-2 group-hover:text-amber-600 transition-colors">
                                        {line.name}
                                    </h3>
                                    <p className="text-graphite text-sm italic">
                                        {line.tagline}
                                    </p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 bg-charcoal ">
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
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-slate-text uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

const features = [
    {
        title: 'Quality Assured',
        description: 'Every notebook undergoes rigorous quality checks. From paper weight to binding strength, we ensure consistency in every batch.',
        color: '#f59e0b',
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
    },
    {
        title: 'Wide Selection',
        description: 'Multiple brands, sizes, and specifications to match your exact requirements. Academic, professional, or everyday use.',
        color: '#0d9488',
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        ),
    },
    {
        title: 'Made in Nepal',
        description: 'Proudly manufactured in Nepal, supporting local industry and craftsmanship while serving customers nationwide.',
        color: '#4338ca',
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
];

const productLines = [
    {
        name: 'Pathsala',
        tagline: 'Timeless quality for everyday writing',
        href: '/brands/classic',
        color: '#b45309',
    },
    {
        name: 'Puspanjali Plus',
        tagline: 'Empowering education through quality stationery',
        href: '/brands/academic',
        color: '#0d9488',
    },
    {
        name: 'Ruff',
        tagline: 'Where professionalism meets precision',
        href: '/brands/professional',
        color: '#4338ca',
    },
    {
        name: 'Bullet Plus',
        tagline: 'Where professionalism meets precision',
        href: '/brands/professional',
        color: '#ff00eaff',
    },
];

const stats = [
    { value: '4', label: 'Product Lines' },
    { value: '30+', label: 'Notebook Variants' },
    { value: '100%', label: 'Quality Tested' },
    { value: 'Nepal', label: 'Proudly Made In' },
];

export default Landing;
