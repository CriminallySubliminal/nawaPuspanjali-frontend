import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Notebook } from '../../types';

interface NotebookCardProps {
    notebook: Notebook;
    index?: number;
    variant?: 'default' | 'compact';
}

/**
 * Premium notebook card showing preview of variants.
 * Displays first variant's front cover by default.
 */
export function NotebookCard({ notebook, index = 0, variant = 'default' }: NotebookCardProps) {
    const isCompact = variant === 'compact';

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className={`group h-full ${isCompact ? 'w-24 xs:w-28 sm:w-32' : ''}`}
        >
            <Link
                to={`/notebooks/${notebook.slug}`}
                state={{ notebookId: notebook.id }}
                className={`block bg-white rounded-lg overflow-hidden border border-warm-gray-dark/20 shadow-subtle hover:shadow-heavy transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col ${isCompact ? 'p-1' : ''}`}
            >
                {/* Cover image container */}
                <div className={`relative overflow-hidden bg-warm-gray/30 rounded-md ${isCompact ? 'aspect-[3/4]' : 'aspect-[4/5]'}`}>
                    <motion.img
                        src={notebook.image ? `${notebook.image}?t=${Date.now()}` : '/placeholder-notebook.jpg'}
                        alt={notebook.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Brand/Type Badge - Hidden in compact */}
                    {/* {!isCompact && (
                        <div className="absolute top-2.5 left-2.5">
                            <span className="inline-block bg-charcoal/80 backdrop-blur-sm text-white text-[9px] uppercase tracking-wider font-bold px-2 py-1 rounded-md shadow-sm">
                                {notebook.brand.name} • {notebook.notebook_type.name}
                            </span>
                        </div>
                    )} */}
                </div>

                {/* Info */}
                <div className={`${isCompact ? 'p-1.5' : 'p-4'} flex flex-col flex-grow`}>
                    <div className={`${isCompact ? 'mb-1' : 'mb-3'} flex-grow`}>
                        <h4 className={`${isCompact ? 'text-[10px] leading-tight' : 'text-base mb-3'} font-bold text-charcoal line-clamp-2 group-hover:text-brand-deep transition-colors`}>
                            {notebook.name}
                        </h4>

                        {!isCompact && (
                            <div className="flex flex-wrap gap-1.5 mb-3">
                                {notebook.available_sizes?.slice(0, 4).map(size => (
                                    <span key={size.id} className="text-[9px] text-md tracking-tight font-semibold bg-ivory px-2 py-1 rounded-md text-graphite border border-warm-gray-dark/30 shadow-sm">
                                        {size.name}
                                    </span>
                                ))}
                                {/* {notebook.available_sizes?.length > 2 && (
                                    <span className="text-[9px] text-sm tracking-tight font-bold bg-ivory px-2 py-1 rounded-md text-graphite border border-warm-gray-dark/30 shadow-sm">
                                        +{notebook.available_sizes.length - 2}
                                    </span>
                                )} */}
                            </div>
                        )}
                    </div>

                    {!isCompact && (
                        <div className="pt-3 border-t-2 border-warm-gray flex justify-between items-center text-xs font-bold text-charcoal mt-auto">
                            <span>View Details</span>
                            <div className="w-6 h-6 rounded-full bg-charcoal text-white flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-300 scale-90">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                        </div>
                    )}
                </div>
            </Link>
        </motion.article>
    );
}

export default NotebookCard;
