"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "learning/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "learning/components/ui/form";
import { Input } from "learning/components/ui/input";
import MultiSelectFormField from "learning/components/ui/multi-select";
import { BASE_URL } from "learning/constants/common";
import { ICategoryDb } from "learning/feature/categories/type";
import { AddProductSchema } from "learning/feature/products/rule";
import { ICreateInputProduct } from "learning/feature/products/type";
import { IPaginationRes } from "learning/feature/type";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Upload from "./upload";

interface IProps {
  data?: ICreateInputProduct;
  onSubmit: (data: ICreateInputProduct) => void;
}
const FormProduct = ({ data, onSubmit }: IProps) => {
  const [categories, setCategories] = useState<ICategoryDb[]>([]);
  const fetchCategories = async (keyword: string) => {
    await fetch(`${BASE_URL}/api/admin/categories?keyword=${keyword}`)
      .then((res) => res.json())
      .then((data: IPaginationRes<ICategoryDb>) => setCategories(data.data));
  };
  const form = useForm<ICreateInputProduct>({
    resolver: zodResolver(AddProductSchema),
    defaultValues: { ...data, createdId: "chKXcoQZ8Rv2GDGV0woW" },
  });

  useEffect(() => {
    fetchCategories("");
  }, []);
  return (
    <div>
      <Form {...form}>
        <form
          className="grid grid-cols-2 gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product name</FormLabel>
                <FormControl>
                  <Input placeholder="Product name" {...field} />
                </FormControl>
                <FormDescription>This is product display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product slug</FormLabel>
                <FormControl>
                  <Input placeholder="Product slug" {...field} />
                </FormControl>
                <FormDescription>
                  This is Product slug (using for url).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product description</FormLabel>
                <FormControl>
                  <Input placeholder="Product description" {...field} />
                </FormControl>
                <FormDescription>This is Product description.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="defaultPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product default Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Product default Price"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  This is Product default Price.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product categories</FormLabel>
                <FormControl>
                  <MultiSelectFormField
                    placeholder="Select Category"
                    onValueChange={(ids) => field.onChange(ids)}
                    options={categories.map((category) => ({
                      label: category.name,
                      value: category.id,
                    }))}
                  />
                </FormControl>
                <FormDescription>This is Product Categories.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product categories</FormLabel>
                <FormControl>
                  <Upload onChange={(images) => field.onChange(images)} />
                </FormControl>
                <FormDescription>This is Product Categories.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={!form.formState.isValid}>
            Add Product
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormProduct;
