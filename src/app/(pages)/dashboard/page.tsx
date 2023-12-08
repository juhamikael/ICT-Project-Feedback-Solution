import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { FC } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { baseUrl } from "@/lib/config";
import axios from "axios";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

type TDashboardProps = {
  prop?: string;
  children?: React.ReactNode;
};

type TOrder = {
  id: string;
  userId: string;
  orderDate: string;
  status: string;
  totalPrice: number;
};

import type { ViewOrder } from "@/types/api";
import ViewOrders from "./_components/ViewOrders";

const Dashboard: FC<TDashboardProps> = async ({}) => {
  const btnStyle = "border border-b rounded-none text-white ";
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const orders = await axios.get(`${baseUrl}/api/user-orders`, {
    params: {
      userId: user?.id,
    },
  });
  const data: ViewOrder[] = orders.data.body;

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4">
          <div className="flex flex-col md:h-screen ">
            <h1 className="pb-4 font-black text-2xl underline">
              My Acme valikko
            </h1>
            <Button
              className={cn(
                buttonVariants({ variant: "outline" }),
                btnStyle,
                "rounded-t-xl"
              )}
            >
              Ostoshistoria
            </Button>
          </div>
        </div>
        <div className="border mx-4 my-6 md:my-0"></div>
        <div className="w-3/4">
          <h1 className="pb-4 font-black text-2xl underline">
            Viimeisimmät tapahtumat
          </h1>
          {data.map((item: ViewOrder) => (
            <div key={item.orders.id} className="py-2">
              <ViewOrders item={item} />
            </div>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Dashboard;
