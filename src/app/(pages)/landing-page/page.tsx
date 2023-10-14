"use client";
import { CldImage } from "next-cloudinary";
import { products } from "@/data/products";
import { useState, useEffect } from "react";
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

type TProduct = {
  id: string;
  imageId: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
};

const LandingPageNotLoggedIn = () => {
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const allProducts = products[0];

  useEffect(() => {
    let newFilteredProducts: TProduct[] = [];
    Object.keys(allProducts).forEach((category) => {
      allProducts[category].forEach((productInfo) => {
        if (productInfo.products) {
          productInfo.products.forEach((product) => {
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
  }, [selectedPrice, selectedCategory]);

  console.log(filteredProducts);
  return (
    <MaxWidthWrapper>
      <div className="flex flex-row justify-around">
        <div className="w-1/4">
          <div className="flex flex-col gap-y-2">
            <select
              onChange={(e) => setSelectedPrice(e.target.value)}
              value={selectedPrice}
            >
              <option value="">Valitse hinta</option>
              <option value="200">200 € tai alle</option>
              <option value="500">500 € tai alle</option>
              <option value="1000">1000 € tai alle</option>
            </select>

            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
            >
              <option value="">Valitse kategoria</option>
              {Object.keys(allProducts).map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-3/4">
          <div className="grid grid-cols-4 gap-x-10 gap-y-10">
            {filteredProducts.map((product, index) => (
              <Card key={index} className={cn("rounded-xl ")}>
                <CldImage
                  width="256"
                  height="256"
                  className="w-full rounded-t-xl "
                  src={product.imageId}
                  crop="scale"
                  alt={product.description}
                />
                <CardHeader>
                  <CardDescription>
                    <h3 className="text-xl font-medium">{product.name}</h3>
                    <p className="text-2xl font-black">{product.price} €</p>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default LandingPageNotLoggedIn;
