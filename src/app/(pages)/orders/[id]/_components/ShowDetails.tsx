"use client";

import { CldImage } from "next-cloudinary";
import type { ViewOrderWithFeedback } from "@/types/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
const ShowDetails = ({ data }: { data: ViewOrderWithFeedback }) => {
  return (
    <div>
      <Card className="border-none bg-transparent flex">
        <CldImage
          width="512"
          height="512"
          className="rounded-tr-2xl md:rounded-br-2xl h-60 w-60"
          src={data.products?.imageId || ""}
          crop="scale"
          alt={data.orders.id}
        />
        <div>
          <CardHeader>
            <CardTitle>{data.products?.name}</CardTitle>
            <CardDescription>
              {data.orders.orderDate &&
                format(new Date(data.orders.orderDate), "dd.MM.yyyy")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>Tilauksen kokonaishinta {data.orders.totalPrice} €</div>
            <div>Tilausnumero {data.orders.id}</div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default ShowDetails;
