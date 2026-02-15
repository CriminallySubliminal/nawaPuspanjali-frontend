import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GridPattern from '@/components/ui/grid-pattern';
import { cn } from '@/lib/utils';
import CircularGallery from '@/components/ui/CircularGallery';


/**
 * About page with company story and values in a Z-pattern layout.
 */
export function About() {
    return (
        <div className="min-h-screen bg-ivory relative overflow-hidden">
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

            {/* Hero Section */}
            <section className="relative py-20 lg:py-24 overflow-hidden">
                <div className="container-wide relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-amber-100/50 text-amber-800 text-lg font-serif font-medium mb-6 backdrop-blur-sm border border-amber-200/50">
                            {/* <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span> */}
                            Since 2056 B.S.
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-charcoal mb-8 tracking-tight">
                            Crafting Nepal's <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400">
                                Writing Legacy
                            </span>
                        </h1>
                        <p className="text-xl text-slate-text max-w-2xl mx-auto leading-relaxed">
                            More than just paper and ink. We are on a mission to empower education
                            and creativity through premium, sustainable stationery.
                        </p>
                    </motion.div>
                </div>
                {/* Decorative background blur */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />
            </section>

            {/* Section 1: Our Story (Text Left, Visual Right) */}
            <section className="py-20 lg:py-20 relative z-10">
                <div className="container-wide">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
                                Rooted in Heritage
                            </h2>
                            <div className="space-y-6 text-lg text-slate-text leading-relaxed">
                                <span className="font-bold text-charcoal">Nawa Puspanjali Copy Tatha Stationery Udhyog Pvt. Ltd. </span>
                                <span>
                                    began with a simple yet powerful vision: to provide Nepal with
                                    world-class stationery that honors our crafting traditions while embracing
                                    modern innovation.
                                </span>
                                <p>
                                    Located in the heart of Kathmandu, our facility is not just a factory—it's
                                    a hub where precision technology meets the careful eye of skilled artisans.
                                    Every notebook that leaves our hands carries the essence of Nepalese dedication.
                                </p>
                            </div>
                            <div className="mt-10">
                                <div className="flex items-center gap-4">
                                    <div className="flex -space-x-4">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className={`w-12 h-12 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 overflow-hidden`}>
                                                {/* Placeholder for team avatars */}
                                                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-handwriting text-2xl text-amber-600 font-bold">Trusted by Thousands</p>
                                        <p className="text-slate-text font-serif">Students & Professionals across Nepal</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7 }}
                            className="relative"
                        >
                            <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden bg-ivory border border-amber-100/50 shadow-2xl shadow-amber-900/5">
                                
                                <div className="absolute inset-0 flex items-center justify-center p-12 opacity-80">
                                    <div className="w-full h-full bg-gradient-to-br from-amber-100/50 to-transparent rounded-full blur-3xl" />
                                </div>
                              
                                <div className="absolute bottom-8 left-8 right-8 bg-white/80 backdrop-blur-md p-6 rounded-xl border border-white/50 shadow-lg">
                                    <h3 className="font-serif font-bold text-charcoal mb-1 text-xl">Jyamire, Chitwan, Nepal</h3>
                                    <p className="text-sm text-slate-text">Our central hub for design and manufacturing, connecting creativity across the diverse landscapes of Nepal.</p>
                                </div>
                            </div>
                         
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl -z-10" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-400/10 rounded-full blur-2xl -z-10" />
                        </motion.div> */}
                    </div>
                </div>
            </section>

            {/* Section 2: Gallery */}
            <section className="py-20 bg-ivory overflow-hidden">
                <div className="container-wide mb-12 text-center">
                    {/* <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                        A Glimpse into Our World
                    </h2>
                    <p className="text-lg text-slate-text max-w-2xl mx-auto">
                        From raw materials to finished masterpieces, witness the journey of perfection.
                    </p> */}
                </div>
                <div className="h-[600px] w-full">
                    <CircularGallery
                        items={[
                            { image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=2787&auto=format&fit=crop', text: '' },
                            { image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=2787&auto=format&fit=crop', text: '' },
                            { image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2670&auto=format&fit=crop', text: '' },
                            { image: 'https://images.unsplash.com/photo-1606166187734-a4b787c80088?q=80&w=2670&auto=format&fit=crop', text: '' },
                            { image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=2574&auto=format&fit=crop', text: '' },
                            { image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2670&auto=format&fit=crop', text: '' },
                        ]}
                        bend={-3}
                        textColor="#1f2937"
                        borderRadius={0.05}
                    />
                </div>
            </section>

            {/* Section 3: Quality (Visual Left, Text Right) */}
            <section className="py-20 lg:py-24 relative z-10 bg-white/50 backdrop-blur-sm">
                <div className="container-wide">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7 }}
                            className="order-2 lg:order-1 relative"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4 pt-8">
                                    <div className="aspect-[3/4] rounded-xl bg-gray-100 overflow-hidden shadow-lg border border-gray-100">
                                        {/* Placeholder for close-up of paper texture */}
                                        <div className="w-full h-full bg-[#fcfbf9] relative">
                                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                                            <div className="absolute bottom-4 left-4 right-4 text-xs font-bold text-gray-400 tracking-widest uppercase">Premium Paper</div>
                                        </div>
                                    </div>
                                    <div className="aspect-[4/3] rounded-xl bg-amber-100 overflow-hidden shadow-lg border border-amber-50 relative group">
                                        <div className="absolute inset-0 flex items-center justify-center text-amber-800/20 group-hover:text-amber-600/30 transition-colors">
                                            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" /></svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="aspect-[4/3] rounded-xl bg-teal-50 overflow-hidden shadow-lg border border-teal-50 relative group">
                                        <div className="absolute inset-0 flex items-center justify-center text-teal-800/20 group-hover:text-teal-600/30 transition-colors">
                                            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                                        </div>
                                    </div>
                                    <div className="aspect-[3/4] rounded-xl bg-charcoal-light overflow-hidden shadow-lg border border-charcoal relative">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-white/80 font-serif italic text-3xl">Est. 2020</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7 }}
                            className="order-1 lg:order-2"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
                                Uncompromising Quality
                            </h2>
                            <div className="space-y-6 text-lg text-slate-text leading-relaxed">
                                <p>
                                    Quality isn't just a buzzword for us; it's the foundation of everything we do.
                                    We carefully select premium papers that are a joy to write on—smooth,
                                    bleed-resistant, and durable.
                                </p>
                                <p>
                                    From the binding that lays flat to the covers that withstand daily wear,
                                    our obsessive attention to detail ensures that your Puspanjali notebook
                                    is a reliable companion for your ideas, notes, and sketches.
                                </p>
                            </div>
                            <ul className="mt-8 space-y-4">
                                {['Premium 70-100 GSM Paper', 'Durable Binding Technologies', 'Precision Cut Edges'].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-charcoal font-medium">
                                        <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section 4: Vision & Leadership */}
            <section className="py-20 lg:py-32 relative z-10">
                <div className="container-wide">
                    <div className="mb-16 md:text-center max-w-3xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold text-charcoal mb-4"
                        >
                            Visionary Leadership
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-slate-text"
                        >
                            Guided by the wisdom of our founder and driven by the passion of the next generation.
                        </motion.p>
                    </div>

                    <div className="space-y-16">
                        {/* Level 1: The Founder */}
                        <div className="flex justify-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center max-w-lg"
                            >
                                <div className="w-40 h-40 mx-auto rounded-full bg-amber-100 border-4 border-white shadow-xl overflow-hidden mb-6 relative group">
                                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
                                        {/* Placeholder for Grandfather's Photo */}
                                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-charcoal font-serif">Chandra Prasad Khanal</h3>
                                <p className="text-amber-600 font-medium mb-4 tracking-widest uppercase text-xs">Founder & Chairman</p>
                                <blockquote className="italic text-slate-text text-xl font-serif relative px-8">
                                    <span className="text-4xl text-amber-200 absolute top-0 left-0">"</span>
                                    Our legacy is built on the simple promise of quality. We don't just make notebooks; we craft the canvas for Nepal's future.
                                    <span className="text-4xl text-amber-200 absolute bottom-0 right-0">"</span>
                                </blockquote>
                            </motion.div>
                        </div>

                        {/* Connector Line (Animated) */}
                        <div className="hidden lg:flex justify-center -my-8 relative z-0 opacity-30">
                            {/* Top Vertical Line */}
                            <motion.div
                                initial={{ height: 0 }}
                                whileInView={{ height: '4rem' }} // h-16
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="w-px bg-charcoal"
                            ></motion.div>

                            {/* Horizontal Line */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                                className="absolute top-16 w-3/4 h-px bg-charcoal origin-center"
                            ></motion.div>

                            {/* Bottom Vertical Lines */}
                            <div className="absolute top-16 w-3/4 flex justify-between">
                                {[0, 1, 2, 3].map((i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        whileInView={{ height: '2rem' }} // h-8
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 1.2 + (i * 0.1) }}
                                        className="w-px bg-charcoal"
                                    ></motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Level 2: The Partners */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
                            {[
                                { name: "Keshav Khanal", role: "Managing Director", quote: "Innovation is respecting tradition while embracing the future." },
                                { name: "Kiran Kumar Khanal", role: "Director of Operations", quote: "Efficiency meets excellence in every page we produce." },
                                { name: "Kumar Khanal", role: "Director of Quality", quote: "Perfection is not an accident; it is the result of high intention." },
                                { name: "Kishor Khanal", role: "Director of Marketing", quote: "Connecting our stories with yours, one notebook at a time." }
                            ].map((partner, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center group p-6 rounded-2xl hover:bg-white hover:shadow-subtle transition-all duration-300"
                                >
                                    <div className="w-32 h-32 mx-auto rounded-full bg-gray-100 border-4 border-white shadow-lg overflow-hidden mb-4 relative">
                                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
                                            {/* Placeholder for Partner's Photo */}
                                            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                                        </div>
                                    </div>
                                    <h4 className="text-xl font-bold text-charcoal mb-1 font-serif group-hover:text-amber-600 transition-colors">{partner.name}</h4>
                                    <p className="text-sm text-amber-600 font-medium mb-3">{partner.role}</p>
                                    <p className="text-sm text-slate-text italic font-serif">
                                        "{partner.quote}"
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 lg:py-32 relative z-10">
                <div className="container-wide">
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-block p-1 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600"
                        >
                            <div className="bg-ivory rounded-xl custom-border p-10 md:p-16 text-center">
                                <h2 className="text-3xl font-bold text-charcoal mb-6 font-serif">Start Your Journey with Us</h2>
                                <p className="text-slate-text mb-8 max-w-lg mx-auto">
                                    Discover the difference a premium notebook makes to your productivity and creativity.
                                </p>
                                <Link
                                    to="/brands"
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-charcoal text-white font-bold rounded-xl shadow-lg hover:bg-charcoal-light hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    Explore Our Collection
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}



export default About;

