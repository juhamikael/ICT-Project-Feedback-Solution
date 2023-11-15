type TCloudinaryImage = {
    asset_id: string;
    public_id: string;
    format: string;
    version: number;
    resource_type: string;
    type: string;
    created_at: string;
    bytes: number;
    width: number;
    height: number;
    asset_folder: string;
    display_name: string;
    url: string;
    secure_url: string;
    last_updated: unknown;
};

type TCategoriesData = {
    categoriesData: {
        id: string;
        name: string;
    }[];
    subCategoriesData: {
        id: string;
        name: string;
        categoryId: string;
    }[];
};

export type { TCloudinaryImage, TCategoriesData }