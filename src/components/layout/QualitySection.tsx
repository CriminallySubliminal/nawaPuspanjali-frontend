
import { motion } from 'framer-motion';
import { Leaf, Recycle, GraduationCap, Sun, Sprout } from 'lucide-react';


export default function QualitySection() {
    return (
        <section className="py-24 bg-transparent relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(#444 1px, transparent 1px)`,
                    backgroundSize: '32px 32px'
                }}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
<motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 md:mb-24 text-center max-w-4xl mx-auto"
                >
                    <span className="text-brand-deep font-bold tracking-wider uppercase text-sm mb-4 inline-block">
                        Our Commitment
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                        Quality You Can <br />
                        <span className="italic font-serif text-slate-500">Feel & Trust</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        We believe stationery should be good for you and good for the planet.
                        Experience the difference in every sheet.
                    </p>
                </motion.div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[minmax(200px,auto)]">

                    {/* Card 1: Eco-Conscious (Large) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-2 row-span-2 bg-emerald-900 rounded-[2rem] p-10 md:p-14 relative overflow-hidden group"
                    >
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 text-emerald-300">
                                <Leaf className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-4">Eco-Conscious Sourcing</h3>
                                <p className="text-emerald-100/80 text-lg leading-relaxed max-w-md">
                                    We source our paper from certified sustainable forests. Every notebook you buy contributes to a greener, healthier planet for future generations.
                                </p>
                            </div>
                        </div>
                        {/* Decorative Background Icon */}
                        <Sprout className="absolute -bottom-10 -right-10 w-64 h-64 text-emerald-800/20 rotate-12 group-hover:rotate-0 transition-transform duration-700 ease-out" />
                    </motion.div>

                    {/* Card 2: Recyclable (Tall) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="md:row-span-2 bg-blue-50 h-full rounded-[2rem] p-10 flex flex-col relative overflow-hidden group"
                    >
                        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-auto text-blue-600">
                            <Recycle className="w-7 h-7" />
                        </div>
                        <div className="mt-8">
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">100% Recyclable</h3>
                            <p className="text-slate-600">
                                Closing the loop on waste. Our materials are chosen to be fully recyclable.
                            </p>
                        </div>
                        <div className="absolute top-1/2 -right-12 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                    </motion.div>

                    {/* Card 3: Premium Finish (Wide) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="md:col-span-2 bg-slate-900 rounded-[2rem] p-10 md:p-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-slate-900 z-0" />
                        <div className="relative z-10 flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-purple-500/20 rounded-lg">
                                    <GraduationCap className="w-6 h-6 text-purple-300" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Premium Finish</h3>
                            </div>
                            <p className="text-slate-300 leading-relaxed">
                                Experience the smoothness of high-GSM paper designed for bleed-resistance. Perfect for fountain pens, gel pens, and pencils alike.
                            </p>
                        </div>
                        {/* Abstract Visual Representation of Smoothness */}
                        <div className="relative z-10 w-full md:w-1/3 h-24 md:h-full bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                            <div className="absolute w-full h-[1px] bg-purple-400/50 top-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(192,132,252,0.5)]" />
                            <span className="text-xs text-purple-200/50 font-mono tracking-widest uppercase">Smooth Texture</span>
                        </div>
                    </motion.div>

                    {/* Card 4: Whiter & Brighter (Standard) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-amber-50 rounded-[2rem] p-10 relative overflow-hidden group"
                    >
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-200/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 text-amber-600">
                                <Sun className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Whiter & Brighter</h3>
                            <p className="text-slate-600">
                                High brightness for high contrast. Your notes stay legible and vivid.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
