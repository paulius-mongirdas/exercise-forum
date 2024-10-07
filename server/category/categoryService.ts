//import { Category } from "./categoryDto";
import { PrismaClient, Category } from '@prisma/client';

// move to singleton later

// A post request should not contain an id.
export type CategoryCreationParams = Pick<Category, "title" | "description" | "image_url">;

export class CategoryService {
  public get(id: number, title?: string): Category {
    return {
      id,
      title: title ?? "",
      description: "",
      image_url: "",
    };
  }

  public create(categoryCreationParams: CategoryCreationParams): Category {
    return {
      id: Math.floor(Math.random() * 10000), // Random
      ...categoryCreationParams,
    };
  }
}