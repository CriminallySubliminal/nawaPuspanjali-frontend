import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GridPattern from '@/components/ui/grid-pattern';
import { cn } from '@/lib/utils';

const WHATSAPP_NUMBER = '9779800000000'; // Replace with actual number (country code + number, no +)
const WHATSAPP_MESSAGE = encodeURIComponent(
    'Hello! I am interested in Puspanjali notebooks. Could you help me with more information?'
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const },
    }),
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number = 0) => ({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const },
    }),
};

/**
 * Modern Contact page with WhatsApp integration, glassmorphism cards, and rich UI.
 */
export function Contact() {
    return (
        <div className="min-h-screen bg-ivory relative overflow-hidden">
            {/* Background Grid Pattern */}
            <GridPattern
                width={40}
                height={40}
                x={-1}
                y={-1}
                strokeDasharray={"4 2"}
                className={cn(
                    "fixed inset-0 z-0 opacity-30 text-warm-gray-dark",
                )}
            />

            {/* ─── Hero Section ─── */}
            <section className="relative py-20 lg:py-28 overflow-hidden">
                <div className="container-wide relative z-10 text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/50 text-amber-800 text-sm font-medium mb-6 backdrop-blur-sm border border-amber-200/50">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                            We'd love to hear from you
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-charcoal mb-6 tracking-tight">
                            Let's{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400">
                                Connect
                            </span>
                        </h1>
                        <p className="text-xl text-slate-text max-w-2xl mx-auto leading-relaxed">
                            Have questions about our products, want to place a bulk order, or
                            interested in a partnership? We're here to help.
                        </p>
                    </motion.div>
                </div>
                {/* Decorative blurs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 w-72 h-72 bg-teal-200/15 rounded-full blur-3xl pointer-events-none" />
            </section>

            {/* ─── Quick Contact Cards ─── */}
            <section className="relative z-10 -mt-6 pb-16">
                <div className="container-wide">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                icon: <LocationIcon />,
                                title: 'Visit Us',
                                content: 'Jyamire, Chitwan, Nepal',
                                color: 'from-blue-500/10 to-indigo-500/10',
                                iconBg: 'bg-blue-100',
                                iconColor: 'text-blue-600',
                            },
                            {
                                icon: <EmailIcon />,
                                title: 'Email Us',
                                content: 'pushpanjalicopy@gmail.com',
                                href: 'mailto:pushpanjalicopy@gmail.com',
                                color: 'from-purple-500/10 to-pink-500/10',
                                iconBg: 'bg-purple-100',
                                iconColor: 'text-purple-600',
                            },
                            {
                                icon: <PhoneIcon />,
                                title: 'Call Us',
                                content: '+977-56-XXXXXX',
                                href: 'tel:+97756XXXXXX',
                                color: 'from-amber-500/10 to-orange-500/10',
                                iconBg: 'bg-amber-100',
                                iconColor: 'text-amber-600',
                            },
                            {
                                icon: <WhatsAppIcon />,
                                title: 'WhatsApp',
                                content: 'Chat with us instantly',
                                href: WHATSAPP_URL,
                                external: true,
                                color: 'from-green-500/10 to-emerald-500/10',
                                iconBg: 'bg-green-100',
                                iconColor: 'text-green-600',
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={scaleIn}
                            >
                                <ContactCard {...item} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── WhatsApp CTA Banner ─── */}
            <section className="relative z-10 pb-16">
                <div className="container-wide">
                    <motion.a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="block relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] p-8 md:p-10 shadow-lg group cursor-pointer"
                    >
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                                    <WhatsAppIcon className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-1">
                                        Start a Conversation on WhatsApp
                                    </h3>
                                    <p className="text-white/80 text-sm md:text-base">
                                        Get instant replies for orders, pricing, and inquiries — no forms needed!
                                    </p>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#128C7E] font-bold shadow-md group-hover:shadow-lg transition-shadow">
                                    Chat Now
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        {/* Decorative circles */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full" />
                        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-white/5 rounded-full" />
                    </motion.a>
                </div>
            </section>

            {/* ─── Contact Form + Info Grid ─── */}
            <section className="relative z-10 py-16">
                <div className="container-wide">
                    <div className="grid lg:grid-cols-5 gap-10">
                        {/* Contact Form - 3 cols */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            className="lg:col-span-3"
                        >
                            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-medium border border-gray-100/80">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-charcoal">Send us a Message</h2>
                                        <p className="text-sm text-slate-text">We'll get back to you within 24 hours</p>
                                    </div>
                                </div>

                                <form className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <FormField label="Full Name" id="name" placeholder="Your full name" />
                                        <FormField label="Email" id="email" type="email" placeholder="your@email.com" />
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <FormField label="Phone" id="phone" type="tel" placeholder="+977-XXXXXXXXXX" />
                                        <div>
                                            <label className="block text-sm font-semibold text-charcoal mb-2" htmlFor="subject">
                                                Subject
                                            </label>
                                            <select
                                                id="subject"
                                                className="w-full px-4 py-3.5 bg-ivory border border-warm-gray-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition text-charcoal appearance-none cursor-pointer"
                                            >
                                                <option value="">Select a topic</option>
                                                <option value="order">Product Order</option>
                                                <option value="bulk">Bulk / Wholesale</option>
                                                <option value="partnership">Partnership</option>
                                                <option value="feedback">Feedback</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-charcoal mb-2" htmlFor="message">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={5}
                                            className="w-full px-4 py-3.5 bg-ivory border border-warm-gray-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition resize-none text-charcoal"
                                            placeholder="Tell us what you need..."
                                        />
                                    </div>
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full px-6 py-4 bg-gradient-to-r from-charcoal to-charcoal-light text-white font-bold rounded-xl shadow-medium hover:shadow-heavy transition-all flex items-center justify-center gap-3"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                        Send Message
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>

                        {/* Sidebar Info - 2 cols */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={1}
                            variants={fadeUp}
                            className="lg:col-span-2 space-y-6"
                        >
                            {/* Business Hours Card */}
                            <div className="bg-white rounded-2xl p-7 shadow-medium border border-gray-100/80">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                                        <ClockIcon />
                                    </div>
                                    <h3 className="text-lg font-bold text-charcoal">Business Hours</h3>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        { day: 'Sunday – Friday', time: '9:00 AM – 6:00 PM', active: true },
                                        { day: 'Saturday', time: 'Closed', active: false },
                                    ].map((schedule) => (
                                        <div
                                            key={schedule.day}
                                            className={cn(
                                                "flex items-center justify-between px-4 py-3 rounded-xl",
                                                schedule.active
                                                    ? "bg-teal-50/50 border border-teal-100"
                                                    : "bg-gray-50 border border-gray-100"
                                            )}
                                        >
                                            <span className="font-medium text-charcoal text-sm">{schedule.day}</span>
                                            <span className={cn(
                                                "text-sm font-semibold",
                                                schedule.active ? "text-teal-600" : "text-gray-400"
                                            )}>
                                                {schedule.time}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Actions Card */}
                            <div className="bg-white rounded-2xl p-7 shadow-medium border border-gray-100/80">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-charcoal">Quick Actions</h3>
                                </div>
                                <div className="space-y-3">
                                    <a
                                        href={WHATSAPP_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 rounded-xl bg-green-50 hover:bg-green-100 border border-green-100 transition-colors group"
                                    >
                                        <WhatsAppIcon className="w-5 h-5 text-green-600" />
                                        <span className="text-sm font-semibold text-green-800">Chat on WhatsApp</span>
                                        <svg className="w-4 h-4 text-green-500 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                    <a
                                        href="mailto:pushpanjalicopy@gmail.com"
                                        className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-100 transition-colors group"
                                    >
                                        <EmailIcon className="w-5 h-5 text-purple-600" />
                                        <span className="text-sm font-semibold text-purple-800">Send an Email</span>
                                        <svg className="w-4 h-4 text-purple-500 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                    <Link
                                        to="/brands"
                                        className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-100 transition-colors group"
                                    >
                                        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        <span className="text-sm font-semibold text-amber-800">Browse Products</span>
                                        <svg className="w-4 h-4 text-amber-500 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>

                            {/* Social / Follow Us Card */}
                            <div className="bg-gradient-to-br from-charcoal to-charcoal-light rounded-2xl p-7 shadow-medium text-white">
                                <h3 className="text-lg font-bold mb-2">Follow Us</h3>
                                <p className="text-white/60 text-sm mb-5">Stay connected for updates and offers</p>
                                <div className="flex gap-3">
                                    {[
                                        { label: 'Facebook', icon: <FacebookIcon />, href: '#' },
                                        { label: 'Instagram', icon: <InstagramIcon />, href: '#' },
                                        { label: 'WhatsApp', icon: <WhatsAppIcon className="w-5 h-5" />, href: WHATSAPP_URL },
                                    ].map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                            aria-label={social.label}
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── Map / Location Section ─── */}
            <section className="relative z-10 py-16">
                <div className="container-wide">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="text-center mb-10"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-3">
                            Visit Our Factory
                        </h2>
                        <p className="text-slate-text max-w-xl mx-auto">
                            Come see where quality notebooks are made. We're located in Jyamire, Chitwan, Nepal.
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={1}
                        variants={scaleIn}
                        className="relative"
                    >
                        {/* Map Container with styling */}
                        <div className="relative rounded-2xl overflow-hidden shadow-heavy">
                            {/* Decorative gradient border */}
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800 p-[2px] rounded-2xl">
                                <div className="w-full h-full bg-white rounded-2xl" />
                            </div>

                            {/* Map iframe */}
                            <div className="relative z-10 rounded-2xl overflow-hidden">
                                <iframe
                                    title="Puspanjali Location"
                                    src="https://www.openstreetmap.org/export/embed.html?bbox=84.54062497041809%2C27.612296011390057%2C84.55062497041809%2C27.622296011390057&layer=mapnik&marker=27.617296011390057%2C84.54562497041809"
                                    width="100%"
                                    height="450"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Mobile Location Info */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={1}
                        variants={fadeUp}
                        className="mt-6 bg-white rounded-xl shadow-medium p-5 md:hidden"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-charcoal">Jyamire, Chitwan, Nepal</h3>
                            </div>
                            <a
                                href="https://www.google.com/maps?q=27.617296011390057,84.54562497041809"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-charcoal text-white text-sm font-medium rounded-lg hover:bg-charcoal-light transition-colors"
                            >
                                Directions
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── FAQ Section ─── */}
            <section className="relative z-10 py-16 bg-white/50 backdrop-blur-sm">
                <div className="container-wide max-w-3xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="text-center mb-10"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-3">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-slate-text">
                            Quick answers to common queries
                        </p>
                    </motion.div>
                    <div className="space-y-4">
                        {[
                            {
                                q: 'Do you accept bulk or wholesale orders?',
                                a: 'Absolutely! We offer competitive pricing for bulk and wholesale orders. Contact us via WhatsApp or email for a custom quote.',
                            },
                            {
                                q: 'What areas do you deliver to?',
                                a: 'We deliver across Nepal. For locations outside Chitwan, delivery times may vary. Contact us for specific delivery details.',
                            },
                            {
                                q: 'Can I customize notebook covers or rulings?',
                                a: 'Yes! We offer customization for large orders, including cover design, ruling type, and branding. Reach out to discuss your requirements.',
                            },
                            {
                                q: 'How quickly do you respond to inquiries?',
                                a: 'We typically respond within a few hours on WhatsApp and within 24 hours via email. For urgent inquiries, WhatsApp is the fastest way.',
                            },
                        ].map((faq, i) => (
                            <motion.details
                                key={i}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                className="group bg-white rounded-xl border border-gray-100 shadow-subtle overflow-hidden"
                            >
                                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer select-none">
                                    <span className="font-semibold text-charcoal pr-4">{faq.q}</span>
                                    <svg
                                        className="w-5 h-5 text-slate-text flex-shrink-0 group-open:rotate-180 transition-transform duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </summary>
                                <div className="px-6 pb-5 text-slate-text leading-relaxed">
                                    {faq.a}
                                </div>
                            </motion.details>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Bottom CTA ─── */}
            <section className="relative z-10 py-20">
                <div className="container-wide">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={scaleIn}
                        className="text-center"
                    >
                        <div className="inline-block p-1 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600">
                            <div className="bg-ivory rounded-xl p-10 md:p-14 text-center">
                                <h2 className="text-3xl font-bold text-charcoal mb-4 font-serif">
                                    Ready to Get Started?
                                </h2>
                                <p className="text-slate-text mb-8 max-w-lg mx-auto">
                                    Whether it's a single order or a large partnership, we're just a message away.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <a
                                        href={WHATSAPP_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        <WhatsAppIcon className="w-5 h-5" />
                                        WhatsApp Us
                                    </a>
                                    <Link
                                        to="/brands"
                                        className="inline-flex items-center gap-3 px-8 py-4 bg-charcoal text-white font-bold rounded-xl shadow-lg hover:bg-charcoal-light hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        Explore Products
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

/* ─── Sub-components ─── */

interface ContactCardProps {
    icon: React.ReactNode;
    title: string;
    content: string;
    href?: string;
    external?: boolean;
    color: string;
    iconBg: string;
    iconColor: string;
}

function ContactCard({ icon, title, content, href, external, iconBg, iconColor }: ContactCardProps) {
    const inner = (
        <div className={cn(
            "bg-white rounded-2xl p-6 shadow-subtle border border-gray-100/80 hover:shadow-medium transition-all duration-300 group h-full",
            "hover:-translate-y-1"
        )}>
            <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                iconBg, iconColor
            )}>
                {icon}
            </div>
            <h3 className="text-sm font-semibold text-slate-text uppercase tracking-wider mb-1">{title}</h3>
            <p className="text-charcoal font-semibold group-hover:text-amber-600 transition-colors">{content}</p>
        </div>
    );

    if (href) {
        return external ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">{inner}</a>
        ) : (
            <a href={href} className="block h-full">{inner}</a>
        );
    }

    return inner;
}

function FormField({ label, id, type = 'text', placeholder }: { label: string; id: string; type?: string; placeholder: string }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-charcoal mb-2" htmlFor={id}>
                {label}
            </label>
            <input
                type={type}
                id={id}
                className="w-full px-4 py-3.5 bg-ivory border border-warm-gray-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition text-charcoal"
                placeholder={placeholder}
            />
        </div>
    );
}

/* ─── Icons ─── */

function LocationIcon() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );
}

function EmailIcon({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );
}

function ClockIcon() {
    return (
        <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}

function FacebookIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
    );
}

function InstagramIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
    );
}

export default Contact;
