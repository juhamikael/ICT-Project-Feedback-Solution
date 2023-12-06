import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ViewOrder, ViewOrderWithFeedback } from "@/types/api";
import { format } from "date-fns";
import { CldImage } from "next-cloudinary";
import Feedback from "@/components/feedback/feedback";

import Link from "next/link";
import { baseUrl } from "@/lib/config";
import axios from "axios";
import { FC } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { returnOrderStatus } from "@/lib/utils";
import ShowDetails from "./_components/ShowDetails";
type TSingleOrderProps = {
  params: {
    id: string[];
  };
};

const AskFeedback = () => {
  return (
    <div>
      <div>AskFeedback</div>
    </div>
  );
};

const Page: FC<TSingleOrderProps> = async ({ params }) => {
  const orderId = params.id;
  console.log(orderId);
  const order = await axios.get(`${baseUrl}/api/single-order`, {
    params: {
      orderId: orderId,
    },
  });
  const data: ViewOrderWithFeedback = order.data.body[0];

  console.log(data.orders.status);

  return (
    <MaxWidthWrapper>
      <div>
        <div>Page</div>
        <ShowDetails data={data} />
        {!data.feedback && (
          <>
            <div className="font-bold">Palaute kysely</div>
            <Feedback />
          </>
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
