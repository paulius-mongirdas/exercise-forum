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
  @Get()
  public async getComments(@Path() exerciseId: number): Promise<Comment[]> {
    return new CommentService().getComments(exerciseId);
  }

  // GET /api/categories/{categoryId}/exercises/{exerciseId}/comments/{commentId}
  @Get("{commentId}")
  public async getComment(@Path() exerciseId: number, @Path() commentId: number): Promise<Comment | null> {
    return new CommentService().getComment(exerciseId, commentId);
  }

  // POST /api/categories/{categoryId}/exercises/{exerciseId}/comments
  @SuccessResponse("201", "Created")
  @Post()
  public async createComment(@Path() exerciseId: number, @Body() comment: CommentDto): Promise<Comment> {
    return new CommentService().createComment(exerciseId, comment);
  }

  // PUT /api/categories/{categoryId}/exercises/{exerciseId}/comments/{commentId}
  @Put("{commentId}")
  public async updateComment(@Path() exerciseId: number, @Path() commentId: number, @Body() comment: CommentDto): Promise<Comment | null> {
    return new CommentService().updateComment(exerciseId, commentId, comment);
  }

  // DELETE /api/categories/{categoryId}/exercises/{exerciseId}/comments/{commentId}
  @Delete("{commentId}")
  public async deleteComment(@Path() exerciseId: number, @Path() commentId: number): Promise<void> {
    return new CommentService().deleteComment(exerciseId, commentId);
  }
}