import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
    title: string;
    description: string;
    icon?: ReactNode;
    action?: {
        label: string;
        onClick: () => void;
    };
}

/**
 * Animated empty state component.
 */
export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-20 px-6 text-center"
        >
            {icon ? (
                <div className="text-graphite mb-6">{icon}</div>
            ) : (
                <div className="w-20 h-20 mb-6 rounded-2xl bg-warm-gray flex items-center justify-center">
                    <svg
                        className="w-10 h-10 text-graphite"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                    </svg>
                </div>
            )}
            <h3 className="text-xl font-semibold text-charcoal mb-3">{title}</h3>
            <p className="text-graphite max-w-sm mb-8">{description}</p>
            {action && (
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={action.onClick}
                    className="px-6 py-3 bg-charcoal text-white font-medium rounded-xl shadow-medium hover:bg-charcoal-light transition-colors"
                >
                    {action.label}
                </motion.button>
            )}
        </motion.div>
    );
}

export default EmptyState;
