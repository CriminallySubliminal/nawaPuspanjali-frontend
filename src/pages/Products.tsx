import { useState, useEffect, useMemo, useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NotebookService } from '../services/notebooks.service';
import type { Notebook, LoadingState, FilterOptions } from '../types';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { EmptyState } from '../components/ui/EmptyState';
import { NotebookCard } from '../components/notebook/NotebookCard';

/**
 * Unified Products page - Consolidated browsing experience for notebooks.
 * Allows filtering by Brand, Type, and Size.
 */
export function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const brandParam = searchParams.get('brand');

    // Data states
    const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
    const [notebooks, setNotebooks] = useState<Notebook[]>([]);
    const [loadingState, setLoadingState] = useState<LoadingState>('loading');
    const [error, setError] = useState<string | null>(null);

    // Selection states
    const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
    const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
    const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    // Check for overflow and update arrow visibility
    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5); // 5px buffer
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [filterOptions]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
            // Update arrows after a short delay for the smooth scroll
            setTimeout(checkScroll, 350);
        }
    };

    // Initial load: fetch all filter options and initial data
    useEffect(() => {
        const fetchInitialData = async () => {
            setLoadingState('loading');
            try {
                const [optionsRes, notebooksRes] = await Promise.all([
                    NotebookService.getFilterOptions(),
                    NotebookService.getNotebooks({})
                ]);

                if (optionsRes.success && notebooksRes.success) {
                    setFilterOptions(optionsRes.data);
                    setNotebooks(notebooksRes.data);

                    // Set initial brand: URL param takes priority, otherwise first brand
                    const urlBrand = brandParam ? optionsRes.data.brands.find(b => b.slug === brandParam) : null;
                    if (urlBrand) {
                        setSelectedBrandId(urlBrand.id);
                    } else if (optionsRes.data.brands.length > 0) {
                        const firstBrand = optionsRes.data.brands[0];
                        setSelectedBrandId(firstBrand.id);
                        // Update query param for consistency
                        setSearchParams({ brand: firstBrand.slug }, { replace: true });
                    }

                    setLoadingState('success');
                } else {
                    setError('Failed to load product data');
                    setLoadingState('error');
                }
            } catch (err) {
                console.error('Exception in fetchInitialData', err);
                setError('An unexpected error occurred');
                setLoadingState('error');
            }
        };

        fetchInitialData();
    }, [brandParam]);

    // Apply filtering to notebooks
    const filteredResults = useMemo(() => {
        return notebooks.filter(n => {
            const matchesBrand = !selectedBrandId || String(n.brand?.id || n.brand) === String(selectedBrandId);
            const matchesType = !selectedTypeId || String(n.notebook_type?.id || n.notebook_type) === String(selectedTypeId);
            const matchesSize = !selectedSizeId || n.available_sizes?.some(s => String(s.id || s) === String(selectedSizeId));
            return matchesBrand && matchesType && matchesSize;
        });
    }, [notebooks, selectedBrandId, selectedTypeId, selectedSizeId]);

    // Dependent Filter Options
    const availableTypes = useMemo(() => {
        if (!selectedBrandId) return filterOptions?.notebook_types || [];

        const typesMap = new Map();
        notebooks.forEach(n => {
            const brandId = n.brand?.id || n.brand;
            if (String(brandId) === String(selectedBrandId)) {
                if (n.notebook_type && !typesMap.has(n.notebook_type.id)) {
                    typesMap.set(n.notebook_type.id, n.notebook_type);
                }
            }
        });
        return Array.from(typesMap.values());
    }, [notebooks, selectedBrandId, filterOptions]);

    const availableSizes = useMemo(() => {
        if (!filterOptions) return [];

        const sizesMap = new Map();
        notebooks.forEach(n => {
            const brandId = n.brand?.id || n.brand;
            const typeId = n.notebook_type?.id || n.notebook_type;

            const matchesBrand = !selectedBrandId || String(brandId) === String(selectedBrandId);
            const matchesType = !selectedTypeId || String(typeId) === String(selectedTypeId);

            if (matchesBrand && matchesType) {
                n.available_sizes?.forEach(size => {
                    if (!sizesMap.has(size.id)) {
                        sizesMap.set(size.id, size);
                    }
                });
            }
        });
        return Array.from(sizesMap.values()).sort((a, b) => a.display_order - b.display_order);
    }, [notebooks, selectedBrandId, selectedTypeId, filterOptions]);

    // Auto-select first type when available types change
    useEffect(() => {
        if (availableTypes.length > 0) {
            // If current selection is not in available types, pick first
            const isCurrentTypeAvailable = availableTypes.some(t => String(t.id) === String(selectedTypeId));
            if (!isCurrentTypeAvailable) {
                setSelectedTypeId(availableTypes[0].id);
            }
        } else {
            setSelectedTypeId(null);
        }
    }, [availableTypes, selectedTypeId]);

    // Auto-select first size when available sizes change
    useEffect(() => {
        if (availableSizes.length > 0) {
            // If current selection is not in available sizes, pick first
            const isCurrentSizeAvailable = availableSizes.some(s => String(s.id) === String(selectedSizeId));
            if (!isCurrentSizeAvailable) {
                setSelectedSizeId(availableSizes[0].id);
            }
        } else {
            setSelectedSizeId(null);
        }
    }, [availableSizes, selectedSizeId]);

    if (loadingState === 'loading' && !filterOptions) {
        return <div className="py-24"><LoadingSpinner message="Loading products..." /></div>;
    }

    if (loadingState === 'error') {
        return (
            <div className="py-24">
                <EmptyState
                    title="Load Error"
                    description={error || "Could not fetch products."}
                    action={{ label: "Retry", onClick: () => window.location.reload() }}
                />
            </div>
        );
    }

    const selectedBrand = filterOptions?.brands.find(b => String(b.id) === String(selectedBrandId));

    return (
        <div className="min-h-screen bg-ivory pb-24">
            {/* Header / Breadcrumb */}
            <section className="bg-white border-b border-warm-gray py-8">
                <div className="max-w-7xl mx-auto px-8 lg:px-12">
                    <nav className="text-sm text-graphite mb-4" aria-label="Breadcrumb">
                        <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
                        <span className="mx-3">{'>'}</span>
                        <span className="text-charcoal font-medium">Products</span>
                    </nav>
                    <h1 className="text-4xl font-bold text-charcoal">Our Product Lines</h1>
                </div>
            </section>

            {/* Selection UI */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-8 lg:px-12">
                    <div className="flex flex-col gap-10">

                        {/* 1. Brand Selector (Horizontal scroll with buttons) */}
                        <div className="relative group">
                            {/* Navigation Buttons */}
                            <AnimatePresence>
                                {showLeftArrow && (
                                    <motion.button
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        onClick={() => scroll('left')}
                                        className="absolute left-0 top-1/2 -translate-y-[calc(50%+12px)] z-30 bg-white border border-warm-gray rounded-full p-2.5 shadow-lg hover:bg-charcoal hover:text-white transition-all scale-90 md:scale-100"
                                        aria-label="Scroll left"
                                    >
                                        <ChevronLeft size={20} />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                            <AnimatePresence>
                                {showRightArrow && (
                                    <motion.button
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        onClick={() => scroll('right')}
                                        className="absolute right-0 top-1/2 -translate-y-[calc(50%+12px)] z-30 bg-white border border-warm-gray rounded-full p-2.5 shadow-lg hover:bg-charcoal hover:text-white transition-all scale-90 md:scale-100"
                                        aria-label="Scroll right"
                                    >
                                        <ChevronRight size={20} />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                            {/* Left/Right Fade Indicators - Only show when scrollable */}
                            <div className="absolute left-0 top-0 bottom-8 w-16 bg-gradient-to-r from-ivory to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute right-0 top-0 bottom-8 w-16 bg-gradient-to-l from-ivory to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div
                                ref={scrollContainerRef}
                                onScroll={checkScroll}
                                data-scroll-container
                                className="flex items-center gap-4 overflow-x-auto pb-6 px-16 scroll-smooth no-scrollbar"
                                style={{
                                    scrollbarWidth: 'none',
                                    msOverflowStyle: 'none',
                                    WebkitOverflowScrolling: 'touch'
                                }}
                            >
                                {filterOptions?.brands?.map((brand) => (
                                    <button
                                        key={brand.id}
                                        onClick={() => {
                                            setSelectedBrandId(brand.id);
                                            // Reset children to trigger auto-select
                                            setSelectedTypeId(null);
                                            setSelectedSizeId(null);
                                            // Update query param
                                            setSearchParams({ brand: brand.slug }, { replace: true });
                                        }}
                                        className={`w-40 md:w-48 py-2.5 rounded-sm font-bold transition-all whitespace-nowrap shadow-sm border flex-shrink-0 flex items-center justify-center ${String(selectedBrandId) === String(brand.id)
                                            ? 'bg-charcoal text-white border-charcoal scale-105 z-20'
                                            : 'bg-white text-charcoal border-warm-gray hover:border-charcoal/30'
                                            }`}
                                    >
                                        {brand.name}
                                    </button>
                                ))}
                                {/* Extra padding to prevent last chip clipping */}
                                <div className="w-4 flex-shrink-0" />
                            </div>
                        </div>

                        {/* Brand Title Area */}
                        {selectedBrand && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={selectedBrand.id}
                                className="text-center"
                            >
                                <h2 className="text-3xl font-bold text-charcoal mb-2">{selectedBrand.name} Notebooks</h2>
                            </motion.div>
                        )}

                        {/* 2. Selectors Grid */}
                        <div className="bg-white/50 backdrop-blur-sm rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 border border-white/20 shadow-medium max-w-5xl mx-auto w-full">
                            <div className="space-y-6 md:space-y-10">
                                {/* Notebook Type */}
                                {(!selectedBrandId || availableTypes.length > 0) && (
                                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                                        <label className="text-base md:text-lg font-bold text-charcoal min-w-[180px]">Select Type:</label>

                                        {/* Mobile Dropdown */}
                                        <div className="md:hidden relative">
                                            <select
                                                value={selectedTypeId || ''}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setSelectedTypeId(val ? Number(val) : null);
                                                    setSelectedSizeId(null);
                                                }}
                                                className="w-full bg-white border-2 border-warm-gray-dark/50 rounded-xl px-4 py-3 text-sm font-medium text-charcoal outline-none focus:border-charcoal transition-all appearance-none pr-10"
                                            >
                                                {availableTypes.map((type) => (
                                                    <option key={type.id} value={type.id}>
                                                        {type.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal/50">
                                                <ChevronDown size={18} />
                                            </div>
                                        </div>

                                        {/* Desktop Buttons */}
                                        <div className="hidden md:flex flex-wrap gap-4">
                                            {availableTypes.map((type) => (
                                                <button
                                                    key={type.id}
                                                    onClick={() => {
                                                        setSelectedTypeId(type.id);
                                                        setSelectedSizeId(null);
                                                    }}
                                                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all border-2 ${String(selectedTypeId) === String(type.id)
                                                        ? 'bg-charcoal text-white border-charcoal shadow-sm'
                                                        : 'bg-white text-charcoal/80 border-warm-gray-dark hover:border-charcoal/30 hover:bg-warm-gray/10'
                                                        }`}
                                                >
                                                    {type.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Size */}
                                {availableSizes.length > 0 && (
                                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                                        <label className="text-base md:text-lg font-bold text-charcoal min-w-[180px]">Select Size:</label>

                                        {/* Mobile Dropdown */}
                                        <div className="md:hidden relative">
                                            <select
                                                value={selectedSizeId || ''}
                                                onChange={(e) => setSelectedSizeId(e.target.value ? Number(e.target.value) : null)}
                                                className="w-full bg-white border-2 border-warm-gray-dark/50 rounded-xl px-4 py-3 text-sm font-medium text-charcoal outline-none focus:border-charcoal transition-all appearance-none pr-10"
                                            >
                                                {availableSizes.map((size) => (
                                                    <option key={size.id} value={size.id}>
                                                        {size.name} ({size.width}x{size.height} {size.unit})
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal/50">
                                                <ChevronDown size={18} />
                                            </div>
                                        </div>

                                        {/* Desktop Buttons */}
                                        <div className="hidden md:flex flex-wrap gap-4">
                                            {availableSizes.map((size) => (
                                                <button
                                                    key={size.id}
                                                    onClick={() => setSelectedSizeId(size.id)}
                                                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all border-2 ${String(selectedSizeId) === String(size.id)
                                                        ? 'bg-charcoal text-white border-charcoal shadow-sm'
                                                        : 'bg-white text-charcoal/80 border-warm-gray-dark hover:border-charcoal/30 hover:bg-warm-gray/10'
                                                        }`}
                                                >
                                                    {size.name} <span className="text-[10px] opacity-60 ml-1 font-normal">({size.width}x{size.height} {size.unit})</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Results Grid / Mobile Scroll */}
                    <div className="mt-8">
                        <AnimatePresence mode="popLayout">
                            {loadingState === 'loading' && notebooks.length === 0 ? (
                                <div className="py-24"><LoadingSpinner message="Loading products..." /></div>
                            ) : filteredResults.length > 0 ? (
                                <>
                                    {/* Desktop Grid (Hidden on Mobile) */}
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="hidden lg:grid grid-cols-3 xl:grid-cols-5 gap-5"
                                    >
                                        {filteredResults.map((notebook) => (
                                            <NotebookCard key={notebook.id} notebook={notebook} />
                                        ))}
                                    </motion.div>

                                    {/* Mobile Horizontal Scroll (Hidden on Desktop) */}
                                    <div className="lg:hidden -mx-8 px-8 flex flex-col gap-4 overflow-hidden">
                                        <div className="flex justify-between items-center mb-2 px-2">
                                            <span className="text-xs font-bold text-graphite uppercase tracking-widest">
                                                {filteredResults.length} Items
                                            </span>
                                            <div className="flex items-center gap-1.5 text-[10px] text-graphite animate-pulse">
                                                <span>Scroll horizontally</span>
                                                <ChevronRight size={12} />
                                            </div>
                                        </div>

                                        <motion.div
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex gap-3 overflow-x-auto pb-6 snap-x no-scrollbar"
                                            style={{
                                                scrollbarWidth: 'none',
                                                msOverflowStyle: 'none',
                                                WebkitOverflowScrolling: 'touch'
                                            }}
                                        >
                                            {filteredResults.map((notebook) => (
                                                <div key={notebook.id} className="snap-start flex-shrink-0">
                                                    <NotebookCard
                                                        notebook={notebook}
                                                        variant="compact"
                                                    />
                                                </div>
                                            ))}
                                            {/* Extra spacing for last item */}
                                            <div className="w-8 flex-shrink-0" />
                                        </motion.div>
                                    </div>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="py-20 text-center"
                                >
                                    <EmptyState
                                        title="No results found"
                                        description="Try adjusting your filters to find what you're looking for."
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </section>
        </div>
    );
}

export default Products;
