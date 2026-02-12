import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Notebook, LoadingState } from '../types';
import { NotebookService } from '../services/notebooks.service';
import { NotebookList } from '../components/notebook/NotebookList';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { EmptyState } from '../components/ui/EmptyState';

/**
 * BrandNotebooks page - Lists all notebooks for a selected brand.
 * Includes search by name and sorting by name.
 */
export function BrandNotebooks() {
    const { brandSlug } = useParams<{ brandSlug: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    // Get brandId from state if navigated from Brands page, or we'll need to fetch it
    const brandId = location.state?.brandId;

    const [notebooks, setNotebooks] = useState<Notebook[]>([]);
    const [loadingState, setLoadingState] = useState<LoadingState>('idle');
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'name' | '-name'>('name');

    useEffect(() => {
        const fetchNotebooks = async () => {
            if (!brandId) {
                // If brandId is missing (e.g. direct link), we might need to fetch brand first
                // For now, let's assume we need brandId. 
                // A better way would be to fetch notebooks by brand slug if backend supported it,
                // or fetch the brand by slug first.
                try {
                    const brandsRes = await NotebookService.getBrands();
                    if (brandsRes.success) {
                        const brand = brandsRes.data.find(b => b.slug === brandSlug);
                        if (brand) {
                            loadNotebooks(brand.id);
                        } else {
                            setError('Brand not found');
                            setLoadingState('error');
                        }
                    } else {
                        setError('Failed to load brands');
                        setLoadingState('error');
                    }
                } catch (err) {
                    setError('Failed to resolve brand');
                    setLoadingState('error');
                }
                return;
            }
            loadNotebooks(brandId);
        };

        const loadNotebooks = async (id: number) => {
            setLoadingState('loading');
            setError(null);
            try {
                const response = await NotebookService.getNotebooksByBrand(id, searchQuery, sortBy);
                if (response.success) {
                    setNotebooks(response.data);
                    setLoadingState('success');
                } else {
                    setError(response.message || 'Failed to load notebooks');
                    setLoadingState('error');
                }
            } catch (err) {
                setError('An unexpected error occurred');
                setLoadingState('error');
            }
        };

        const timeoutId = setTimeout(fetchNotebooks, searchQuery ? 300 : 0);
        return () => clearTimeout(timeoutId);
    }, [brandId, brandSlug, searchQuery, sortBy]);

    return (
        <div className="min-h-screen">
            {/* Page Header */}
            <section className="bg-ivory py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
                            <span className="text-charcoal font-medium capitalize">{brandSlug?.replace(/-/g, ' ')}</span>
                        </nav>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4 capitalize">
                                    {brandSlug?.replace(/-/g, ' ')} Collection
                                </h1>
                                <p className="text-lg text-graphite max-w-2xl">
                                    Browse all available notebooks in the {brandSlug?.replace(/-/g, ' ')} line.
                                </p>
                            </div>

                            {/* Search and Sort Controls */}
                            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                                <div className="relative flex-grow">
                                    <input
                                        type="text"
                                        placeholder="Search notebooks..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full sm:w-64 px-4 py-2.5 bg-white border border-warm-gray-dark rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-shadow"
                                    />
                                    <svg className="absolute right-3 top-3 w-5 h-5 text-graphite/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as 'name' | '-name')}
                                    className="px-4 py-2.5 bg-white border border-warm-gray-dark rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-shadow"
                                >
                                    <option value="name">Name (A-Z)</option>
                                    <option value="-name">Name (Z-A)</option>
                                </select>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Notebooks Grid */}
            <section className="py-16 bg-ivory">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {loadingState === 'loading' && (
                        <LoadingSpinner message="Loading notebooks..." />
                    )}

                    {loadingState === 'error' && (
                        <EmptyState
                            title="Unable to load notebooks"
                            description={error || 'Something went wrong.'}
                            action={{
                                label: 'Back to Brands',
                                onClick: () => navigate('/brands'),
                            }}
                        />
                    )}

                    {loadingState === 'success' && (
                        <NotebookList notebooks={notebooks} />
                    )}
                </div>
            </section>
        </div>
    );
}

export default BrandNotebooks;
