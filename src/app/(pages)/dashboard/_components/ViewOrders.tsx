"use client";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ViewOrder } from "@/types/api";
import { format } from "date-fns";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { translateOrderStatus } from "@/lib/utils";

const ViewOrders = ({ item }: { item: ViewOrder }) => {
  const descriptionClass = "text-lg text-white";

  return (
    <Card className={cn("flex rounded-2xl")}>
      <CardHeader className={cn("w-full")}>
        <CardTitle className={cn("text-2xl")}>
          {item.products?.name && `${item.orderDetails?.quantity} x `}
          {item.products?.name || "Tuote poistettu"}
        </CardTitle>
        <CardDescription className={cn("pb-6")}>
          <span className="font-bold">Tilausnumero: </span>
          <span>{item.orders.id}</span>
        </CardDescription>
        <CardDescription className={cn(descriptionClass)}>
          <span className="font-bold">Tilauspäivä: </span>
          <span>{format(new Date(item.orders.orderDate), "dd/MM/yyyy")}</span>
        </CardDescription>
        <CardDescription className={cn(descriptionClass)}>
          <span className="font-bold">Tila: </span>
          <span>{translateOrderStatus(item.orders.status)}</span>
        </CardDescription>
        <CardDescription className={cn(descriptionClass)}>
          <span>Hinta: </span>
          <span>{item.orders.totalPrice}€</span>
        </CardDescription>
        <CardFooter className={cn("p-0")}>
          <Link
            href={`/orders/${item.orders.id}`}
            className={buttonVariants({ variant: "default" })}
          >
            Tarkastele tilausta
          </Link>
        </CardFooter>
      </CardHeader>
      <div>
        <CldImage
          width="512"
          height="512"
          className="rounded-tr-2xl md:rounded-br-2xl h-60 w-60"
          src={item.products?.imageId || ""}
          crop="scale"
          alt={item.orders.id}
        />
      </div>
    </Card>
  );
};

export default ViewOrders;
