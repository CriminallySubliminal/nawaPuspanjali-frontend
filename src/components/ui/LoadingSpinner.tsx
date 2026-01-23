import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
    message?: string;
    size?: 'sm' | 'md' | 'lg';
}

/**
 * Animated loading spinner with fade effect.
 */
export function LoadingSpinner({
    message = 'Loading...',
    size = 'md',
}: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'w-5 h-5',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 gap-5"
            role="status"
            aria-live="polite"
        >
            <div className={`${sizeClasses[size]} relative`}>
                <motion.div
                    className="absolute inset-0 border-2 border-warm-gray-dark rounded-full"
                />
                <motion.div
                    className="absolute inset-0 border-2 border-amber-500 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
            </div>
            <span className="text-sm text-graphite font-medium">{message}</span>
        </motion.div>
    );
}

export default LoadingSpinner;
