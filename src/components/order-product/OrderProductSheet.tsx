"use client";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Button, buttonVariants } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Toaster, toast } from "sonner";
import { baseUrl } from "@/lib/config";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TProduct } from "@/types/product";
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  quantity: z.number(),
});

const OrderProductSheet = ({
  product,
  userId,
}: {
  product: TProduct;
  userId: string;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 1,
    },
  });
  const calculateTotalPrice = (quantity: number) => {
    return quantity * product.price;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = `${baseUrl}/api/user-orders`;
      const body = {
        productId: product.id,
        quantity: values.quantity,
        userId: userId,
      };
      await axios.post(url, body);
      toast.success("Tilaus onnistui");
      form.reset();
      router.push("/dashboard");
    } catch (error) {
      toast.error("Tilaus epäonnistui");
      console.log(error);
    }
  };
  const maxOrder = Math.floor(product.quantity / 2);
  return (
    <>
      <Toaster richColors />
      <Sheet>
        <SheetTrigger className={buttonVariants({ variant: "default" })}>
          Tilaa Nyt
        </SheetTrigger>
        <SheetContent side="bottom" className={cn("overflow-y-auto")}>
          <SheetHeader className={cn("pb-6")}>
            <SheetTitle className={cn("text-2xl font-black")}>
              {product.name}
            </SheetTitle>
            <SheetDescription className={cn("text-xl font-bold")}>
              Hinta {calculateTotalPrice(form.watch("quantity"))}€
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tuotteiden lukumäärä</FormLabel>
                    <FormDescription>{field.value}</FormDescription>
                    <FormControl>
                      <Slider
                        min={1}
                        max={maxOrder}
                        step={1}
                        defaultValue={[0]}
                        onValueChange={(value) => {
                          field.onChange(value[0]);
                        }}
                        value={[field.value]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className={cn("w-full z-50")} type="submit">
                Vahvista tilaus
              </Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default OrderProductSheet;
