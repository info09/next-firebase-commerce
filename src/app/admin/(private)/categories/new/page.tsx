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
import { AddCategorySchema } from "learning/feature/categories/rule";
import { ICreateCategoryInput } from "learning/feature/categories/type";
import React from "react";
import { useForm } from "react-hook-form";
import { onAddCategory } from "./action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const form = useForm<ICreateCategoryInput>({
    resolver: zodResolver(AddCategorySchema),
  });
  const onSubmit = async ({
    name,
    description,
    slug,
  }: ICreateCategoryInput) => {
    try {
      await onAddCategory({ name, description, slug });
      toast.info("Add category success!");
      router.push("/admin/categories");
    } catch (error) {
      console.log("🚀 ~ page ~ error:", error);
      toast.error("Cannot add category");
    }
  };
  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category name</FormLabel>
                <FormControl>
                  <Input placeholder="category 1" {...field} />
                </FormControl>
                <FormDescription>
                  This is category display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category slug</FormLabel>
                <FormControl>
                  <Input placeholder="category slug" {...field} />
                </FormControl>
                <FormDescription>
                  This is category slug (using for url).
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
                <FormLabel>Category description</FormLabel>
                <FormControl>
                  <Input placeholder="category description" {...field} />
                </FormControl>
                <FormDescription>This is category description.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!form.formState.isValid}>
            Add category
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default page;
