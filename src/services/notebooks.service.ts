/**
 * Notebook Service - Data Access Abstraction Layer
 * 
 * This service provides a interface for fetching notebook data from the Django API.
 */

import type { Brand, Notebook, NotebookVariant, ApiResponse, FilterOptions } from '../types';
import { MockDataService } from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
const CACHE_KEY = 'puspanjali_api_cache';
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

interface CacheData {
    filterOptions: FilterOptions | null;
    notebooks: Notebook[] | null;
    timestamp: number;
}

// In-memory reference that syncs with sessionStorage
let serviceCache: CacheData = (() => {
    try {
        const saved = sessionStorage.getItem(CACHE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            const isExpired = Date.now() - parsed.timestamp > CACHE_TTL;
            if (!isExpired) return parsed;
        }
    } catch (e) {
        console.warn('Failed to load cache from sessionStorage', e);
    }
    return { filterOptions: null, notebooks: null, timestamp: Date.now() };
})();

const saveCache = () => {
    try {
        serviceCache.timestamp = Date.now();
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(serviceCache));
    } catch (e) {
        console.warn('Failed to save cache to sessionStorage', e);
    }
};

const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
    if (!response.ok) {
        return {
            data: null,
            success: false as const,
            message: `API Error: ${response.status} ${response.statusText}`,
        };
    }
    try {
        const data = await response.json();
        return {
            data,
            success: true as const,
        };
    } catch (error) {
        return {
            data: null,
            success: false as const,
            message: 'Failed to parse response',
        };
    }
};

/**
 * NotebookService provides all data fetching operations.
 */
export const NotebookService = {
    /**
     * Fetch all filter options (brands, types, sizes, rulings)
     */
    async getFilterOptions(): Promise<ApiResponse<FilterOptions>> {
        // Return from cache if available
        if (serviceCache.filterOptions) {
            return { data: serviceCache.filterOptions, success: true };
        }

        try {
            const response = await fetch(`${API_BASE_URL}/filter-options/`);
            const result = await handleResponse<FilterOptions>(response);
            if (result.success) {
                serviceCache.filterOptions = result.data;
                saveCache();
                return result;
            }
            console.warn('getFilterOptions API success false, falling back to mock data', result.message);
        } catch (error) {
            console.warn('getFilterOptions fetch failed, falling back to mock data', error);
        }
        return MockDataService.getFilterOptions();
    },

    /**
     * Fetch all brands
     */
    async getBrands(): Promise<ApiResponse<Brand[]>> {
        try {
            const response = await fetch(`${API_BASE_URL}/filter-options/`);
            const result = await handleResponse<FilterOptions>(response);
            if (result.success) {
                return { data: result.data.brands, success: true };
            }
            console.warn('getBrands API success false, falling back to mock data', result.message);
        } catch (error) {
            console.warn('getBrands fetch failed, falling back to mock data', error);
        }
        return MockDataService.getBrands();
    },

    /**
     * Fetch notebooks with optional filtering by brand, type, size, search, and ordering
     */
    async getNotebooks(params: {
        brand?: number | null;
        type?: number | null;
        size?: number | null;
        search?: string;
        ordering?: string;
    }): Promise<ApiResponse<Notebook[]>> {
        // Check cache for global notebooks fetch (empty params)
        const isGlobalFetch = !params.brand && !params.type && !params.size && !params.search && !params.ordering;
        if (isGlobalFetch && serviceCache.notebooks) {
            return { data: serviceCache.notebooks, success: true };
        }

        try {
            const queryParams = new URLSearchParams();
            if (params.brand) queryParams.append('brand', params.brand.toString());
            if (params.type) queryParams.append('notebook_type', params.type.toString());
            if (params.size) queryParams.append('size', params.size.toString());
            if (params.search) queryParams.append('search', params.search);
            if (params.ordering) queryParams.append('ordering', params.ordering);

            const response = await fetch(`${API_BASE_URL}/notebooks/?${queryParams.toString()}`);
            const result = await handleResponse<Notebook[]>(response);
            if (result.success) {
                // Cache the global result
                if (isGlobalFetch) {
                    serviceCache.notebooks = result.data;
                    saveCache();
                }
                return result;
            }
            console.warn('getNotebooks API success false, falling back to mock data', result.message);
        } catch (error) {
            console.warn('getNotebooks fetch failed, falling back to mock data', error);
        }

        // Fallback: if brand is provided, use specific method, otherwise get all
        if (params.brand) return MockDataService.getNotebooksByBrand(params.brand);
        return { data: MockDataService.getNotebooksByBrand(1).data || [], success: true }; // Simplified fallback
    },

    /**
     * Fetch notebooks for a specific brand with optional search and ordering
     */
    async getNotebooksByBrand(brandId: number, search?: string, ordering?: string): Promise<ApiResponse<Notebook[]>> {
        return this.getNotebooks({ brand: brandId, search, ordering });
    },

    /**
     * Fetch a single notebook by its slug
     */
    async getNotebookBySlug(slug: string): Promise<ApiResponse<Notebook>> {
        try {
            const response = await fetch(`${API_BASE_URL}/notebooks/${slug}/`);
            const result = await handleResponse<Notebook>(response);
            if (result.success) return result;
            console.warn('getNotebookBySlug API success false, falling back to mock data', result.message);
        } catch (error) {
            console.warn('getNotebookBySlug fetch failed, falling back to mock data', error);
        }
        return MockDataService.getNotebookBySlug(slug);
    },

    /**
     * Fetch variants for a specific notebook with optional search, sorting, and filters
     */
    async getVariants(params: {
        notebook?: number;
        brand?: number;
        search?: string;
        ordering?: string;
        size?: number;
        ruling?: number;
    }): Promise<ApiResponse<NotebookVariant[]>> {
        try {
            const queryParams = new URLSearchParams();
            if (params.notebook) queryParams.append('notebook', params.notebook.toString());
            if (params.brand) queryParams.append('brand', params.brand.toString());
            if (params.search) queryParams.append('search', params.search);
            if (params.ordering) queryParams.append('ordering', params.ordering);
            if (params.size) queryParams.append('size', params.size.toString());
            if (params.ruling) queryParams.append('ruling', params.ruling.toString());

            const response = await fetch(`${API_BASE_URL}/notebook-variants/?${queryParams.toString()}`);
            const result = await handleResponse<NotebookVariant[]>(response);
            if (result.success) return result;
            console.warn('getVariants API success false, falling back to mock data', result.message);
        } catch (error) {
            console.warn('getVariants fetch failed, falling back to mock data', error);
        }
        return MockDataService.getVariants(params);
    },

    /**
     * Fetch a single variant by its slug
     */
    async getVariantBySlug(slug: string): Promise<ApiResponse<NotebookVariant>> {
        try {
            const response = await fetch(`${API_BASE_URL}/notebook-variants/${slug}/`);
            const result = await handleResponse<NotebookVariant>(response);
            if (result.success) return result;
            console.warn('getVariantBySlug API success false, falling back to mock data', result.message);
        } catch (error) {
            console.warn('getVariantBySlug fetch failed, falling back to mock data', error);
        }
        return MockDataService.getVariantBySlug(slug);
    },
};

export default NotebookService;
