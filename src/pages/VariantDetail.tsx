import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { NotebookVariant, LoadingState } from '../types';
import { NotebookService } from '../services/notebooks.service';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { EmptyState } from '../components/ui/EmptyState';

/**
 * VariantDetail page - Shows detailed information for a specific notebook variant.
 */
export function VariantDetail() {
    const { variantSlug } = useParams<{ variantSlug: string }>();
    const navigate = useNavigate();

    const [variant, setVariant] = useState<NotebookVariant | null>(null);
    const [loadingState, setLoadingState] = useState<LoadingState>('idle');
    const [showBackCover, setShowBackCover] = useState(false);

    useEffect(() => {
        const fetchVariant = async () => {
            setLoadingState('loading');
            try {
                const response = await NotebookService.getVariantBySlug(variantSlug!);
                if (response.success) {
                    setVariant(response.data);
                    setLoadingState('success');
                } else {
                    setLoadingState('error');
                }
            } catch (err) {
                console.error('Error fetching variant:', err);
                setLoadingState('error');
            }
        };

        fetchVariant();
    }, [variantSlug]);

    if (loadingState === 'loading') {
        return (
            <div className="py-24">
                <LoadingSpinner message="Loading product details..." />
            </div>
        );
    }

    if (loadingState === 'error' || !variant) {
        return (
            <div className="py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <EmptyState
                        title="Product not found"
                        description="The requested variant could not be found."
                        action={{
                            label: 'Back to Products',
                            onClick: () => navigate('/brands'),
                        }}
                    />
                </div>
            </div>
        );
    }

    const specs = [
        { label: 'Size', value: variant.size.name },
        { label: 'Ruling', value: variant.ruling.name },
        { label: 'Pages', value: String(variant.no_of_pages) },
        { label: 'Price per Dozen', value: `Rs. ${variant.price_per_dozen}` },
        // { label: 'Price per Unit', value: `Rs. ${variant.price_per_unit}` },
        { label: 'Brand', value: variant.notebook_brand.name },
        { label: 'Type', value: variant.notebook_type.name }
    ];

    return (
        <div className="min-h-screen bg-ivory">
            {/* Breadcrumb */}
            <section className="py-8 bg-white border-b border-warm-gray">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <nav className="text-sm text-graphite" aria-label="Breadcrumb">
                        <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
                        <span className="mx-3">{'>'}</span>
                        <Link to="/brands" className="hover:text-charcoal transition-colors">Products</Link>
                        <span className="mx-3">{'>'}</span>
                        <Link to={`/brands/${variant.notebook_brand.slug}/notebooks`} className="hover:text-charcoal transition-colors">
                            {variant.notebook_brand.name}
                        </Link>
                        <span className="mx-3">{'>'}</span>
                        <span className="text-charcoal font-medium">{variant.display_name}</span>
                    </nav>
                </div>
            </section>

            {/* Product Display */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Cover Images */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="relative">
                                {/* Main cover display - Using aspect-square to match VariantCard feel but larger */}
                                <div className="aspect-notebook bg-white rounded-3xl overflow-hidden shadow-heavy border border-warm-gray">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={showBackCover ? 'back' : 'front'}
                                            src={(showBackCover ? variant.back_cover : variant.front_cover) || '/placeholder-notebook.jpg'}
                                            alt={`${variant.display_name} ${showBackCover ? 'back' : 'front'} cover`}
                                            className="w-full h-full object-cover"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </AnimatePresence>
                                </div>

                                {/* Cover toggle */}
                                <div className="flex gap-3 mt-6 justify-center">
                                    <button
                                        onClick={() => setShowBackCover(false)}
                                        className={`px-5 py-3 rounded-xl font-medium transition-all ${!showBackCover
                                            ? 'bg-charcoal text-white shadow-medium'
                                            : 'bg-white text-charcoal hover:bg-warm-gray border border-warm-gray'
                                            }`}
                                    >
                                        Front Cover
                                    </button>
                                    <button
                                        onClick={() => setShowBackCover(true)}
                                        className={`px-5 py-3 rounded-xl font-medium transition-all ${showBackCover
                                            ? 'bg-charcoal text-white shadow-medium'
                                            : 'bg-white text-charcoal hover:bg-warm-gray border border-warm-gray'
                                            }`}
                                    >
                                        Back Cover
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Details */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <div className="mb-6">
                                <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                                    {variant.notebook_brand.name} • {variant.notebook_type.name}
                                </span>
                                <h1 className="text-4xl font-bold text-charcoal mb-4 leading-tight">{variant.display_name}</h1>
                                <p className="text-xl text-amber-700 font-bold mb-6">
                                    Rs. {variant.price_per_dozen} <span className="text-graphite font-medium text-sm">/ dozen</span>
                                </p>
                            </div>

                            {/* Specifications Grid */}
                            <div className="mb-10">
                                <h2 className="text-lg font-bold text-charcoal mb-4 uppercase tracking-wider text-sm">Product Specifications</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {specs.map((spec) => (
                                        <div key={spec.label} className="bg-white rounded-xl p-4 shadow-sm border border-warm-gray">
                                            <dt className="text-[10px] text-graphite uppercase tracking-widest mb-1 font-bold">
                                                {spec.label}
                                            </dt>
                                            <dd className="text-charcoal font-bold">{spec.value}</dd>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            {variant.full_description && (
                                <div className="mb-10 p-6 bg-white rounded-2xl border border-warm-gray">
                                    <h2 className="text-lg font-bold text-charcoal mb-3">Product Description</h2>
                                    <p className="text-graphite leading-relaxed whitespace-pre-line">
                                        {variant.full_description}
                                    </p>
                                </div>
                            )}

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
                                    Back to Variants List
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default VariantDetail;
