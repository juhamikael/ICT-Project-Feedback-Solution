"use client";
import React, { useEffect, useState } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { DataTableDemo } from "./_components/Orders";
import type { FeedbackData, OrderData, TParsedFeedback } from "./_types";
import _ from "lodash";
import { CldImage } from "next-cloudinary";
import { FaStar as Star } from "react-icons/fa";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FeedbackListProps {
  feedbackData: TParsedFeedback[];
}

const FeedbackList: React.FC<FeedbackListProps> = ({ feedbackData }) => {
  return (
    <div>
      {feedbackData.map((fb) => (
        <Card key={fb.productId}>
          <CardHeader>
            <CardTitle>{fb.productName}</CardTitle>
            <CardDescription>{fb.customerName}</CardDescription>
            <CardDescription>{fb.userId}</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-row gap-x-4">
              <CldImage
                width="512"
                height="512"
                className="rounded-tr-2xl md:rounded-br-2xl h-60 w-60"
                src={fb.productImage}
                crop="scale"
                alt={fb.productName}
              />
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-row gap-x-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "h-10 w-10 transition-all",
                        star <= fb.grade
                          ? "text-yellow-400"
                          : "text-slate-500 hover:text-yellow-400"
                      )}
                    />
                  ))}
                </div>
                <div className="">{fb.feedback}</div>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            {/* You can add more content here if needed */}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

const AdminPanel = () => {
  const [orders, setOrders] = useState<OrderData>();
  const [feedback, setFeedback] = useState<FeedbackData>();
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/orders`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const ordersData = await res.json();
        setOrders(ordersData.body);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        // Handle error appropriately
      }
    };

    const fetchFeedback = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/feedback`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const feedbackData = await res.json();
        setFeedback(feedbackData.body);
      } catch (error) {
        console.error("Failed to fetch feedback:", error);
      }
    };

    fetchFeedback();
    fetchOrders();
  }, []);

  if (!orders || !feedback) {
    return (
      <MaxWidthWrapper className="flex justify-center">
        <div className="text-3xl font-black">Ladataan tietoja</div>
      </MaxWidthWrapper>
    );
  }
  const feedbackData = feedback.map((fb: FeedbackData) => {
    const { feedback, users, products } = fb;
    const fullName = `${_.capitalize(users.firstName)} ${_.capitalize(
      users.lastName
    )}`;
    return {
      feedback: feedback.feedback,
      customerName: fullName,
      grade: feedback.grade,
      productName: products.name,
      productImage: products.imageId,
      productId: products.id,
      orderId: feedback.orderId,
      userId: feedback.userId,
    };
  });

  const orderData = orders.map((order: OrderData) => {
    const { orderDetails, orders, products, users } = order;
    const fullName = `${_.capitalize(users.firstName)} ${_.capitalize(
      users.lastName
    )}`;
    return {
      status: orders.status,
      productName: products.name,
      totalPrice: orders.totalPrice,
      quantity: orderDetails.quantity,
      customerName: fullName,
      orderId: orders.id,
      userId: orders.userId,
      productId: products.id,
    };
  });

  return (
    <MaxWidthWrapper>
      <div className="flex justify-center">
        <Tabs defaultValue="orders">
          <TabsList>
            <TabsTrigger className={cn("w-[600px]")} value="orders">
              Tilaukset
            </TabsTrigger>
            <TabsTrigger className={cn("w-[600px]")} value="feedback">
              Palaute
            </TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <DataTableDemo data={orderData} />
          </TabsContent>
          <TabsContent value="feedback">
            <FeedbackList feedbackData={feedbackData} />
          </TabsContent>
        </Tabs>
      </div>
    </MaxWidthWrapper>
  );
};

export default AdminPanel;
