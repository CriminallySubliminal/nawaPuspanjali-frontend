import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Brand, NotebookSize, Notebook, LoadingState } from '../types';
import { NotebookService } from '../services/notebooks.service';
import { SizeSelector } from '../components/size/SizeSelector';
import { NotebookList } from '../components/notebook/NotebookList';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { EmptyState } from '../components/ui/EmptyState';

/**
 * Sizes page with size tabs and notebook grid.
 */
export function Sizes() {
    const { brandId } = useParams<{ brandId: string }>();
    const navigate = useNavigate();

    const [brand, setBrand] = useState<Brand | null>(null);
    const [sizes, setSizes] = useState<NotebookSize[]>([]);
    const [notebooks, setNotebooks] = useState<Notebook[]>([]);
    const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null);

    const [brandLoading, setBrandLoading] = useState<LoadingState>('idle');
    const [sizesLoading, setSizesLoading] = useState<LoadingState>('idle');
    const [notebooksLoading, setNotebooksLoading] = useState<LoadingState>('idle');
    const [error, setError] = useState<string | null>(null);

    // Fetch brand and sizes on mount
    useEffect(() => {
        if (!brandId) {
            navigate('/brands');
            return;
        }

        const fetchBrandAndSizes = async () => {
            setBrandLoading('loading');
            setSizesLoading('loading');
            setError(null);

            try {
                const brandResponse = await NotebookService.getBrandById(brandId);
                if (!brandResponse.success || !brandResponse.data) {
                    setError('Brand not found');
                    setBrandLoading('error');
                    return;
                }
                setBrand(brandResponse.data);
                setBrandLoading('success');

                const sizesResponse = await NotebookService.getSizesByBrand(brandId);
                if (sizesResponse.success) {
                    setSizes(sizesResponse.data);
                    setSizesLoading('success');
                    if (sizesResponse.data.length > 0) {
                        setSelectedSizeId(sizesResponse.data[0].id);
                    }
                } else {
                    setSizesLoading('error');
                }
            } catch (err) {
                setError('Failed to load product data');
                setBrandLoading('error');
                console.error('Error fetching brand/sizes:', err);
            }
        };

        fetchBrandAndSizes();
    }, [brandId, navigate]);

    // Fetch notebooks when size changes
    useEffect(() => {
        if (!brandId || !selectedSizeId) {
            setNotebooks([]);
            return;
        }

        const fetchNotebooks = async () => {
            setNotebooksLoading('loading');

            try {
                const response = await NotebookService.getNotebooks(brandId, selectedSizeId);
                if (response.success) {
                    setNotebooks(response.data);
                    setNotebooksLoading('success');
                } else {
                    setNotebooksLoading('error');
                }
            } catch (err) {
                setNotebooksLoading('error');
                console.error('Error fetching notebooks:', err);
            }
        };

        fetchNotebooks();
    }, [brandId, selectedSizeId]);

    const selectedSize = sizes.find((s) => s.id === selectedSizeId);

    // Error state
    if (brandLoading === 'error') {
        return (
            <div className="py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <EmptyState
                        title="Brand not found"
                        description={error || 'The requested brand could not be found.'}
                        action={{
                            label: 'View All Brands',
                            onClick: () => navigate('/brands'),
                        }}
                    />
                </div>
            </div>
        );
    }

    // Loading state
    if (brandLoading === 'loading') {
        return (
            <div className="py-24">
                <LoadingSpinner message="Loading product line..." />
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Page Header */}
            <section
                className="py-16 lg:py-20"
                style={{
                    background: brand?.accentColor
                        ? `linear-gradient(135deg, ${brand.accentColor}08 0%, transparent 100%)`
                        : undefined
                }}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <nav className="text-sm text-graphite mb-6" aria-label="Breadcrumb">
                            <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
                            <span className="mx-3">/</span>
                            <Link to="/brands" className="hover:text-charcoal transition-colors">Products</Link>
                            <span className="mx-3">/</span>
                            <span className="text-charcoal font-medium">{brand?.name || 'Loading...'}</span>
                        </nav>

                        {brand && (
                            <div className="flex items-start gap-6">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="hidden sm:block w-20 h-20 rounded-2xl overflow-hidden shadow-medium flex-shrink-0"
                                >
                                    <img
                                        src={brand.logoUrl}
                                        alt={`${brand.name} logo`}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-3">
                                        {brand.name}
                                    </h1>
                                    <p className="text-lg text-graphite max-w-2xl">
                                        {brand.description}
                                    </p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Size Selection & Notebooks */}
            <section className="py-12 bg-ivory">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {/* Size Selector */}
                    {sizesLoading === 'loading' ? (
                        <LoadingSpinner message="Loading sizes..." size="sm" />
                    ) : sizesLoading === 'success' && sizes.length > 0 ? (
                        <SizeSelector
                            sizes={sizes}
                            selectedId={selectedSizeId}
                            onSelect={setSelectedSizeId}
                        />
                    ) : sizesLoading === 'success' && sizes.length === 0 ? (
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
                            {notebooksLoading === 'loading' ? (
                                <LoadingSpinner message="Loading notebooks..." />
                            ) : notebooksLoading === 'success' ? (
                                <>
                                    {selectedSize && (
                                        <div className="mb-8">
                                            <h2 className="text-2xl font-bold text-charcoal">
                                                {selectedSize.name} Notebooks
                                            </h2>
                                            <p className="text-graphite mt-1">
                                                {selectedSize.dimensions} • {notebooks.length}{' '}
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
