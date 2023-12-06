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

import type { TProduct } from "@/types/product";
import { cn } from "@/lib/utils";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import _ from "lodash";
import { Button, buttonVariants } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import OrderProductSheet from "@/components/order-product/OrderProductSheet";

type TSingleProductProps = {
  params: {
    slug: string[];
  };
};

const SingleProduct: FC<TSingleProductProps> = ({ params }) => {
  const productId = params.slug[0];
  const [product, setProduct] = useState<TProduct | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [loadingError, setLoadingError] = useState<boolean>(false);
  const { isAuthenticated, user } = useKindeBrowserClient();
  const userId = user?.id;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);

        if (res.status === 404) {
          setLoadingError(true);
          setErrorText("Tuotetta ei löytynyt");
          return;
        }
        if (res.status !== 200) {
          setLoadingError(true);
          setErrorText("Tuotteen tietojen lataaminen epäonnistui");
          return;
        }
        const data = await res.json();

        if (data.body.product[0]) {
          setProduct(data.body.product[0]);
        } else {
          setLoadingError(true);
          setErrorText("Tuotetta ei löytynyt");
        }
      } catch (error) {
        setLoadingError(true);
        setErrorText("Virhe tuotteen tietoja ladattaessa");
        console.error("Fetch Error:", error); // Debugging
      }
    };

    fetchProducts();
  }, [productId]);

  const getDescriptionLines = (description: string | null | undefined) => {
    if (!description) {
      return null;
    }

    const unescapedDescription = description.replace(/\\n/g, "\n");
    const normalizedDescription = unescapedDescription.replace(
      /(\r\n|\r)/g,
      "\n"
    );
    return normalizedDescription.split("\n\n").map((line, index) => (
      <p className="my-2" key={index}>
        {line}
      </p>
    ));
  };
  if (loadingError) {
    return (
      <div className="flex justify-center">
        <div className="text-center">
          <p className="py-2 text-2xl">{errorText}</p>
          <Link
            className={buttonVariants({ variant: "default" })}
            href="/products"
          >
            Takaisin
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center text-2xl">
        <p>Ladataan tuotteen tietoja...</p>
      </div>
    );
  }

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col gap-y-4">
        <Link className="font-bold" href="/products">
          Takaisin
        </Link>
        <div className="flex flex-col lg:flex-row justify-center">
          <CldImage
            width="512"
            height="512"
            className="rounded-tl-2xl md:rounded-bl-2xl w-full"
            src={product?.imageId || ""}
            crop="scale"
            alt={product.description}
          />
          <Card
            className={cn(
              "relative rounded-none w-full md:rounded-tr-2xl rounded-br-2xl bg-transparent "
            )}
          >
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>
                  {_.capitalize(product.productType)}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className={cn("flex-grow py-2")}>
              <div className="flex justify-between">
                <div className="font-black">{product.price} €</div>
                <div>
                  {product.quantity > 0
                    ? `${product.quantity} kpl`
                    : "Tilapäisesti loppu"}
                </div>
              </div>
              <CardDescription className={cn("text-base")}>
                {getDescriptionLines(product.description)}
              </CardDescription>
            </CardContent>
            <CardFooter className={"md:absolute md:bottom-0"}>
              <div className="flex flex-col">
                <CardDescription className="font-bold">
                  Tuotekoodi
                </CardDescription>
                <CardDescription>{product.id}</CardDescription>
                {isAuthenticated && (
                  <OrderProductSheet userId={userId!} product={product} />
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default SingleProduct;
