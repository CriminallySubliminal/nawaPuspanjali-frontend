import { motion } from 'framer-motion';
import type { Brand } from '../../types';

interface BrandCardProps {
    brand: Brand;
    onClick: () => void;
    index?: number;
}

/**
 * Premium brand card with logo, animated hover effects, and portfolio styling.
 */
export function BrandCard({ brand, onClick, index = 0 }: BrandCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
            role="button"
            tabIndex={0}
            aria-label={`View ${brand.name} products`}
            className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer shadow-subtle hover:shadow-heavy transition-shadow duration-300"
        >
            {/* Top accent bar */}
            <div
                className="h-1.5 w-full"
                style={{ backgroundColor: brand.accentColor }}
            />

            <div className="p-8">
                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-20 h-20 rounded-2xl overflow-hidden mb-6 shadow-medium"
                >
                    <img
                        src={brand.logoUrl}
                        alt={`${brand.name} logo`}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Brand name with animated underline */}
                <div className="relative inline-block mb-3">
                    <h3 className="text-2xl font-bold text-charcoal group-hover:text-charcoal-light transition-colors">
                        {brand.name}
                    </h3>
                    <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 rounded-full"
                        style={{ backgroundColor: brand.accentColor }}
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                {/* Tagline */}
                <p
                    className="text-sm font-medium mb-4"
                    style={{ color: brand.accentColor }}
                >
                    {brand.tagline}
                </p>

                {/* Description */}
                <p className="text-graphite leading-relaxed line-clamp-3 mb-6">
                    {brand.description}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-charcoal font-medium">
                    <span className="group-hover:text-amber-600 transition-colors">
                        Explore Collection
                    </span>
                    <motion.svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        initial={{ x: 0 }}
                        animate={{ x: 0 }}
                        whileHover={{ x: 4 }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </motion.svg>
                </div>
            </div>

            {/* Hover gradient overlay */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                    background: `linear-gradient(135deg, ${brand.accentColor}08 0%, transparent 50%)`,
                }}
            />
        </motion.article>
    );
}

export default BrandCard;
