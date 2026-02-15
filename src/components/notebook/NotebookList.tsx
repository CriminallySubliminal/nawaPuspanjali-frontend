import { motion } from 'framer-motion';
import type { Notebook } from '../../types';
import { NotebookCard } from './NotebookCard';
import { EmptyState } from '../ui/EmptyState';

interface NotebookListProps {
    notebooks: Notebook[];
    sizeName?: string;
}

/**
 * Responsive grid of notebook cards with staggered animation.
 */
export function NotebookList({ notebooks, sizeName }: NotebookListProps) {
    if (notebooks.length === 0) {
        return (
            <EmptyState
                title="No notebooks found"
                description={
                    sizeName
                        ? `No notebooks are currently available in ${sizeName} size.`
                        : 'No notebooks are currently available in this category.'
                }
            />
        );
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.08,
                    },
                },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
            role="list"
            aria-label={`${sizeName || 'Available'} notebooks`}
        >
            {notebooks.map((notebook, index) => (
                <div key={notebook.id} role="listitem">
                    <NotebookCard notebook={notebook} index={index} />
                </div>
            ))}
        </motion.div>
    );
}

export default NotebookList;
