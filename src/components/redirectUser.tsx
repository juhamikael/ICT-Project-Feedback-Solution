"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TCategory, TProduct } from "@/types/product";
import { useCategoryStore, useProductStore } from "@/store/zustand";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

const RedirectUser = ({
  products,
  categories,
  user,
}: {
  products: TProduct[];
  categories: TCategory[];
  user: KindeUser | null;
}) => {
  const { setProducts } = useProductStore();
  const { setCategories } = useCategoryStore();
  const router = useRouter();
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  const isAuthenticated = !!user;

  useEffect(() => {
    setIsComponentMounted(true);
    // Set products and categories directly from props
    setProducts(products);
    setCategories(categories);
  }, [products, categories, setProducts, setCategories]);

  useEffect(() => {
    if (isComponentMounted) {
      const destination = isAuthenticated ? "/dashboard" : "/products";
      router.push(destination);
    }
  }, [isAuthenticated, router, isComponentMounted]);

  return null;
};

export default RedirectUser;
