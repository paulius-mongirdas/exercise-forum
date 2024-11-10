import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Put,
  Delete,
  Route,
  SuccessResponse,
  Security,
  Request
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
   * @param categoryId ID of a category
   */
  @Get("{categoryId}")
  public async getCategory(@Path() categoryId: number): Promise<Category | null> {
    return new CategoryService().getCategory(categoryId);
  }

  // POST /api/categories
  /**
   * Creates a new category
   * @param category Data object describing a new category
   */
  @Security("jwt", ["admin"])
  @SuccessResponse("201", "Created")
  @Post()
  public async createCategory(@Body() category: CategoryDto, @Request() request: any): Promise<Category> {
    return new CategoryService().createCategory(category, request.userId);
  }

  // PUT /api/categories/{categoryId}
  /**
   * Updates an existing category
   * @param categoryId ID of a category
   * @param category Data object describing an updated category
   */
  @Security("jwt", ["admin"])
  @Put("{categoryId}")
  public async updateCategory(@Path() categoryId: number, @Body() category: CategoryDto): Promise<Category | null> {
    return new CategoryService().updateCategory(categoryId, category);
  }

  // DELETE /api/categories/{categoryId}
  /**
   * Removes an existing category
   * @param categoryId ID of a category
   */
  @Security("jwt", ["admin"])
  @Delete("{categoryId}")
  public async deleteCategory(@Path() categoryId: number): Promise<void> {
    return new CategoryService().deleteCategory(categoryId);
  }
}