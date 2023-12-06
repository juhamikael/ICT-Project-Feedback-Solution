"use client";
import React, { FC, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster, toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { baseUrl } from "@/lib/config";

import * as z from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";
import { CheckCheckIcon } from "lucide-react";
import type { TCategoriesData } from "@/types/newProducts";
import { cn } from "@/lib/utils";
import axios from "axios";
type TAddProductsFormProps = {
  imageIdArray: {
    id: string;
    url: string;
  }[];
  categoryData: TCategoriesData;
};

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Product name must be at least 2 characters long",
    })
    .max(50, {
      message: "Product name must be at most 50 characters long",
    }),
  imageId: z.string(),
  price: z.number().min(5, {
    message: "Product price must be at least 5€",
  }),
  description: z
    .string()
    .min(2, {
      message: "Product description must be at least 2 characters long",
    })
    .max(1000, {
      message: "Product description must be at most 500 characters long",
    }),
  quantity: z.number().min(5, {
    message: "Product quantity must be at least 5",
  }),
  categoryId: z.string().min(10, {
    message: "Product category must be at least 10 characters long",
  }),
  subCategoryId: z.string().min(10, {
    message: "Product subcategory must be at least 10 characters long",
  }),
});

const AddProductsForm: FC<TAddProductsFormProps> = ({
  imageIdArray,
  categoryData,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageId: "",
      price: 0,
      description: "",
      quantity: 0,
      categoryId: "",
      subCategoryId: "",
    },
  });

  const [showImages, setShowImages] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const [__, setSelectedCategoryId] = useState<string>("");
  const [filteredSubCategories, setFilteredSubCategories] = useState<
    typeof categoryData.subCategoriesData
  >([]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    form.setValue("categoryId", categoryId);
    const filteredSubs = categoryData.subCategoriesData.filter(
      (sub) => sub.categoryId === categoryId
    );
    setFilteredSubCategories(filteredSubs);
    form.setValue("subCategoryId", "");
  };

  const handleSubCategoryChange = (subCategoryId: string) => {
    form.setValue("subCategoryId", subCategoryId);
  };

  const toggleImageSelection = (id: string) => {
    setSelectedImage(id);
    form.setValue("imageId", id);
    setShowImages(false);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const url = `${baseUrl}/api/products`;

      const body = {
        name: values.name,
        description: values.description,
        price: values.price,
        quantity: values.quantity,
        categoryId: values.categoryId,
        subcategoryId: values.subCategoryId,
        imageId: values.imageId,
      };

      await axios.post(url, body);
      toast.success("Product added successfully!");
      form.reset();
    } catch (error) {
      toast.error(
        "There was an error while trying to add the product. Please try again later."
      );
      console.log(error);
    }
  }

  return (
    <>
      <Toaster richColors position="top-right" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Button className={cn("w-full z-50")} type="submit">
            Submit
          </Button>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Acme aPhone18" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Acme aPhone18" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value ?? ""} // Convert null or undefined to an empty string
                    onChange={(e) => {
                      // Check if the input is empty
                      if (e.target.value === "") {
                        field.onChange(null); // Keep it as null or you can use ''
                      } else {
                        field.onChange(Number(e.target.value));
                      }
                    }}
                    onBlur={field.onBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="quantity"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value ?? ""}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        field.onChange(null);
                      } else {
                        field.onChange(Number(e.target.value));
                      }
                    }}
                    onBlur={field.onBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="categoryId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      handleCategoryChange(value);
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger aria-label="Category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryData.categoriesData.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="subCategoryId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subcategory</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      handleSubCategoryChange(value);
                      field.onChange(value);
                    }}
                    disabled={filteredSubCategories.length === 0}
                  >
                    <SelectTrigger aria-label="Subcategory">
                      <SelectValue placeholder="Select a subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredSubCategories.map((subCategory) => (
                        <SelectItem key={subCategory.id} value={subCategory.id}>
                          {subCategory.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="imageId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Image</FormLabel>
                <FormControl>
                  <div>
                    <Button
                      type="button"
                      className={cn("w-full")}
                      onClick={() => setShowImages(!showImages)}
                    >
                      {showImages
                        ? "Close Image Selection"
                        : selectedImage
                        ? "Change Image"
                        : "Select Image"}
                    </Button>

                    {selectedImage && !showImages && (
                      <div className="mt-4">
                        <Image
                          src={
                            imageIdArray.find((img) => img.id === selectedImage)
                              ?.url || ""
                          }
                          width={300}
                          height={300}
                          alt="Selected Product"
                          className="rounded-xl"
                        />
                      </div>
                    )}

                    {showImages && (
                      <div className="grid grid-cols-4 gap-y-4 gap-x-4 mt-4">
                        {imageIdArray.map((imgId) => (
                          <div
                            className={`cursor-pointer relative hover:scale-105 transition-all ease-in-out ${
                              selectedImage === imgId.id
                                ? "border-4 border-green-400 rounded-2xl"
                                : ""
                            }`}
                            onClick={() => toggleImageSelection(imgId.id)}
                            key={imgId.id}
                          >
                            <Image
                              className="rounded-xl"
                              src={imgId.url}
                              width={300}
                              height={300}
                              alt="Product"
                            />
                            {selectedImage === imgId.id && (
                              <div className="absolute top-0 right-0 bg-green-400 p-1 rounded-xl">
                                <CheckCheckIcon size={24} />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};

export default AddProductsForm;
