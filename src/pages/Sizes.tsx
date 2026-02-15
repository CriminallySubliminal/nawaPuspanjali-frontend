import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Brand, Size, Notebook, LoadingState } from '../types';
import { NotebookService } from '../services/notebooks.service';
import { SizeSelector } from '../components/size/SizeSelector';
import { NotebookList } from '../components/notebook/NotebookList';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { EmptyState } from '../components/ui/EmptyState';

/**
 * Sizes page with size tabs and notebook grid.
 */
export function Sizes() {
    const { brandSlug } = useParams<{ brandSlug: string }>();
    const navigate = useNavigate();

    const [brand, setBrand] = useState<Brand | null>(null);
    const [sizes, setSizes] = useState<Size[]>([]);
    const [allNotebooks, setAllNotebooks] = useState<Notebook[]>([]);
    const [selectedSizeId, setSelectedSizeId] = useState<number>(0);

    const [loading, setLoading] = useState<LoadingState>('idle');
    const [error, setError] = useState<string | null>(null);

    // Fetch initial data
    useEffect(() => {
        if (!brandSlug) {
            navigate('/brands');
            return;
        }

        const fetchData = async () => {
            setLoading('loading');
            setError(null);

            try {
                // 1. Fetch brands to find the current one by slug
                const brandsResponse = await NotebookService.getBrands();
                if (!brandsResponse.success) {
                    setError(brandsResponse.message || 'Failed to load brands');
                    setLoading('error');
                    return;
                }

                const currentBrand = brandsResponse.data.find(b => b.slug === brandSlug);
                if (!currentBrand) {
                    setError('Brand not found');
                    setLoading('error');
                    return;
                }
                setBrand(currentBrand);

                // 2. Fetch all notebooks for this brand
                const notebooksResponse = await NotebookService.getNotebooksByBrand(currentBrand.id);
                if (notebooksResponse.success) {
                    const notebooks = notebooksResponse.data;
                    setAllNotebooks(notebooks);

                    // 3. Extract unique sizes from all notebooks
                    const sizeMap = new Map<number, Size>();
                    notebooks.forEach(nb => {
                        nb.available_sizes.forEach(size => {
                            sizeMap.set(size.id, size);
                        });
                    });

                    const uniqueSizes = Array.from(sizeMap.values()).sort((a, b) => a.display_order - b.display_order);
                    setSizes(uniqueSizes);

                    if (uniqueSizes.length > 0) {
                        setSelectedSizeId(uniqueSizes[0].id);
                    }
                    setLoading('success');
                } else {
                    setError(notebooksResponse.message || 'Failed to load notebooks');
                    setLoading('error');
                }
            } catch (err) {
                setError('An unexpected error occurred');
                setLoading('error');
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, [brandSlug, navigate]);

    // Derive display notebooks based on selected size
    const notebooks = allNotebooks.filter(nb =>
        selectedSizeId ? nb.available_sizes.some(s => s.id === selectedSizeId) : true
    );

    const selectedSize = sizes.find((s) => s.id === selectedSizeId);

    // Error state
    if (loading === 'error') {
        return (
            <div className="py-24">
                <div className="max-w-7xl mx-auto px-8 lg:px-12">
                    <EmptyState
                        title="Something went wrong"
                        description={error || 'The requested content could not be found.'}
                        action={{
                            label: 'View All Brands',
                            onClick: () => navigate('/brands'),
                        }}
                    />
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen">
            {/* Page Header */}
            <section
                className="py-16 lg:py-20 bg-gradient-to-br from-warm-gray to-white"
            >
                <div className="max-w-7xl mx-auto px-8 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <nav className="text-sm text-graphite mb-6" aria-label="Breadcrumb">
                            <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
                            <span className="mx-3">{'>'}</span>
                            <Link to="/brands" className="hover:text-charcoal transition-colors">Products</Link>
                            <span className="mx-3">{'>'}</span>
                            <span className="text-charcoal font-medium">{brand?.name || 'Loading...'}</span>
                        </nav>

                        {brand && (
                            <div className="flex items-start gap-6">
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-3">
                                        {brand.name}
                                    </h1>
                                    {brand.description && (
                                        <p className="text-lg text-graphite max-w-2xl">
                                            {brand.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Size Selection & Notebooks */}
            <section className="py-12 bg-ivory">
                <div className="max-w-7xl mx-auto px-8 lg:px-12">
                    {/* Size Selector */}
                    {loading === 'loading' ? (
                        <LoadingSpinner message="Loading sizes..." size="sm" />
                    ) : loading === 'success' && sizes.length > 0 ? (
                        <SizeSelector
                            sizes={sizes}
                            selectedId={selectedSizeId}
                            onSelect={(id) => setSelectedSizeId(id)}
                        />
                    ) : loading === 'success' && sizes.length === 0 ? (
                        <EmptyState
                            title="No sizes available"
                            description="This product line is currently being updated."
                        />
                    ) : null}

                    {/* Notebooks Grid */}
                    {selectedSizeId && (
                        <motion.div
                            key={selectedSizeId}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            {loading === 'loading' ? (
                                <LoadingSpinner message="Loading notebooks..." />
                            ) : loading === 'success' ? (
                                <>
                                    {selectedSize && (
                                        <div className="mb-8">
                                            <h2 className="text-2xl font-bold text-charcoal">
                                                {selectedSize.name} Notebooks
                                            </h2>
                                            <p className="text-graphite mt-1">
                                                {notebooks.length}{' '}
                                                {notebooks.length === 1 ? 'variant' : 'variants'} available
                                            </p>
                                        </div>
                                    )}
                                    <NotebookList notebooks={notebooks} sizeName={selectedSize?.name} />
                                </>
                            ) : null}
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Sizes;
