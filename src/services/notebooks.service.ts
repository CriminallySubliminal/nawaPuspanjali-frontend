/**
 * Notebook Service - Data Access Abstraction Layer
 * 
 * This service provides a clean interface for fetching notebook data.
 * Currently uses mock data but designed for easy swap to real API calls.
 */

import type { Brand, NotebookSize, Notebook, ApiResponse } from '../types';
import { mockBrands, mockSizes, mockNotebooks } from '../data/mock.data';

// Simulated network delay for realistic UX during development
const MOCK_DELAY_MS = 300;

const delay = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

const successResponse = <T>(data: T): ApiResponse<T> => ({
    data,
    success: true,
});

const errorResponse = <T>(data: T, message: string): ApiResponse<T> => ({
    data,
    success: false,
    message,
});

/**
 * NotebookService provides all data fetching operations.
 */
export const NotebookService = {
    async getBrands(): Promise<ApiResponse<Brand[]>> {
        await delay(MOCK_DELAY_MS);
        return successResponse(mockBrands);
    },

    async getBrandById(brandId: string): Promise<ApiResponse<Brand | null>> {
        await delay(MOCK_DELAY_MS);
        const brand = mockBrands.find((b) => b.id === brandId);
        if (!brand) {
            return errorResponse(null, `Brand with ID "${brandId}" not found`);
        }
        return successResponse(brand);
    },

    async getSizesByBrand(brandId: string): Promise<ApiResponse<NotebookSize[]>> {
        await delay(MOCK_DELAY_MS);
        const sizes = mockSizes.filter((s) => s.brandId === brandId);
        return successResponse(sizes);
    },

    async getSizeById(sizeId: string): Promise<ApiResponse<NotebookSize | null>> {
        await delay(MOCK_DELAY_MS);
        const size = mockSizes.find((s) => s.id === sizeId);
        if (!size) {
            return errorResponse(null, `Size with ID "${sizeId}" not found`);
        }
        return successResponse(size);
    },

    async getNotebooks(brandId: string, sizeId: string): Promise<ApiResponse<Notebook[]>> {
        await delay(MOCK_DELAY_MS);
        const notebooks = mockNotebooks.filter(
            (n) => n.brandId === brandId && n.sizeId === sizeId
        );
        return successResponse(notebooks);
    },

    async getNotebookById(notebookId: string): Promise<ApiResponse<Notebook | null>> {
        await delay(MOCK_DELAY_MS);
        const notebook = mockNotebooks.find((n) => n.id === notebookId);
        if (!notebook) {
            return errorResponse(null, `Notebook with ID "${notebookId}" not found`);
        }
        return successResponse(notebook);
    },

    async getNotebooksByBrand(brandId: string): Promise<ApiResponse<Notebook[]>> {
        await delay(MOCK_DELAY_MS);
        const notebooks = mockNotebooks.filter((n) => n.brandId === brandId);
        return successResponse(notebooks);
    },
};

export default NotebookService;
