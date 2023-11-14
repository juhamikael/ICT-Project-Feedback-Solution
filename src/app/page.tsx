"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  return (
    <>
      {user ? (
        <>{router.push("/dashboard")}</>
      ) : (
        <>{router.push("/products")}</>
      )}
    </>
  );
}
