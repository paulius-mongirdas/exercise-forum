import { Exercise } from '@prisma/client';
import { prisma } from '../prisma'; // Importing the shared Prisma instance
import { ExerciseDto } from './exerciseDto';

export class ExerciseService {

    public async getExercises(categoryId: number): Promise<Exercise[]> {
        return await prisma.exercise.findMany({
            where: { categoryId: categoryId }
        });
    }

    public async getExercise(categoryId: number, exerciseId: number): Promise<Exercise | null> {
        return await prisma.exercise.findFirst({
            where: {
                id: exerciseId,
                categoryId: categoryId
            },
        });
    }

    public async createExercise(exercise: ExerciseDto): Promise<Exercise> {
        return await prisma.exercise.create({
            data: exercise,
        });
    }

    public async updateExercise(exerciseId: number, exercise: Partial<ExerciseDto>): Promise<Exercise | null> {
        return await prisma.exercise.update({
            where: { id: exerciseId },
            data: exercise,
        });
    }

    public async deleteExercise(exerciseId: number): Promise<void> {
        await prisma.exercise.delete({
            where: { id: exerciseId },
        });
    }
}