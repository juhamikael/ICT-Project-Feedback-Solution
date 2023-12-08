export type TProduct = {
    id: string;
    imageId: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
    productType: string;
    categoryId?: string;
};

export type TProductInfo = {
    type: string;
    products: TProduct[];
};

export type TAllProducts = {
    [category: string]: TProductInfo[];
};

export type TCategory = {
    id: string;
    name: string;
};