"use client";

import { motion } from 'framer-motion';
import { Leaf, Recycle, GraduationCap, Sun, Sprout } from 'lucide-react';
import { GlowingCards, GlowingCard } from '../lightswind/glowing-cards';

export default function UnifiedFeaturesSection() {
    return (
        <section className="py-24 bg-transparent relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(#444 1px, transparent 1px)`,
                    backgroundSize: '32px 32px'
                }} 
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 md:mb-24 text-center max-w-4xl mx-auto"
                >
                    {/* <span className="text-brand-deep font-bold tracking-wider uppercase text-sm mb-4 inline-block">
                        Why Puspanjali
                    </span> */}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight mb-6">
                        Quality You Can <br />
                        <span className="italic font-serif text-slate-text">Feel & Trust</span>
                    </h2>
                    <p className="text-lg text-graphite max-w-2xl mx-auto leading-relaxed">
                        Built on principles of quality, reliability, and thoughtful design.
                        Experience the difference in every sheet.
                    </p>
                </motion.div>

                <GlowingCards
                    gridClassName="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]"
                    glowRadius={30}
                    glowOpacity={0.6}
                    className="w-full"
                >
                    {/* --- Row 1: Original Features --- */}

                    {/* Feature 1: Quality Assured */}
                    <GlowingCard glowColor="#f59e0b" className="bg-ivory dark:bg-zinc-900 border-charcoal/5 shadow-subtle hover:shadow-medium">
                        <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                            style={{ backgroundColor: `#f59e0b15` }}
                        >
                            <svg className="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-charcoal dark:text-white mb-3">
                            Quality Assured
                        </h3>
                        <p className="text-graphite dark:text-zinc-400 leading-relaxed text-sm">
                            Every notebook undergoes rigorous quality checks. From paper weight to binding strength, we ensure consistency.
                        </p>
                    </GlowingCard>

                    {/* Feature 2: Wide Selection */}
                    <GlowingCard glowColor="#0d9488" className="bg-ivory dark:bg-zinc-900 border-charcoal/5 shadow-subtle hover:shadow-medium">
                        <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                            style={{ backgroundColor: `#0d948815` }}
                        >
                            <svg className="w-7 h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-charcoal dark:text-white mb-3">
                            Wide Selection
                        </h3>
                        <p className="text-graphite dark:text-zinc-400 leading-relaxed text-sm">
                            Multiple brands, sizes, and specifications to match your exact requirements. Academic, professional, or everyday use.
                        </p>
                    </GlowingCard>

                    {/* Feature 3: Made in Nepal */}
                    <GlowingCard glowColor="#4338ca" className="bg-ivory dark:bg-zinc-900 border-charcoal/5 shadow-subtle hover:shadow-medium">
                        <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                            style={{ backgroundColor: `#4338ca15` }}
                        >
                            <svg className="w-7 h-7 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-charcoal dark:text-white mb-3">
                            Made in Nepal
                        </h3>
                        <p className="text-graphite dark:text-zinc-400 leading-relaxed text-sm">
                            Proudly manufactured in Nepal, supporting local industry and craftsmanship while serving customers nationwide.
                        </p>
                    </GlowingCard>

                    {/* --- Row 2 & 3: Quality Section Items --- */}

                    {/* Quality 1: Eco-Conscious (Large 2x2) */}
                    <GlowingCard
                        glowColor="#ffffff"
                        className="md:col-span-2 md:row-span-2 bg-teal-600 rounded-[2rem] p-10 md:p-14 relative overflow-hidden group border-none"
                    >
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 text-white">
                                <Leaf className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-4">Eco-Conscious Sourcing</h3>
                                <p className="text-white/80 text-lg leading-relaxed max-w-md">
                                    We source our paper from certified sustainable forests. Every notebook you buy contributes to a greener, healthier planet for future generations.
                                </p>
                            </div>
                        </div>
                        {/* Decorative Background Icon */}
                        <Sprout className="absolute -bottom-10 -right-10 w-64 h-64 text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-700 ease-out" />
                    </GlowingCard>

                    {/* Quality 2: Recyclable (Tall 1x2) */}
                    <GlowingCard
                        glowColor="#2dd4bf"
                        className="md:row-span-2 bg-brand-light h-full rounded-[2rem] p-10 flex flex-col relative overflow-hidden group border-none"
                    >
                        <div className="w-14 h-14 bg-white/40 backdrop-blur-md rounded-2xl flex items-center justify-center mb-auto text-charcoal">
                            <Recycle className="w-7 h-7" />
                        </div>
                        <div className="mt-8">
                            <h3 className="text-2xl font-bold text-charcoal mb-2">100% Recyclable</h3>
                            <p className="text-charcoal-light/70 uppercase text-xs font-bold tracking-widest mb-4">Sustainability First</p>
                            <p className="text-charcoal/80">
                                Closing the loop on waste. Our materials are chosen to be fully recyclable.
                            </p>
                        </div>
                        <div className="absolute top-1/2 -right-12 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                    </GlowingCard>

                    {/* --- Row 4: Final Quality Items --- */}

                    {/* Quality 3: Premium Finish (Wide 2x1) */}
                    <GlowingCard
                        glowColor="#27272a"
                        className="md:col-span-2 bg-charcoal rounded-[2rem] p-10 md:p-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group border-none"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/20 to-charcoal z-0" />
                        <div className="relative z-10 flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-brand-deep/20 rounded-lg text-brand-deep">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Premium Finish</h3>
                            </div>
                            <p className="text-white/80 leading-relaxed">
                                Experience the smoothness of high-GSM paper designed for bleed-resistance. Perfect for fountain pens, gel pens, and pencils alike.
                            </p>
                        </div>
                        {/* Abstract Visual Representation of Smoothness */}
                        <div className="relative z-10 w-full md:w-1/3 h-24 md:h-full bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                            <div className="absolute w-full h-[1px] bg-brand-deep/50 top-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(231,29,54,0.5)]" />
                            <span className="text-xs text-brand-deep/50 font-mono tracking-widest uppercase">Smooth Texture</span>
                        </div>
                    </GlowingCard>

                    {/* Quality 4: Whiter & Brighter (Standard 1x1) */}
                    <GlowingCard
                        glowColor="#fbbf24"
                        className="bg-brand-lightest rounded-[2rem] p-10 relative overflow-hidden group border-none"
                    >
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 text-charcoal">
                                <Sun className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-charcoal mb-2">Whiter & Brighter</h3>
                            <p className="text-charcoal/80">
                                High brightness for high contrast. Your notes stay legible and vivid.
                            </p>
                        </div>
                    </GlowingCard>

                </GlowingCards>
            </div>
        </section>
    );
}
