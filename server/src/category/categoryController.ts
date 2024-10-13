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
  SuccessResponse,
} from "tsoa";
import { Category } from '@prisma/client';
import { CategoryService } from "./categoryService";
import { CategoryDto } from "./categoryDto";

@Route("api/categories")
export class CategoryController extends Controller {

  // GET /api/categories
  /**
   * Retrieves a list of existing categories
   */
  @Get()
  public async getCategories(): Promise<Category[]> {
    return new CategoryService().getCategories();
  }

  // GET /api/categories/{categoryId}
  /**
   * Retrieves details of a specific category
   */
  @Get("{categoryId}")
  public async getCategory(@Path() categoryId: number): Promise<Category | null> {
    return new CategoryService().getCategory(categoryId);
  }

  // POST /api/categories
  /**
   * Creates a new category
   */
  @SuccessResponse("201", "Created")
  @Post()
  public async createCategory(@Body() category: CategoryDto): Promise<Category> {
    return new CategoryService().createCategory(category);
  }

  // PUT /api/categories/{categoryId}
  /**
   * Updates an existing category
   */
  @Put("{categoryId}")
  public async updateCategory(@Path() categoryId: number, @Body() category: CategoryDto): Promise<Category | null> {
    return new CategoryService().updateCategory(categoryId, category);
  }

  // DELETE /api/categories/{categoryId}
  /**
   * Removes an existing category
   */
  @Delete("{categoryId}")
  public async deleteCategory(@Path() categoryId: number): Promise<void> {
    return new CategoryService().deleteCategory(categoryId);
  }
}