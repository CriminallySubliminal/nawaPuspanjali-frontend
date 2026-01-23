/**
 * TypeScript type definitions for the Notebook Portfolio application.
 * These types define the data contracts for the entire application.
 */

/**
 * Represents a notebook brand within the company's product line.
 */
export interface Brand {
    id: string;
    name: string;
    description: string;
    tagline: string;
    logoUrl: string;
    accentColor: string;
}

/**
 * Represents a size category for notebooks within a brand.
 */
export interface NotebookSize {
    id: string;
    brandId: string;
    name: string;
    dimensions: string;
    notebookCount: number;
}

/**
 * Represents an individual notebook product.
 */
export interface Notebook {
    id: string;
    brandId: string;
    sizeId: string;
    name: string;
    pages: number;
    binding: string;
    paperType: string;
    ruling: string;
    coverType: string;
    frontCoverUrl: string;
    backCoverUrl: string;
    colorScheme: string;
}

/**
 * Generic API response wrapper for type-safe data fetching.
 * Designed to match future REST API response structure.
 */
export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
}

/**
 * Loading state type for consistent UI state management.
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Navigation breadcrumb item for hierarchy display.
 */
export interface BreadcrumbItem {
    label: string;
    path: string;
}
