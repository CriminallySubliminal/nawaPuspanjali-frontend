import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { NotebookVariant } from '../../types';

interface VariantCardProps {
    variant: NotebookVariant;
    index?: number;
}

/**
 * Premium card for a specific notebook variant.
 * Shows high-level specs and pricing for the variant.
 */
export function VariantCard({ variant, index = 0 }: VariantCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group h-full"
        >
            <Link
                to={`/variants/${variant.slug}`}
                className="block bg-white rounded-2xl overflow-hidden shadow-subtle hover:shadow-heavy transition-all duration-300 h-full flex flex-col"
            >
                {/* Variant Image */}
                <div className="relative aspect-square overflow-hidden bg-warm-gray">
                    <img
                        src={variant.front_cover || '/placeholder-notebook.jpg'}
                        alt={variant.display_name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Size and Ruling Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <span className="inline-block bg-white/95 backdrop-blur-sm text-charcoal text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-lg shadow-sm">
                            {variant.size.name}
                        </span>
                        <span className="inline-block bg-amber-600/90 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-lg shadow-sm">
                            {variant.ruling.name}
                        </span>
                    </div>
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                        <h4 className="text-lg font-bold text-charcoal mb-4 line-clamp-2 min-h-[3.5rem] group-hover:text-amber-600 transition-colors">
                            {variant.display_name}
                        </h4>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-ivory/50 rounded-xl p-3 border border-warm-gray-dark/20 text-center">
                                <span className="block text-[10px] uppercase tracking-widest text-graphite mb-1 font-bold">Pages</span>
                                <span className="text-charcoal font-bold">{variant.no_of_pages}</span>
                            </div>
                            <div className="bg-ivory/50 rounded-xl p-3 border border-warm-gray-dark/20 text-center">
                                <span className="block text-[10px] uppercase tracking-widest text-graphite mb-1 font-bold">Price /dz</span>
                                <span className="text-amber-700 font-bold">Rs. {variant.price_per_dozen}</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-warm-gray flex justify-between items-center mt-auto">
                        <span className="text-sm font-bold text-charcoal">Details</span>
                        <div className="w-8 h-8 rounded-full bg-charcoal text-white flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-300">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}

export default VariantCard;
