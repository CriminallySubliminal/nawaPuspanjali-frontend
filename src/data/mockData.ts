import type { Brand, Notebook, NotebookVariant, NotebookType, Size, Ruling, FilterOptions, ApiResponse } from '../types';

// --- Filter Options Mock Data ---

export const mockBrands: Brand[] = [
    { id: 1, name: 'Puspanjali', slug: 'puspanjali', description: 'Premium quality notebooks for students and professionals.', paper: '60 GSM White Bond Paper' },
    { id: 2, name: 'Eco-Write', slug: 'eco-write', description: 'Sustainable and recycled paper notebooks.', paper: '90 GSM Recycled Kraft Paper' },
    { id: 3, name: 'Zenith', slug: 'zenith', description: 'High-end stationery and journals.', paper: '80 GSM Premium Ivory Paper' },
    { id: 4, name: 'Classmate', slug: 'classmate', description: 'Popular choice for school students.', paper: '70 GSM Brightwhite Paper' },
];

export const mockNotebookTypes: NotebookType[] = [
    { id: 1, name: 'Copy', slug: 'copy' },
    { id: 2, name: 'Register', slug: 'register' },
    { id: 3, name: 'Practical Book', slug: 'practical-book' },
    { id: 4, name: 'Drawing Book', slug: 'drawing-book' },
    { id: 5, name: 'Spiral Notebook', slug: 'spiral-notebook' },
];

export const mockSizes: Size[] = [
    { id: 1, name: 'School Size', slug: 'school-size', width: 180, height: 240, unit: 'mm', display_order: 1 },
    { id: 2, name: 'Big Size', slug: 'big-size', width: 190, height: 270, unit: 'mm', display_order: 2 },
    { id: 3, name: 'A4 Size', slug: 'a4-size', width: 210, height: 297, unit: 'mm', display_order: 3 },
    { id: 4, name: 'Pocket Size', slug: 'pocket-size', width: 90, height: 140, unit: 'mm', display_order: 4 },
];

export const mockRulings: Ruling[] = [
    { id: 1, name: 'Single Lined', slug: 'single-lined' },
    { id: 2, name: 'Unruled (Plain)', slug: 'unruled' },
    { id: 3, name: '2 Lined', slug: '2-lined' },
    { id: 4, name: '4 Lined', slug: '4-lined' },
    { id: 5, name: 'Square Grid', slug: 'square-grid' },
];

export const mockFilterOptions: FilterOptions = {
    brands: mockBrands,
    notebook_types: mockNotebookTypes,
    sizes: mockSizes,
    rulings: mockRulings,
};

// --- Helper for consistent timestamps ---
const now = new Date().toISOString();

// --- Variant Mock Data (Puspanjali) ---

const puspanjaliCopyVariants: NotebookVariant[] = [
    {
        id: 101,
        slug: 'puspanjali-copy-big-size-single-lined-120-pages',
        notebook_name: 'Puspanjali Copy',
        notebook_brand: mockBrands[0],
        notebook_type: mockNotebookTypes[0],
        size: mockSizes[1],
        ruling: mockRulings[0],
        gsm: 60,
        price_per_unit: '40.00',
        display_name: 'Puspanjali Copy (Big Size, Single Lined, 60 GSM)',
        is_active: true,
        created_at: now,
        updated_at: now,
        full_description: 'Standard Puspanjali copy with high-quality white paper. Ideal for secondary school students.',
    },
    {
        id: 102,
        slug: 'puspanjali-copy-big-size-2-lined-120-pages',
        notebook_name: 'Puspanjali Copy',
        notebook_brand: mockBrands[0],
        notebook_type: mockNotebookTypes[0],
        size: mockSizes[1],
        ruling: mockRulings[2],
        gsm: 70,
        price_per_unit: '45.00',
        display_name: 'Puspanjali Copy (Big Size, 2 Lined, 70 GSM)',
        is_active: true,
        created_at: now,
        updated_at: now,
        full_description: 'High-quality 2-lined ruling for cursive writing practice.',
    },
];

const puspanjaliRegisterVariants: NotebookVariant[] = [
    {
        id: 103,
        slug: 'puspanjali-register-a4-single-lined-240-pages',
        notebook_name: 'Puspanjali Register',
        notebook_brand: mockBrands[0],
        notebook_type: mockNotebookTypes[1],
        size: mockSizes[2],
        ruling: mockRulings[0],
        gsm: 80,
        price_per_unit: '100.00',
        display_name: 'Puspanjali Register (A4, Single Lined, 80 GSM)',
        is_active: true,
        created_at: now,
        updated_at: now,
        full_description: 'Hardcover register for office and long-term notes.',
    },
];

