import { motion } from 'framer-motion';
import type { Brand } from '../../types';
import { BrandCard } from './BrandCard';

interface BrandGridProps {
    brands: Brand[];
    onSelect: (brandId: string) => void;
}

/**
 * Responsive grid of brand cards with staggered entrance animation.
 */
export function BrandGrid({ brands, onSelect }: BrandGridProps) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.15,
                    },
                },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            role="list"
            aria-label="Available brands"
        >
            {brands.map((brand, index) => (
                <div key={brand.id} role="listitem">
                    <BrandCard
                        brand={brand}
                        onClick={() => onSelect(brand.id)}
                        index={index}
                    />
                </div>
            ))}
        </motion.div>
    );
}

export default BrandGrid;
