import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Notebook } from '../../types';

interface NotebookCardProps {
    notebook: Notebook;
    index?: number;
}

/**
 * Premium notebook card with front/back cover flip on hover.
 * Shows front cover by default, transitions to back cover on hover.
 */
export function NotebookCard({ notebook, index = 0 }: NotebookCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -8 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group"
        >
            <Link
                to={`/notebook/${notebook.id}`}
                className="block bg-white rounded-2xl overflow-hidden shadow-subtle hover:shadow-heavy transition-shadow duration-300"
            >
                {/* Cover image container */}
                <div className="relative aspect-notebook overflow-hidden bg-warm-gray">
                    {/* Front Cover */}
                    <AnimatePresence mode="wait">
                        {!isHovered ? (
                            <motion.img
                                key="front"
                                src={notebook.frontCoverUrl}
                                alt={`${notebook.name} front cover`}
                                className="absolute inset-0 w-full h-full object-cover"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        ) : (
                            <motion.img
                                key="back"
                                src={notebook.backCoverUrl}
                                alt={`${notebook.name} back cover`}
                                className="absolute inset-0 w-full h-full object-cover"
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        )}
                    </AnimatePresence>

                    {/* Hover indicator */}
                    <motion.div
                        className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-charcoal"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                        transition={{ duration: 0.2 }}
                    >
                        Back Cover
                    </motion.div>

                    {/* Color scheme badge */}
                    <div className="absolute top-4 left-4">
                        <span className="inline-block bg-charcoal/80 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                            {notebook.colorScheme}
                        </span>
                    </div>
                </div>

                {/* Info */}
                <div className="p-5">
                    <h4 className="text-lg font-semibold text-charcoal mb-2 group-hover:text-amber-600 transition-colors">
                        {notebook.name}
                    </h4>

                    <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-xs bg-warm-gray px-2.5 py-1 rounded-full text-graphite">
                            {notebook.pages} pages
                        </span>
                        <span className="text-xs bg-warm-gray px-2.5 py-1 rounded-full text-graphite">
                            {notebook.ruling}
                        </span>
                    </div>

                    <p className="text-sm text-graphite">
                        {notebook.binding} • {notebook.paperType}
                    </p>
                </div>
            </Link>
        </motion.article>
    );
}

export default NotebookCard;
