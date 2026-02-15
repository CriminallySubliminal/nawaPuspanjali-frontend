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
                className="block bg-white rounded-xl overflow-hidden border-2 border-warm-gray-dark/30 shadow-subtle hover:shadow-heavy transition-all duration-300 h-full flex flex-col"
            >
                {/* Variant Image */}
                <div className="relative aspect-square overflow-hidden bg-warm-gray/30">
                    <img
                        src={'/placeholder-notebook.jpg'}
                        alt={variant.display_name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Size and Ruling Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
                        <span className="inline-block bg-white/95 backdrop-blur-sm text-charcoal text-[9px] uppercase tracking-wider font-bold px-2 py-1 rounded-md shadow-sm">
                            {variant.size.name}
                        </span>
                        <span className="inline-block bg-brand-deep backdrop-blur-sm text-white text-[9px] uppercase tracking-wider font-bold px-2 py-1 rounded-md shadow-sm">
                            {variant.ruling.name}
                        </span>
                    </div>
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col flex-grow">
                    <div className="flex-grow">
                        <h4 className="text-base font-bold text-charcoal mb-3 line-clamp-2 min-h-[2.5rem] group-hover:text-brand-deep transition-colors">
                            {variant.display_name}
                        </h4>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-ivory/50 rounded-lg p-2.5 border border-warm-gray-dark/20 text-center">
                                <span className="block text-[9px] uppercase tracking-widest text-graphite mb-0.5 font-bold">Paper Weight</span>
                                <span className="text-charcoal font-bold text-sm">{variant.gsm} GSM</span>
                            </div>
                            <div className="bg-ivory/50 rounded-lg p-2.5 border border-warm-gray-dark/20 text-center">
                                <span className="block text-[9px] uppercase tracking-widest text-graphite mb-0.5 font-bold">Price /unit</span>
                                <span className="text-brand-deep font-bold text-sm">Rs. {variant.price_per_unit}</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-3 border-t-2 border-warm-gray flex justify-between items-center mt-auto text-xs">
                        <span className="font-bold text-charcoal">Details</span>
                        <div className="w-6 h-6 rounded-full bg-charcoal text-white flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-300 scale-90">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}

export default VariantCard;
