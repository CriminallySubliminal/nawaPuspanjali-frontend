import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Contact page with contact info and form.
 */
export function Contact() {
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
                            <span className="text-charcoal font-medium">Contact</span>
                        </nav>
                        <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
                            Contact Us
                        </h1>
                        <p className="text-lg text-graphite max-w-2xl">
                            Get in touch for inquiries, orders, or partnerships
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 bg-ivory">
                <div className="max-w-5xl mx-auto px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h2 className="text-xl font-semibold text-charcoal mb-8">Get in Touch</h2>

                            <div className="space-y-6">
                                <ContactItem
                                    icon={<LocationIcon />}
                                    title="Address"
                                    content="Kathmandu, Nepal"
                                />
                                <ContactItem
                                    icon={<EmailIcon />}
                                    title="Email"
                                    content="info@puspanjali.com.np"
                                />
                                <ContactItem
                                    icon={<PhoneIcon />}
                                    title="Phone"
                                    content="+977-1-XXXXXXX"
                                />
                            </div>

                            <div className="mt-10 pt-8 border-t border-warm-gray-dark">
                                <h3 className="text-sm font-semibold text-graphite uppercase tracking-wider mb-4">
                                    Business Hours
                                </h3>
                                <p className="text-charcoal">
                                    Sunday – Friday: 9:00 AM – 6:00 PM<br />
                                    Saturday: Closed
                                </p>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white rounded-2xl p-8 shadow-subtle"
                        >
                            <h2 className="text-xl font-semibold text-charcoal mb-6">Send us a Message</h2>

                            <form className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2" htmlFor="name">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-4 py-3 bg-ivory border border-warm-gray-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-3 bg-ivory border border-warm-gray-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2" htmlFor="message">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="w-full px-4 py-3 bg-ivory border border-warm-gray-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition resize-none"
                                        placeholder="Your message..."
                                    />
                                </div>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full px-6 py-4 bg-charcoal text-white font-semibold rounded-xl shadow-medium hover:bg-charcoal-light transition-colors"
                                >
                                    Send Message
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}

interface ContactItemProps {
    icon: React.ReactNode;
    title: string;
    content: string;
}

function ContactItem({ icon, title, content }: ContactItemProps) {
    return (
        <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 flex-shrink-0">
                {icon}
            </div>
            <div>
                <h3 className="text-sm font-medium text-graphite mb-1">{title}</h3>
                <p className="text-charcoal font-medium">{content}</p>
            </div>
        </div>
    );
}

function LocationIcon() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );
}

function EmailIcon() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    );
}

function PhoneIcon() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
    );
}

export default Contact;
