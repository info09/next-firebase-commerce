import { ICategoryDb } from "../categories/type";
import { IAdminDb } from "../managers/type";
import { IDocDb } from "../type";

export interface ICreateInputProduct {
  name: string;
  slug: string;
  description: string;
  createdId: string;
  images: string[];
  categoryIds: string[];
  properties: Array<{
    name: string;
    color?: string;
    size?: string;
    price: number;
  }>;
  defaultPrice?: number;
}

export interface IProductDb
  extends Omit<ICreateInputProduct, "createdId" | "categoryIds">,
    IDocDb {
  created_by: IAdminDb;
  categories: ICategoryDb[];
}

export interface IProductDoc extends Omit<IProductDb, "id"> {}
