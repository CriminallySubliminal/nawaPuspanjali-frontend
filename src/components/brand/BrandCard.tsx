import { motion } from 'framer-motion';
import type { Brand } from '../../types';

// Import logos
import puspanjaliLogo from '../../assets/logos/puspanjali.png';
import pathsalaLogo from '../../assets/logos/pathsala.png';
import ruffLogo from '../../assets/logos/ruff.png';
import bulletLogo from '../../assets/logos/bullet.png';

interface BrandCardProps {
    brand: Brand;
    onClick: () => void;
    index?: number;
}

const brandLogos: Record<string, string> = {
    'puspanjali': puspanjaliLogo,
    'pathsala': pathsalaLogo,
    'ruff': ruffLogo,
    'bullet': bulletLogo,
};

/**
 * Modern and sleek brand card with logo integration.
 */
export function BrandCard({ brand, onClick, index = 0 }: BrandCardProps) {
    const logo = brandLogos[brand.slug] || brandLogos['puspanjali']; // Fallback

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
            role="button"
            tabIndex={0}
            className="group relative h-full bg-white rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col"
        >
            {/* Image Container */}
            <div className="h-48 bg-gray-50 flex items-center justify-center p-8 relative overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <motion.img
                    src={logo}
                    alt={`${brand.name} Logo`}
                    className="max-h-full max-w-full object-contain drop-shadow-sm transform transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            {/* Content Container */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-charcoal mb-2 group-hover:text-amber-600 transition-colors">
                        {brand.name}
                    </h3>
                    <div className="h-1 w-12 bg-amber-600 rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-300" />
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {brand.description || `Discover our premium collection of ${brand.name} notebooks, designed for quality and durability.`}
                </p>

                <div className="flex items-center text-sm font-semibold text-amber-600 group-hover:translate-x-1 transition-transform duration-300">
                    <span>View Collection</span>
                    <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>
        </motion.article>
    );
}

export default BrandCard;

