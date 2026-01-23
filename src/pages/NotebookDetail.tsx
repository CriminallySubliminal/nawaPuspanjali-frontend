import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Notebook, Brand, NotebookSize, LoadingState } from '../types';
import { NotebookService } from '../services/notebooks.service';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { EmptyState } from '../components/ui/EmptyState';

/**
 * Notebook detail page with full specs and related designs.
 */
export function NotebookDetail() {
    const { notebookId } = useParams<{ notebookId: string }>();
    const navigate = useNavigate();

    const [notebook, setNotebook] = useState<Notebook | null>(null);
    const [brand, setBrand] = useState<Brand | null>(null);
    const [size, setSize] = useState<NotebookSize | null>(null);
    const [relatedNotebooks, setRelatedNotebooks] = useState<Notebook[]>([]);
    const [loadingState, setLoadingState] = useState<LoadingState>('idle');
    const [showBackCover, setShowBackCover] = useState(false);

    useEffect(() => {
        if (!notebookId) {
            navigate('/brands');
            return;
        }

        const fetchData = async () => {
            setLoadingState('loading');

            try {
                const notebookResponse = await NotebookService.getNotebookById(notebookId);
                if (!notebookResponse.success || !notebookResponse.data) {
                    setLoadingState('error');
                    return;
                }

                const nb = notebookResponse.data;
                setNotebook(nb);

                // Fetch brand and size info
                const [brandRes, sizeRes, relatedRes] = await Promise.all([
                    NotebookService.getBrandById(nb.brandId),
                    NotebookService.getSizeById(nb.sizeId),
                    NotebookService.getNotebooks(nb.brandId, nb.sizeId),
                ]);

                if (brandRes.success) setBrand(brandRes.data);
                if (sizeRes.success) setSize(sizeRes.data);
                if (relatedRes.success) {
                    setRelatedNotebooks(relatedRes.data.filter((n) => n.id !== notebookId));
                }

                setLoadingState('success');
            } catch (err) {
                console.error('Error fetching notebook:', err);
                setLoadingState('error');
            }
        };

        fetchData();
    }, [notebookId, navigate]);

    if (loadingState === 'loading') {
        return (
            <div className="py-24">
                <LoadingSpinner message="Loading notebook details..." />
            </div>
        );
    }

    if (loadingState === 'error' || !notebook) {
        return (
            <div className="py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <EmptyState
                        title="Notebook not found"
                        description="The requested notebook could not be found."
                        action={{
                            label: 'Browse Products',
                            onClick: () => navigate('/brands'),
                        }}
                    />
                </div>
            </div>
        );
    }

    const specs = [
        { label: 'Pages', value: String(notebook.pages) },
        { label: 'Binding', value: notebook.binding },
        { label: 'Paper', value: notebook.paperType },
        { label: 'Ruling', value: notebook.ruling },
        { label: 'Cover', value: notebook.coverType },
        { label: 'Color', value: notebook.colorScheme },
    ];

    return (
        <div className="min-h-screen bg-ivory">
            {/* Header */}
            <section className="py-8 bg-white border-b border-warm-gray">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <nav className="text-sm text-graphite" aria-label="Breadcrumb">
                        <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
                        <span className="mx-3">/</span>
                        <Link to="/brands" className="hover:text-charcoal transition-colors">Products</Link>
                        <span className="mx-3">/</span>
                        {brand && (
                            <>
                                <Link to={`/brands/${brand.id}`} className="hover:text-charcoal transition-colors">
                                    {brand.name}
                                </Link>
                                <span className="mx-3">/</span>
                            </>
                        )}
                        <span className="text-charcoal font-medium">{notebook.name}</span>
                    </nav>
                </div>
            </section>

            {/* Main Content */}
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
                                {/* Main cover display */}
                                <div className="aspect-notebook bg-white rounded-3xl overflow-hidden shadow-heavy">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={showBackCover ? 'back' : 'front'}
                                            src={showBackCover ? notebook.backCoverUrl : notebook.frontCoverUrl}
                                            alt={`${notebook.name} ${showBackCover ? 'back' : 'front'} cover`}
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
                                                : 'bg-white text-charcoal hover:bg-warm-gray'
                                            }`}
                                    >
                                        Front Cover
                                    </button>
                                    <button
                                        onClick={() => setShowBackCover(true)}
                                        className={`px-5 py-3 rounded-xl font-medium transition-all ${showBackCover
                                                ? 'bg-charcoal text-white shadow-medium'
                                                : 'bg-white text-charcoal hover:bg-warm-gray'
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
                            {brand && (
                                <div className="flex items-center gap-3 mb-4">
                                    <img
                                        src={brand.logoUrl}
                                        alt={brand.name}
                                        className="w-10 h-10 rounded-lg object-cover"
                                    />
                                    <span className="text-sm font-medium text-graphite">{brand.name}</span>
                                </div>
                            )}

                            <h1 className="text-4xl font-bold text-charcoal mb-2">{notebook.name}</h1>

                            {size && (
                                <p className="text-lg text-graphite mb-8">
                                    {size.name} • {size.dimensions}
                                </p>
                            )}

                            {/* Specifications */}
                            <div className="mb-10">
                                <h2 className="text-lg font-semibold text-charcoal mb-4">Specifications</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {specs.map((spec) => (
                                        <div key={spec.label} className="bg-white rounded-xl p-4 shadow-subtle">
                                            <dt className="text-xs text-graphite uppercase tracking-wider mb-1">
                                                {spec.label}
                                            </dt>
                                            <dd className="text-charcoal font-medium">{spec.value}</dd>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Back to brand */}
                            {brand && (
                                <Link
                                    to={`/brands/${brand.id}`}
                                    className="inline-flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                                    </svg>
                                    View all {brand.name} products
                                </Link>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Related Designs */}
            {relatedNotebooks.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold text-charcoal mb-2">
                                Other Cover Designs in This Size
                            </h2>
                            <p className="text-graphite mb-8">
                                Explore alternative designs in {size?.name} format
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {relatedNotebooks.map((nb, index) => (
                                    <motion.div
                                        key={nb.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                        whileHover={{ y: -6 }}
                                    >
                                        <Link
                                            to={`/notebook/${nb.id}`}
                                            className="block group"
                                        >
                                            <div className="aspect-notebook bg-warm-gray rounded-2xl overflow-hidden shadow-subtle group-hover:shadow-medium transition-shadow">
                                                <img
                                                    src={nb.frontCoverUrl}
                                                    alt={nb.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="mt-3">
                                                <h3 className="font-medium text-charcoal group-hover:text-amber-600 transition-colors">
                                                    {nb.name}
                                                </h3>
                                                <p className="text-sm text-graphite">{nb.colorScheme}</p>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}
        </div>
    );
}

export default NotebookDetail;
