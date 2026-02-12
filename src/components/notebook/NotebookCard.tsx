import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Notebook } from '../../types';

interface NotebookCardProps {
    notebook: Notebook;
    index?: number;
}

/**
 * Premium notebook card showing preview of variants.
 * Displays first variant's front cover by default.
 */
export function NotebookCard({ notebook, index = 0 }: NotebookCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="group h-full"
        >
            <Link
                to={`/notebooks/${notebook.slug}`}
                state={{ notebookId: notebook.id }}
                className="block bg-white rounded-2xl overflow-hidden shadow-subtle hover:shadow-heavy transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col"
            >
                {/* Cover image container */}
                <div className="relative aspect-notebook overflow-hidden bg-warm-gray">
                    {/* <AnimatePresence mode="wait">
                        {!isHovered ? (
                            <motion.img
                                key="front"
                                src={frontCover}
                                alt={`${notebook.name} front cover`}
                                className="absolute inset-0 w-full h-full object-cover"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            />
                        ) : (
                            <motion.img
                                key="back"
                                src={backCover}
                                alt={`${notebook.name} back cover`}
                                className="absolute inset-0 w-full h-full object-cover"
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            />
                        )}
                    </AnimatePresence> */}

                    {/* Badge for variant count */}
                    {/* <div className="absolute top-4 right-4">
                        <span className="inline-block bg-white/90 backdrop-blur-sm text-charcoal text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full shadow-sm">
                            {notebook.variants?.length || 0} Variants
                        </span>
                    </div> */}

                    {/* Brand/Type Badge */}
                    <div className="absolute top-4 left-4">
                        <span className="inline-block bg-charcoal/80 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-lg shadow-sm">
                            {notebook.brand.name} • {notebook.notebook_type.name}
                        </span>
                    </div>
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4 flex-grow">
                        <h4 className="text-xl font-bold text-charcoal mb-4 min-h-[3.5rem] line-clamp-2 group-hover:text-amber-600 transition-colors">
                            {notebook.name}
                        </h4>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {notebook.available_sizes?.slice(0, 2).map(size => (
                                <span key={size.id} className="text-[10px] uppercase tracking-wider font-bold bg-ivory px-2.5 py-1.5 rounded-lg text-graphite border border-warm-gray-dark/30 shadow-sm">
                                    {size.name}
                                </span>
                            ))}
                            {notebook.available_sizes?.length > 2 && (
                                <span className="text-[10px] uppercase tracking-wider font-bold bg-ivory px-2.5 py-1.5 rounded-lg text-graphite border border-warm-gray-dark/30 shadow-sm">
                                    +{notebook.available_sizes.length - 2} more
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-warm-gray flex justify-between items-center text-sm font-bold text-charcoal mt-auto">
                        <span>Details</span>
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

export default NotebookCard;
