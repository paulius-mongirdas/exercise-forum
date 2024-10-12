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
import { Exercise } from '@prisma/client';
import { ExerciseService } from "./exerciseService";
import { ExerciseDto } from "./exerciseDto";

@Route("api/categories/{categoryId}/exercises")
export class ExerciseController extends Controller {

  // GET api/categories/{categoryId}/exercises
  @Get()
  public async getExercises(@Path() categoryId: number): Promise<Exercise[]> {
    return new ExerciseService().getExercises(categoryId);
  }

  // GET /api/categories/{categoryId}/exercises/{exerciseId}
  @Get("{exerciseId}")
  public async getExercise(@Path() categoryId: number, @Path() exerciseId: number): Promise<Exercise | null> {
    return new ExerciseService().getExercise(categoryId, exerciseId);
  }

  // POST /api/categories/{categoryId}/exercises
  @SuccessResponse("201", "Created")
  @Post()
  public async createExercise(@Path() categoryId: number, @Body() exercise: ExerciseDto): Promise<Exercise> {
    return new ExerciseService().createExercise(categoryId, exercise);
  }

  // PUT /api/categories/{categoryId}/exercises/{exerciseId}
  @Put("{exerciseId}")
  public async updateExercise(@Path() categoryId: number, @Path() exerciseId: number, @Body() exercise: ExerciseDto): Promise<Exercise | null> {
    return new ExerciseService().updateExercise(categoryId, exerciseId, exercise);
  }

  // DELETE /api/categories/{categoryId}/exercises/{exerciseId}
  @Delete("{exerciseId}")
  public async deleteExercise(@Path() categoryId: number, @Path() exerciseId: number): Promise<void> {
    return new ExerciseService().deleteExercise(categoryId, exerciseId);
  }
}