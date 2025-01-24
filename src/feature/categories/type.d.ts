import { IDocDb } from "../type";

export interface ICreateCategoryInput {
  name: string;
  slug: string;
  description: string;
  image?: string[];
}

export interface ICategoryDb extends ICreateCategoryInput, IDocDb {}
export interface ICategoryDoc
  extends ICreateCategoryInput,
    Omit<IDocDb, "id"> {}

export interface IGetCategoryInput {
  keyword: string;
  page: number;
  size?: number;
  orderField: string;
  orderType: "asc" | "desc";
}
