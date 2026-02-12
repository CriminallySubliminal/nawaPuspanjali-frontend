import { motion } from 'framer-motion';
import type { Size } from '../../types';

interface SizeSelectorProps {
    sizes: Size[];
    selectedId: number;
    onSelect: (sizeId: number) => void;
}

/**
 * Premium size selector tabs with animated indicator.
 */
export function SizeSelector({ sizes, selectedId, onSelect }: SizeSelectorProps) {
    if (sizes.length === 0) {
        return null;
    }

    return (
        <div className="mb-10">
            <h3 className="text-sm font-semibold text-graphite uppercase tracking-wider mb-5">
                Select Size
            </h3>
            <div className="flex flex-wrap gap-3" role="tablist" aria-label="Notebook sizes">
                {sizes.map((size) => {
                    const isSelected = selectedId === size.id;

                    return (
                        <motion.button
                            key={size.id}
                            role="tab"
                            aria-selected={isSelected}
                            onClick={() => onSelect(size.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`
                relative px-6 py-4 rounded-xl text-left transition-all duration-200
                ${isSelected
                                    ? 'bg-charcoal text-white shadow-medium'
                                    : 'bg-white text-charcoal hover:bg-warm-gray shadow-subtle'
                                }
              `}
                        >
                            {isSelected && (
                                <motion.div
                                    layoutId="size-indicator"
                                    className="absolute inset-0 bg-charcoal rounded-xl -z-10"
                                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                />
                            )}

                            <span className="block text-lg font-semibold">{size.name}</span>
                            <span className={`block text-sm mt-1 ${isSelected ? 'text-slate-text' : 'text-graphite'}`}>
                                {/* {size.dimensions} */}
                            </span>
                            <span className={`block text-xs mt-1 ${isSelected ? 'text-slate-text' : 'text-graphite'}`}>
                                {/* {size.notebookCount} {size.notebookCount === 1 ? 'variant' : 'variants'} */}
                            </span>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}

export default SizeSelector;
