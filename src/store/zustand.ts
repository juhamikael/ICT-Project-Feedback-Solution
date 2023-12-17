import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { TAllProducts, TProduct, TCategory } from "@/types/product"
import type { } from "@/types/api"
interface ProductsState {
    products: TProduct[];
    setProducts: (products: TProduct[]) => void;
    setNewProduct: (product: TProduct) => void;
}


interface CategoryState {
    categories: TCategory[];
    setCategories: (categories: TCategory[]) => void;
}


export const useCategoryStore = create<CategoryState>()(
    persist(
        (set) => ({
            categories: [],
            setCategories: (categories) => set({ categories }),
        }),
        {
            name: 'categories-store',
        },
    )
);

export const useProductStore = create<ProductsState>()(
    persist(
        (set) => ({
            products: [],
            setProducts: (products) => set({ products }),
            setNewProduct: (product: TProduct) => set((state) => ({ products: [...state.products, product] })),
        }),
        {
            name: 'products-store',
        },
    )
);