// --- Notebook Mock Data (Puspanjali) ---

export const mockPuspanjaliNotebooks: Notebook[] = [
    {
        id: 1,
        name: 'Puspanjali Copy',
        slug: 'puspanjali-copy',
        brand: mockBrands[0],
        notebook_type: mockNotebookTypes[0],
        image: '/notebooks/copy.jpg',
        base_description: 'The standard choice for many schools, featuring our signature smooth paper.',
        is_active: true,
        variants: puspanjaliCopyVariants,
        available_sizes: [mockSizes[1]],
        available_rulings: [mockRulings[0], mockRulings[2]],
        created_at: now,
        updated_at: now,
    },
    {
        id: 2,
        name: 'Puspanjali Register',
        slug: 'puspanjali-register',
        brand: mockBrands[0],
        notebook_type: mockNotebookTypes[1],
        image: '/notebooks/register.jpg',
        base_description: 'Durable registers designed for heavy usage.',
        is_active: true,
        variants: puspanjaliRegisterVariants,
        available_sizes: [mockSizes[2]],
        available_rulings: [mockRulings[0]],
        created_at: now,
        updated_at: now,
    },
];

// --- Variant Mock Data (Eco-Write) ---

const ecoWriteSpiralVariants: NotebookVariant[] = [
    {
        id: 201,
        slug: 'eco-write-spiral-a4-unruled-100-pages',
        notebook_name: 'Eco-Write Spiral',
        notebook_brand: mockBrands[1],
        notebook_type: mockNotebookTypes[4],
        size: mockSizes[2],
        ruling: mockRulings[1],
        gsm: 90,
        price_per_unit: '50.00',
        display_name: 'Eco-Write Spiral (A4, Unruled, 90 GSM)',
        is_active: true,
        created_at: now,
        updated_at: now,
        full_description: 'Made from 100% recycled materials. Great for sketching and journaling.',
    },
];

// --- Notebook Mock Data (Eco-Write) ---

export const mockEcoWriteNotebooks: Notebook[] = [
    {
        id: 3,
        name: 'Eco-Write Spiral',
        slug: 'eco-write-spiral',
        brand: mockBrands[1],
        notebook_type: mockNotebookTypes[4],
        image: '/notebooks/spiral.jpg',
        base_description: 'Sustainable stationery for the eco-conscious individual.',
        is_active: true,
        variants: ecoWriteSpiralVariants,
        available_sizes: [mockSizes[2]],
        available_rulings: [mockRulings[1]],
        created_at: now,
        updated_at: now,
    },
];

// --- All Notebooks Combined ---

export const mockAllNotebooks: Notebook[] = [
    ...mockPuspanjaliNotebooks,
    ...mockEcoWriteNotebooks,
    // Add more brands as needed
];

// --- All Variants Combined ---

export const mockAllVariants: NotebookVariant[] = [
    ...puspanjaliCopyVariants,
    ...puspanjaliRegisterVariants,
    ...ecoWriteSpiralVariants,
];

/**
 * Service-like wrapper for mock data access
 */
export const MockDataService = {
    getFilterOptions: (): ApiResponse<FilterOptions> => ({ data: mockFilterOptions, success: true }),
    getBrands: (): ApiResponse<Brand[]> => ({ data: mockBrands, success: true }),
    getNotebooksByBrand: (brandId: number): ApiResponse<Notebook[]> => {
        const data = mockAllNotebooks.filter(n => n.brand.id === brandId);
        return { data, success: true };
    },
    getNotebookBySlug: (slug: string): ApiResponse<Notebook> => {
        const data = mockAllNotebooks.find(n => n.slug === slug);
        return data ? { data, success: true } : { data: null, success: false, message: 'Not found' };
    },
    getVariants: (params: { brand?: number, notebook?: number }): ApiResponse<NotebookVariant[]> => {
        let data = mockAllVariants;
        if (params.brand) data = data.filter(v => v.notebook_brand.id === params.brand);
        if (params.notebook) data = data.filter(v => mockAllNotebooks.find(n => n.id === params.notebook)?.variants.some(nv => nv.id === v.id));
        return { data, success: true };
    },
    getVariantBySlug: (slug: string): ApiResponse<NotebookVariant> => {
        const data = mockAllVariants.find(v => v.slug === slug);
        return data ? { data, success: true } : { data: null, success: false, message: 'Not found' };
    }
};
