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
  SuccessResponse
} from "tsoa";
import { Comment } from '@prisma/client';
import { CommentService } from "./commentService";
import { CommentDto } from "./commentDto";

@Route("api/categories/{categoryId}/exercises/{exerciseId}/comments")
export class CommentController extends Controller {

  // GET api/categories/{categoryId}/exercises/{exerciseId}/comments
  /**
   * Retrieves a list of existing comments from an exercise
   * @param categoryId ID of a category that exercise links to
   * @param exerciseId ID of an exercise that comment links to
   */
  @Get()
  public async getComments(@Path() categoryId: number, @Path() exerciseId: number): Promise<Comment[]> {
    return new CommentService().getComments(categoryId, exerciseId);
  }

  // GET /api/categories/{categoryId}/exercises/{exerciseId}/comments/{commentId}
  /**
   * Retrieves details of a specific comment from an exercise
   * @param categoryId ID of a category that exercise links to
   * @param exerciseId ID of an exercise that comment links to
   * @param commentId ID of a comment
   */
  @Get("{commentId}")
  public async getComment(@Path() categoryId: number, @Path() exerciseId: number, @Path() commentId: number): Promise<Comment | null> {
    return new CommentService().getComment(categoryId, exerciseId, commentId);
  }

  // POST /api/categories/{categoryId}/exercises/{exerciseId}/comments
  /**
   * Creates a new comment for an exercise
   * @param categoryId ID of a category that exercise links to
   * @param exerciseId ID of an exercise that comment links to
   * @param comment Data object describing a new comment
   */
  @SuccessResponse("201", "Created")
  @Post()
  public async createComment(@Path() categoryId: number, @Path() exerciseId: number, @Body() comment: CommentDto): Promise<Comment> {
    return new CommentService().createComment(categoryId, exerciseId, comment);
  }

  // PUT /api/categories/{categoryId}/exercises/{exerciseId}/comments/{commentId}
  /**
   * Updates an existing comment of an exercise
   * @param categoryId ID of a category that exercise links to
   * @param exerciseId ID of an exercise that comment links to
   * @param commentId ID of a comment
   * @param comment Data object describing an updated comment
   */
  @Put("{commentId}")
  public async updateComment(@Path() categoryId: number, @Path() exerciseId: number, @Path() commentId: number, @Body() comment: CommentDto): Promise<Comment | null> {
    return new CommentService().updateComment(categoryId, exerciseId, commentId, comment);
  }

  // DELETE /api/categories/{categoryId}/exercises/{exerciseId}/comments/{commentId}
  /**
   * Deletes an existing comment of an exercise
   * @param categoryId ID of a category that exercise links to
   * @param exerciseId ID of an exercise that comment links to
   * @param commentId ID of a comment
   */
  @Delete("{commentId}")
  public async deleteComment(@Path() categoryId: number, @Path() exerciseId: number, @Path() commentId: number): Promise<void> {
    return new CommentService().deleteComment(categoryId, exerciseId, commentId);
  }
}