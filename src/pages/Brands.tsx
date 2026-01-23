import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Brand, LoadingState } from '../types';
import { NotebookService } from '../services/notebooks.service';
import { BrandGrid } from '../components/brand/BrandGrid';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { EmptyState } from '../components/ui/EmptyState';

/**
 * Brands page with portfolio-style grid layout.
 */
export function Brands() {
    const navigate = useNavigate();
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loadingState, setLoadingState] = useState<LoadingState>('idle');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBrands = async () => {
            setLoadingState('loading');
            setError(null);

            try {
                const response = await NotebookService.getBrands();
                if (response.success) {
                    setBrands(response.data);
                    setLoadingState('success');
                } else {
                    setError(response.message || 'Failed to load brands');
                    setLoadingState('error');
                }
            } catch (err) {
                setError('An unexpected error occurred');
                setLoadingState('error');
                console.error('Error fetching brands:', err);
            }
        };

        fetchBrands();
    }, []);

    const handleBrandSelect = (brandId: string) => {
        navigate(`/brands/${brandId}`);
    };

    return (
        <div className="min-h-screen">
            {/* Page Header */}
            <section className="bg-gradient-to-b from-warm-gray to-ivory py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <nav className="text-sm text-graphite mb-6" aria-label="Breadcrumb">
                            <a href="/" className="hover:text-charcoal transition-colors">Home</a>
                            <span className="mx-3">/</span>
                            <span className="text-charcoal font-medium">Products</span>
                        </nav>
                        <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
                            Our Product Lines
                        </h1>
                        <p className="text-lg text-graphite max-w-2xl">
                            Choose from our three distinct product lines, each designed to meet
                            specific needs and quality standards.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Brands Grid */}
            <section className="py-16 bg-ivory">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {loadingState === 'loading' && (
                        <LoadingSpinner message="Loading brands..." />
                    )}

                    {loadingState === 'error' && (
                        <EmptyState
                            title="Unable to load brands"
                            description={error || 'Something went wrong. Please try again.'}
                            action={{
                                label: 'Try Again',
                                onClick: () => window.location.reload(),
                            }}
                        />
                    )}

                    {loadingState === 'success' && brands.length === 0 && (
                        <EmptyState
                            title="No brands available"
                            description="Our product catalog is currently being updated. Please check back soon."
                        />
                    )}

                    {loadingState === 'success' && brands.length > 0 && (
                        <BrandGrid brands={brands} onSelect={handleBrandSelect} />
                    )}
                </div>
            </section>
        </div>
    );
}

export default Brands;
