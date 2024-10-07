import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Put,
  Delete,
  //Query,
  Route,
  //SuccessResponse,
} from "tsoa";
//import { Category } from "./categoryDto";
//import { CategoryService, CategoryCreationParams } from "./categoryService";
import { prisma } from '../prisma'; // Importing the shared Prisma instance
import { Category } from '@prisma/client';

@Route("api/categories")
export class CategoryController extends Controller {
  // GET /api/categories
  @Get()
  public async getCategories(): Promise<Category[]> {
    return await prisma.category.findMany();
  }

  // GET /api/categories/{categoryId}
  @Get("{categoryId}")
  public async getCategory(@Path() categoryId: number): Promise<Category | null> {
    return await prisma.category.findUnique({
      where: { id: categoryId },
    });
  }

  // POST /api/categories
  @Post()
  public async createCategory(@Body() category: Category): Promise<Category> {
    return await prisma.category.create({
      data: category,
    });
  }

  // PUT /api/categories/{categoryId}
  @Put("{categoryId}")
  public async updateCategory(@Path() categoryId: number, @Body() category: Partial<Category>): Promise<Category | null> {
    return await prisma.category.update({
      where: { id: categoryId },
      data: category,
    });
  }

  // DELETE /api/categories/{categoryId}
  @Delete("{categoryId}")
  public async deleteCategory(@Path() categoryId: number): Promise<void> {
    await prisma.category.delete({
      where: { id: categoryId },
    });
  }
}