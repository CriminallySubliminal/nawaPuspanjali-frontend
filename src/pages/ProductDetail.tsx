import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Notebook, LoadingState } from '../types';
import { NotebookService } from '../services/notebooks.service';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { EmptyState } from '../components/ui/EmptyState';

// Ruling Images
import twoLinedImg from '../assets/images/rulings/2-Lined.jpg';
import fourLinedImg from '../assets/images/rulings/4-Lined.jfif';
import graphImg from '../assets/images/rulings/Graph.jpg';
import spiralImg from '../assets/images/rulings/Spiral.jpg';
import blankImg from '../assets/images/rulings/blank.avif';

/**
 * ProductDetail page - Shows detailed information for a notebook product.
 * Displays all variant combinations in a table grouped by size.
 */
export function ProductDetail() {
    const { notebookSlug } = useParams<{ notebookSlug: string }>();
    const navigate = useNavigate();

    const [notebook, setNotebook] = useState<Notebook | null>(null);
    const [loadingState, setLoadingState] = useState<LoadingState>('idle');
    const [selectedRuling, setSelectedRuling] = useState<{ name: string, image: string } | null>(null);

    useEffect(() => {
        const fetchNotebook = async () => {
            setLoadingState('loading');
            try {
                const response = await NotebookService.getNotebookBySlug(notebookSlug!);
                if (response.success) {
                    setNotebook(response.data);
                    setLoadingState('success');
                } else {
                    setLoadingState('error');
                }
            } catch (err) {
                console.error('Error fetching notebook:', err);
                setLoadingState('error');
            }
        };

        fetchNotebook();
    }, [notebookSlug]);

    // Process variants into a table structure grouped by size
    const getVariantTable = () => {
        if (!notebook?.variants) return [];

        // Group variants by size
        const sizeMap = new Map<string, {
            size: string;
            sizeOrder: number;
            rulings: Map<string, { ruling: string; price: string; gsm: number }>;
        }>();

        notebook.variants.forEach(variant => {
            const sizeKey = variant.size.slug;

            if (!sizeMap.has(sizeKey)) {
                sizeMap.set(sizeKey, {
                    size: variant.size.name,
                    sizeOrder: variant.size.display_order,
                    rulings: new Map(),
                });
            }

            const sizeData = sizeMap.get(sizeKey)!;
            const rulingKey = variant.ruling.slug;

            // Only add if this ruling doesn't exist for this size (handle duplicates)
            if (!sizeData.rulings.has(rulingKey)) {
                sizeData.rulings.set(rulingKey, {
                    ruling: variant.ruling.name,
                    price: variant.price_per_unit,
                    gsm: variant.gsm,
                });
            }
        });

        // Convert to array and sort by size display_order
        return Array.from(sizeMap.values())
            .sort((a, b) => a.sizeOrder - b.sizeOrder)
            .map(sizeData => ({
                size: sizeData.size,
                rulings: Array.from(sizeData.rulings.values()),
            }));
    };

    const variantTable = notebook ? getVariantTable() : [];
    const mainImage = notebook?.image || '/placeholder-notebook.jpg';

    // Derive unique sizes, rulings, and GSM from variants for technical specifications
    const derivedSizes = variantTable.map(group => group.size);
    const derivedRulings = Array.from(new Set(
        notebook?.variants?.map(v => v.ruling.name) || []
    ));
    const uniqueGSMs = Array.from(new Set(
        notebook?.variants?.map(v => v.gsm) || []
    )).sort((a, b) => a - b);

    if (loadingState === 'loading') {
        return (
            <div className="py-24">
                <LoadingSpinner message="Loading product details..." />
            </div>
        );
    }

    if (loadingState === 'error' || !notebook) {
        return (
            <div className="py-24">
                <div className="max-w-7xl mx-auto px-8 lg:px-12">
                    <EmptyState
                        title="Product not found"
                        description="The requested product could not be found."
                        action={{
                            label: 'Back to Products',
                            onClick: () => navigate('/products'),
                        }}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-ivory">
            {/* Breadcrumb */}
            <section className="py-8 bg-white border-b border-warm-gray">
                <div className="max-w-7xl mx-auto px-8 lg:px-12">
                    <nav className="text-sm text-graphite" aria-label="Breadcrumb">
                        <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
                        <span className="mx-3">{'>'}</span>
                        <Link to="/products" className="hover:text-charcoal transition-colors">Products</Link>
                        <span className="mx-3">{'>'}</span>
                        <Link to={`/products?brand=${notebook.brand.slug}`} className="hover:text-charcoal transition-colors">
                            {notebook.brand.name}
                        </Link>
                        <span className="mx-3">{'>'}</span>
                        <span className="text-charcoal font-medium">{notebook.name}</span>
                    </nav>
                </div>
            </section>

            {/* Product Display */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-8 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Cover Images */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="relative">
                                {/* Main cover display */}
                                <div className="aspect-notebook bg-white rounded-3xl overflow-hidden shadow-heavy border border-warm-gray">
                                    <motion.img
                                        src={mainImage}
                                        alt={`${notebook.name} cover`}
                                        className="w-full h-full object-cover"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Details */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <div className="mb-10">
                                <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
                                    {notebook.brand?.name || 'Puspanjali'}
                                </span>
                                <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6 leading-tight">{notebook.name}</h1>
                                {notebook.base_description && (
                                    <p className="text-xl text-graphite leading-relaxed mb-10">
                                        {notebook.base_description}
                                    </p>
                                )}
                            </div>

                            {/* Technical Specifications */}
                            <div className="bg-white rounded-[2rem] p-8 shadow-medium border border-warm-gray mb-10 overflow-hidden">
                                <h2 className="text-sm font-bold text-charcoal mb-6 uppercase tracking-widest text-amber-600 px-2">Technical Specifications</h2>
                                <div className="divide-y divide-warm-gray-dark/10">
                                    <div className="py-4 flex justify-between items-center px-2">
                                        <div className="text-xs font-bold text-graphite/50 uppercase">Notebook Type</div>
                                        <div className="text-lg font-bold text-charcoal">{notebook.notebook_type?.name || 'Notebook'}</div>
                                    </div>
                                    <div className="py-4 flex justify-between items-start px-2">
                                        <div className="text-xs font-bold text-graphite/50 uppercase pt-2">Available Sizes</div>
                                        <div className="flex flex-wrap gap-2 justify-end max-w-[60%]">
                                            {derivedSizes.length > 0 ? derivedSizes.map(sizeName => (
                                                <span key={sizeName} className="text-sm font-bold text-charcoal bg-ivory px-3 py-1 rounded-lg border border-warm-gray-dark/20 shadow-sm">
                                                    {sizeName}
                                                </span>
                                            )) : (
                                                <span className="text-sm text-graphite italic">N/A</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="py-4 flex justify-between items-center px-2">
                                        <div className="text-xs font-bold text-graphite/50 uppercase">Ruling Styles</div>
                                        <div className="text-lg font-bold text-charcoal text-right">
                                            {derivedRulings.length > 0 ? derivedRulings.join(', ') : 'N/A'}
                                        </div>
                                    </div>
                                    <div className="py-4 flex justify-between items-center px-2">
                                        <div className="text-xs font-bold text-graphite/50 uppercase">Paper Weight</div>
                                        <div className="text-lg font-bold text-charcoal">
                                            {uniqueGSMs.length > 0 ? uniqueGSMs.join(', ') : 'N/A'} <span className="text-xs font-normal opacity-60">GSM</span>
                                        </div>
                                    </div>
                                    <div className="py-4 flex justify-between items-center px-2">
                                        <div className="text-xs font-bold text-graphite/50 uppercase">Price Range</div>
                                        <div className="text-lg font-bold text-amber-700">
                                            {notebook.variants?.length > 0 ? (
                                                <div className="flex flex-col items-end">
                                                    <span>Rs. {notebook.variants[0]?.price_per_unit} - {notebook.variants[notebook.variants.length - 1]?.price_per_unit}</span>
                                                    <span className="text-[10px] text-graphite/50 font-bold uppercase -mt-1">+ VAT (Per Unit)</span>
                                                </div>
                                            ) : 'Price on request'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Variant Grid / Details */}
                            {/* <div className="mb-12">
                                <h2 className="text-sm font-bold text-charcoal mb-6 uppercase tracking-widest text-amber-600">Available Combinations</h2>
                                <div className="space-y-4">
                                    {variantTable.map((sizeGroup) => (
                                        <div key={sizeGroup.size} className="bg-ivory/50 rounded-2xl p-6 border border-warm-gray-dark/10">
                                            <h3 className="text-lg font-bold text-charcoal mb-4 flex items-center gap-3">
                                                <span className="w-8 h-8 rounded-full bg-charcoal text-white flex items-center justify-center text-xs">
                                                    {sizeGroup.size}
                                                </span>
                                                Size Variants
                                            </h3>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                {sizeGroup.rulings.map((rulingData) => (
                                                    <div key={rulingData.ruling} className="bg-white p-4 rounded-xl shadow-sm border border-warm-gray-dark/5 flex justify-between items-center group hover:border-amber-500/30 transition-colors">
                                                        <div>
                                                            <div className="font-bold text-charcoal group-hover:text-amber-600 transition-colors">{rulingData.ruling}</div>
                                                            <div className="text-sm text-graphite">{rulingData.pages} Pages</div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-amber-700 font-bold">Rs. {rulingData.price}</div>
                                                            <div className="text-[10px] text-graphite/50 uppercase font-bold">Per Dozen</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div> */}

                            {/* CTA / Contact */}
                            <div className="flex flex-col gap-4">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center gap-3 bg-charcoal text-white py-4 rounded-xl font-bold hover:bg-charcoal-light transition-all shadow-medium"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Inquire About This Product
                                </Link>
                                <button
                                    onClick={() => navigate(-1)}
                                    className="inline-flex items-center justify-center gap-2 text-graphite font-medium hover:text-charcoal transition-colors py-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Products
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Rulings Showcase Section */}
            {notebook.variants && notebook.variants.length > 0 && (
                <section className="py-24 bg-white border-t border-warm-gray overflow-hidden">
                    <div className="max-w-7xl mx-auto px-8 lg:px-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl font-bold text-charcoal mb-4">Notebook Rulings</h2>
                            <p className="text-graphite text-lg max-w-2xl mx-auto">
                                Available ruling styles for {notebook.name}
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {(() => {
                                // Extract unique rulings for this notebook
                                const uniqueRulings = Array.from(
                                    new Map(notebook.variants.map(v => [v.ruling.id, v.ruling])).values()
                                );

                                return uniqueRulings.map((ruling, idx) => {
                                    const rulingImage = rulingImages[ruling.slug.toLowerCase()];
                                    return (
                                        <motion.div
                                            key={ruling.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                                            className="group bg-white rounded-3xl p-5 overflow-hidden border border-warm-gray-dark/10 hover:shadow-heavy transition-all duration-500 z-10 "
                                        >
                                            <div
                                                className="aspect-square w-full overflow-hidden bg-white border-b border-warm-gray/50 cursor-pointer"
                                                onClick={() => setSelectedRuling({ name: ruling.name, image: rulingImage })}
                                            >
                                                <img
                                                    src={rulingImage}
                                                    alt={`${ruling.name} ruling`}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            </div>
                                            <div className="p-6 text-center">
                                                <h3 className="text-lg font-bold text-charcoal">{ruling.name}</h3>
                                            </div>
                                        </motion.div>
                                    );
                                });
                            })()}
                        </div>
                    </div>
                </section>
            )}

            {/* Ruling Image Modal */}
            <AnimatePresence>
                {selectedRuling && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/90 backdrop-blur-sm"
                        onClick={() => setSelectedRuling(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedRuling(null)}
                                className="absolute top-4 right-4 p-2 bg-charcoal/10 hover:bg-charcoal/20 rounded-full transition-colors z-10"
                            >
                                <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="aspect-square w-full bg-white">
                                <img
                                    src={selectedRuling.image}
                                    alt={selectedRuling.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <div className="p-6 bg-white border-t border-warm-gray flex justify-between items-center">
                                <h3 className="text-xl font-bold text-charcoal">{selectedRuling.name}</h3>
                                <div className="text-graphite text-sm font-medium">Full Resolution View</div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const rulingImages: Record<string, string> = {
    '2-lined': twoLinedImg,
    '4-lined': fourLinedImg,
    'graph': graphImg,
    'spiral': spiralImg,
    'none': blankImg,
};

export default ProductDetail;
