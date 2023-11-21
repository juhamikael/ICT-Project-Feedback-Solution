"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const RedirectUser = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const router = useRouter();
  const [isComponentMounted, setIsComponentMounted] = useState(false);

  useEffect(() => {
    setIsComponentMounted(true);
  }, []);

  useEffect(() => {
    if (isComponentMounted) {
      const destination = isAuthenticated ? "/dashboard" : "/products";
      router.push(destination);
    }
  }, [isAuthenticated, router, isComponentMounted]);

  return null;
};

export default RedirectUser;
