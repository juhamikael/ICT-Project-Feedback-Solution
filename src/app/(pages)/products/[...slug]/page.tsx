"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CldImage } from "next-cloudinary";

import { FC, useEffect, useState } from "react";
import { products } from "@/data/products";

import type { TProduct, TAllProducts, TProductInfo } from "@/types/product";
import { cn } from "@/lib/utils";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import _ from "lodash";

type TSingleProductProps = {
  params: {
    slug: string[];
  };
};

const SingleProduct: FC<TSingleProductProps> = ({ params }) => {
  const productId = params.slug[0];
  const [product, setProduct] = useState<TProduct | null>(null);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();

      // match params.slug[0] to product.id

      const product = data.body.products.find(
        (product: TProduct) => product.id === productId
      );

      setProduct(product);
    };

    fetchProducts();
  }, []);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col gap-y-4">
        <Link className="font-bold" href="/products">
          Takaisin
        </Link>
        <div className="flex flex-col lg:flex-row justify-center">
          <div>
            <CldImage
              width="1024"
              height="1024"
              className="rounded-tl-2xl md:rounded-bl-2xl w-full"
              src={product?.imageId || ""}
              crop="scale"
              alt={product.description}
            />
          </div>
          <Card
            className={cn(
              "relative rounded-none w-full md:rounded-tr-2xl rounded-br-2xl "
            )}
          >
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>
                  {_.capitalize(product.productType)}
                </CardDescription>
              </div>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent className={cn("")}>
              <div className="flex justify-between">
                <div className="font-black">{product.price} €</div>
                <div>
                  {product.quantity > 0
                    ? `${product.quantity} kpl`
                    : "Tilapäisesti loppu"}
                </div>
              </div>
            </CardContent>
            <CardFooter className={"md:absolute md:bottom-0"}>
              <div className="flex flex-col">
                <CardDescription className="font-bold">
                  Tuotekoodi
                </CardDescription>
                <CardDescription>{product.id}</CardDescription>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default SingleProduct;
