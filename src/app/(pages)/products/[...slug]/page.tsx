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

import { FC } from "react";
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
  const productType = params.slug[0];
  const productId = params.slug[1];

  const productData: TAllProducts = products[0];
  let foundProduct: TProduct | null = null;

  Object.keys(productData).forEach((category) => {
    productData[category].forEach((productInfo: TProductInfo) => {
      const product = productInfo.products.find((p) => p.id === productId);
      if (product) {
        foundProduct = product;
      }
    });
  });

  if (!foundProduct) {
    return <div>Product not found</div>;
  }

  const safeProduct = foundProduct as TProduct;

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
              src={safeProduct.imageId}
              crop="scale"
              alt={safeProduct.description}
            />
          </div>
          <Card
            className={cn(
              "relative rounded-none w-full md:rounded-tr-2xl rounded-br-2xl "
            )}
          >
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>{safeProduct.name}</CardTitle>
                <CardDescription>
                  {_.capitalize(safeProduct.productType)}
                </CardDescription>
              </div>
              <CardDescription>{safeProduct.description}</CardDescription>
            </CardHeader>
            <CardContent className={cn("")}>
              <div className="flex justify-between">
                <div className="font-black">{safeProduct.price} €</div>
                <div>{safeProduct.quantity} kpl</div>
              </div>
            </CardContent>
            <CardFooter className={"md:absolute md:bottom-0"}>
              <div className="flex flex-col">
                <CardDescription className="font-bold">
                  Tuotekoodi
                </CardDescription>
                <CardDescription>{safeProduct.id}</CardDescription>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default SingleProduct;
