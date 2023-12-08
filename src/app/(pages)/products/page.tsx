"use client";
import { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import _ from "lodash";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { cn } from "@/lib/utils";
import zoom from "@/app/styles/zoom.module.css";
import { useCategoryStore, useProductStore } from "@/store/zustand";
import { TProduct } from "@/types/product";
import { buttonVariants } from "@/components/ui/button";

const Products = () => {
  const [selectedPrice, setSelectedPrice] = useState<number | null | string>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([]);
  const [isComponentMounted, setIsComponentMounted] = useState(false);

  const { products } = useProductStore();
  const { categories } = useCategoryStore();

  useEffect(() => {
    setIsComponentMounted(true);
  }, []);

  useEffect(() => {
    const newFilteredProducts = products
      .filter((product) => {
        const matchesPrice =
          selectedPrice === "kaikki" ||
          selectedPrice === null ||
          (typeof product.price === "number" &&
            typeof selectedPrice === "string" &&
            product.price <= parseInt(selectedPrice, 10));

        const matchesCategory =
          selectedCategory === null ||
          selectedCategory === "kaikki" ||
          product.categoryId?.toString() === selectedCategory;

        return matchesPrice && matchesCategory;
      })
      .sort((a, b) => (a.price ?? 0) - (b.price ?? 0));

    setFilteredProducts(newFilteredProducts);
  }, [selectedPrice, selectedCategory, products]);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((category) => category.id === categoryId);
    return _.capitalize(category?.name);
  };

  if (!isComponentMounted || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="pb-4 font-bold text-2xl underline">
          Ladataan tuotteita...
        </div>
        <Link href="/">
          <button
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-b-xl"
            )}
          >
            Hae tuotteet uudelleen
          </button>
        </Link>
      </div>
    );
  }

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col md:flex-row justify-around">
        <div className="md:w-1/4 md:px-4">
          <div className="flex flex-col gap-y-2">
            <Select onValueChange={(e) => setSelectedPrice(e)}>
              <SelectTrigger>
                <SelectValue placeholder="Hinta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kaikki">Kaikki</SelectItem>
                <SelectItem value="200">200 € tai alle</SelectItem>
                <SelectItem value="500">500 € tai alle</SelectItem>
                <SelectItem value="1000">1000 € tai alle</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(e) => setSelectedCategory(e)}>
              <SelectTrigger>
                <SelectValue placeholder="Kategoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kaikki">Kaikki</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {_.capitalize(category.name)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full md:w-3/4">
          <div className="pb-6 font-bold">
            {selectedCategory
              ? getCategoryName(selectedCategory)
              : "Kaikki tuotteet"}{" "}
            {selectedPrice && selectedPrice !== "kaikki"
              ? `alle ${selectedPrice} €`
              : ""}
          </div>
          <div className="grid md:grid-cols-3 gap-x-10 gap-y-10">
            {filteredProducts.map((product, index) => (
              <Link
                className={cn("cursor-pointer", zoom.zoom)}
                href={`products/${product.id}`}
                key={index}
              >
                <Card className={cn("rounded-xl bg-transparent")}>
                  <CldImage
                    width="1024"
                    height="1024"
                    className="w-full rounded-t-xl "
                    src={product.imageId}
                    crop="scale"
                    alt={product.description}
                  />
                  <CardHeader>
                    <CardDescription>
                      <div className="text-lg font-medium">{product.name}</div>
                      <div className="text-lg font-black">
                        {product.price} €
                      </div>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Products;
