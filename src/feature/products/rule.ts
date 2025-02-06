import { z } from "zod";

export const AddProductSchema = z.object({
  name: z
    .string({ required_error: "Product name is required" })
    .min(1, "Product name is required"),
  slug: z.string().min(1, "Product slug is required"),
  description: z.string().min(1, "Product description is required"),
  createdId: z
    .string({ required_error: "manager id is required" })
    .min(1, "manager id is required"),
  categoryIds: z.array(z.string()),
  images: z.array(z.string()),
  properties: z
    .array(
      z.object({
        name: z.string(),
        color: z.string().optional(),
        size: z.string().optional(),
        price: z.number(),
      })
    )
    .optional(),
  defaultPrice: z.number().optional(),
});
