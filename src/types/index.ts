/**
 * Represents a notebook brand.
 */
export interface Brand {
    id: number;
    name: string;
    slug: string;
    description?: string;
    paper?: string;
}

/**
 * Represents a type of notebook (e.g., Copy, Register).
 */
export interface NotebookType {
    id: number;
    name: string;
    slug: string;
}

/**
 * Represents a notebook size.
 */
export interface Size {
    id: number;
    name: string;
    slug: string;
    width: number;
    height: number;
    unit: string;
    display_order: number;
}

/**
 * Represents a ruling style (e.g., 2-lined, Single-lined).
 */
export interface Ruling {
    id: number;
    name: string;
    slug: string;
}

/**
 * Represents a specific variant of a notebook.
 */
export interface NotebookVariant {
    id: number;
    slug: string;
    notebook_name: string;
    notebook_brand: Brand;
    notebook_type: NotebookType;
    size: Size;
    ruling: Ruling;
    gsm: number;
    price_per_unit: string; // Decimal comes as string from DRF
    full_description?: string;
    display_name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

/**
 * Represents a base notebook product containing multiple variants.
 */
export interface Notebook {
    id: number;
    name: string;
    slug: string;
    brand: Brand;
    notebook_type: NotebookType;
    image: string;
    base_description: string;
    is_active: boolean;
    variants: NotebookVariant[];
    available_sizes: Size[];
    available_rulings: Ruling[];
    created_at: string;
    updated_at: string;
}

/**
 * Available filter options for product pages.
 */
export interface FilterOptions {
    brands: Brand[];
    notebook_types: NotebookType[];
    sizes: Size[];
    rulings: Ruling[];
}

/**
 * Generic API response wrapper.
 */
export type ApiResponse<T> =
    | { data: T; success: true; message?: string }
    | { data: null; success: false; message: string };

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
