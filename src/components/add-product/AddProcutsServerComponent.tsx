import { FC } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import axios from "axios";
import AddProductsForm from "./AddProductsForm";
import { baseUrl } from "@/lib/config";
import type { TCategoriesData } from "@/types/newProducts";

const AddProcutsServerComponent = async ({}) => {
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const fetchCategories = async () => {
    const categoriesRes = await fetch(`${baseUrl}/api/categories`);
    const subCategoriesRes = await fetch(`${baseUrl}/api/sub-categories`);

    const categoriesData = await categoriesRes.json();
    const subCategoriesData = await subCategoriesRes.json();

    return {
      categoriesData: categoriesData.body,
      subCategoriesData: subCategoriesData.body,
    };
  };

  const categoryData: TCategoriesData = await fetchCategories();

  const fetchImages = async () => {
    const images = `https://${apiKey}:${apiSecret}@api.cloudinary.com/v1_1/${cloud}/resources/image`;
    const res = await axios(images);
    const publicIds = res.data.resources.map(
      ({ public_id, url }: { public_id: string; url: string }) => ({
        id: public_id,
        url: url,
      })
    );
    return publicIds;
  };

  const imageDataArray = await fetchImages();

  return (
    <AddProductsForm
      categoryData={categoryData}
      imageIdArray={imageDataArray}
    />
  );
};

export default AddProcutsServerComponent;
