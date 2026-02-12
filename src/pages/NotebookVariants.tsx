import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Notebook, NotebookVariant, LoadingState } from '../types';
import { NotebookService } from '../services/notebooks.service';
import { VariantCard } from '../components/notebook/VariantCard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { EmptyState } from '../components/ui/EmptyState';

/**
 * NotebookVariants page - Lists all variants for a specific notebook product.
 * Supports search and sorting by size, ruling, and price.
 */
export function NotebookVariants() {
    const { notebookSlug } = useParams<{ notebookSlug: string }>();
    const navigate = useNavigate();
    // We fetch by slug instead of relying on state to ensure direct links work

    const [notebook, setNotebook] = useState<Notebook | null>(null);
    const [variants, setVariants] = useState<NotebookVariant[]>([]);
    const [loadingState, setLoadingState] = useState<LoadingState>('idle');
    const [error, setError] = useState<string | null>(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'size' | 'ruling' | 'price' | '-price'>('size');

    useEffect(() => {
        const fetchNotebookAndVariants = async () => {
            setLoadingState('loading');
            setError(null);

            try {
                // Fetch notebook details (includes variants in the serializer)
                const response = await NotebookService.getNotebookBySlug(notebookSlug!);
                if (response.success) {
                    setNotebook(response.data);

                    // Client-side filtering and sorting for variants of this notebook
                    // In a larger app we might fetch filtered results from API, 
                    // but here the variants are already grouped.
                    processVariants(response.data.variants);
                    setLoadingState('success');
                } else {
                    setError(response.message || 'Notebook not found');
                    setLoadingState('error');
                }
            } catch (err) {
                setError('Failed to load notebook variants');
                setLoadingState('error');
            }
        };

        fetchNotebookAndVariants();
    }, [notebookSlug]);

    // Update variants whenever search or sort changes
    useEffect(() => {
        if (notebook) {
            processVariants(notebook.variants);
        }
    }, [searchQuery, sortBy, notebook]);

    const processVariants = (allVariants: NotebookVariant[]) => {
        let result = [...allVariants];

        // Search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(v =>
                v.display_name.toLowerCase().includes(query) ||
                v.size.name.toLowerCase().includes(query) ||
                v.ruling.name.toLowerCase().includes(query)
            );
        }

        // Sort
        result.sort((a, b) => {
            switch (sortBy) {
                case 'size':
                    return a.size.display_order - b.size.display_order;
                case 'ruling':
                    return a.ruling.name.localeCompare(b.ruling.name);
                case 'price':
                    return parseFloat(a.price_per_dozen) - parseFloat(b.price_per_dozen);
                case '-price':
                    return parseFloat(b.price_per_dozen) - parseFloat(a.price_per_dozen);
                default:
                    return 0;
            }
        });

        setVariants(result);
    };

    return (
        <div className="min-h-screen">
            {/* Header */}
            <section className="bg-white border-b border-warm-gray py-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <nav className="text-sm text-graphite mb-6" aria-label="Breadcrumb">
                            <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
                            <span className="mx-3">{'>'}</span>
                            <Link to="/brands" className="hover:text-charcoal transition-colors">Products</Link>
                            <span className="mx-3">{'>'}</span>
                            {notebook && (
                                <>
                                    <Link to={`/brands/${notebook.brand.slug}/notebooks`} className="hover:text-charcoal transition-colors capitalize">
                                        {notebook.brand.name}
                                    </Link>
                                    <span className="mx-3">{'>'}</span>
                                </>
                            )}
                            <span className="text-charcoal font-medium">{notebook?.name || 'Loading...'}</span>
                        </nav>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <h1 className="text-4xl font-bold text-charcoal mb-4">
                                    {notebook?.name} Variants
                                </h1>
                                <p className="text-lg text-graphite max-w-2xl">
                                    Choose from {notebook?.variants?.length || 0} different sizes and ruling configurations.
                                </p>
                            </div>

                            {/* Controls */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search by size or ruling..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full sm:w-64 px-4 py-2 bg-ivory border border-warm-gray-dark/50 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-shadow"
                                    />
                                    <svg className="absolute right-3 top-2.5 w-5 h-5 text-graphite/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as any)}
                                    className="px-4 py-2 bg-ivory border border-warm-gray-dark/50 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                                >
                                    <option value="size">Sort by Size</option>
                                    <option value="ruling">Sort by Ruling</option>
                                    <option value="price">Price: Low to High</option>
                                    <option value="-price">Price: High to Low</option>
                                </select>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Variants Grid */}
            <section className="py-16 bg-ivory">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {loadingState === 'loading' && (
                        <LoadingSpinner message="Loading variants..." />
                    )}

                    {loadingState === 'error' && (
                        <EmptyState
                            title="Unable to load variants"
                            description={error || 'Something went wrong.'}
                            action={{
                                label: 'Back to Products',
                                onClick: () => navigate('/brands'),
                            }}
                        />
                    )}

                    {loadingState === 'success' && (
                        <>
                            {variants.length === 0 ? (
                                <EmptyState
                                    title="No variants match your search"
                                    description="Try adjusting your filters or search terms."
                                />
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                    {variants.map((v, idx) => (
                                        <VariantCard key={v.id} variant={v} index={idx} />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}

export default NotebookVariants;
