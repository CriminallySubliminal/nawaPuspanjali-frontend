import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * About page with company story and values.
 */
export function About() {
    return (
        <div className="min-h-screen">
            {/* Header */}
            <section className="bg-gradient-to-b from-warm-gray to-ivory py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <nav className="text-sm text-graphite mb-6" aria-label="Breadcrumb">
                            <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
                            <span className="mx-3">/</span>
                            <span className="text-charcoal font-medium">About Us</span>
                        </nav>
                        <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
                            About Puspanjali
                        </h1>
                        <p className="text-lg text-graphite max-w-2xl">
                            Quality notebook manufacturing from the heart of Nepal
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 bg-ivory">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h2 className="text-2xl font-bold text-charcoal mb-6">Our Story</h2>
                        <p className="text-graphite leading-relaxed mb-6">
                            Puspanjali Notebook Manufacturing has been a trusted name in Nepal's stationery
                            industry. We believe that quality writing materials are fundamental to education
                            and professional success.
                        </p>
                        <p className="text-graphite leading-relaxed mb-12">
                            Our manufacturing facility combines traditional craftsmanship with modern
                            production techniques to deliver notebooks that meet the highest standards
                            of quality and durability.
                        </p>

                        <h2 className="text-2xl font-bold text-charcoal mb-6">Our Values</h2>
                        <div className="grid md:grid-cols-2 gap-6 mb-12">
                            {values.map((value, index) => (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                    className="rounded-xl p-5 "
                                >
                                    <h3 className="text-lg font-semibold text-charcoal mb-2">
                                        {value.title}
                                    </h3>
                                    <p className="text-sm text-graphite">{value.description}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="text-center p-5">
                            <Link
                                to="/brands"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-charcoal text-white font-semibold rounded-xl shadow-medium hover:bg-charcoal-light transition-all"
                            >
                                Explore Our Products
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

const values = [
    {
        title: 'Quality First',
        description: 'Every notebook undergoes rigorous quality checks before leaving our facility.',
    },
    {
        title: 'Local Pride',
        description: 'Proudly manufactured in Nepal, supporting local employment and industry.',
    },
    {
        title: 'Sustainability',
        description: 'Committed to responsible sourcing and environmentally conscious practices.',
    },
    {
        title: 'Innovation',
        description: 'Continuously improving our products based on customer feedback and needs.',
    },
];

export default About;
