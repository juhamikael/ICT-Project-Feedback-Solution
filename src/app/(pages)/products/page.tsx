"use client";
import { CldImage } from "next-cloudinary";
import { products } from "@/data/products";
import { useState, useEffect } from "react";
import _ from "lodash";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import zoom from "@/styles/zoom.module.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";

import type { TProduct, TAllProducts } from "@/types/product";

const Products = () => {
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([]);

  const allProducts = products[0] as TAllProducts;

  const setFilters = () => {
    let newFilteredProducts: TProduct[] = [];
    Object.keys(allProducts).forEach((category) => {
      allProducts[category].forEach((productInfo: any) => {
        // Type this properly based on your data structure
        if (productInfo.products) {
          productInfo.products.forEach((product: TProduct) => {
            if (
              (!selectedPrice || product.price <= selectedPrice) &&
              (!selectedCategory || category === selectedCategory)
            ) {
              newFilteredProducts.push(product);
            }
          });
        }
      });
    });
    setFilteredProducts(newFilteredProducts);
  };

  useEffect(() => {
    setFilters();
  }, [selectedPrice, selectedCategory]);

  const setFilteredPrice = (value: string) => {
    if (value === "kaikki") {
      setSelectedPrice(null);
      return;
    }
    setSelectedPrice(Number(value));
  };

  const setFilteredCategory = (value: string) => {
    if (value === "kaikki") {
      setSelectedCategory(null);
      return;
    }
    setSelectedCategory(value);
  };
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col md:flex-row justify-around">
        <div className="md:w-1/4 md:px-4">
          <div className="flex flex-col gap-y-2">
            <Select onValueChange={(e) => setFilteredPrice(e)}>
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

            <Select onValueChange={(e) => setFilteredCategory(e)}>
              <SelectTrigger>
                <SelectValue placeholder="Kategoria" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="kaikki">Kaikki</SelectItem>
                {Object.keys(allProducts).map((category, index) => (
                  <SelectItem key={index} value={category}>
                    {_.capitalize(category)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full md:w-3/4">
          <div className="pb-6 font-bold">
            {selectedCategory ? _.capitalize(selectedCategory) : "Kaikki"}{" "}
            {selectedPrice ? `alle ${selectedPrice} €` : ""}
          </div>
          <div className="grid md:grid-cols-3 gap-x-10 gap-y-10">
            {filteredProducts.map((product, index) => (
              <Link
                className={cn("cursor-pointer", zoom.zoom)}
                href={`products/${product.productType}/${product.id}`}
                key={index}
              >
                <Card className={cn("rounded-xl")}>
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
                      <div className="text-sm font-medium">
                        {_.capitalize(product.productType)}
                      </div>
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
