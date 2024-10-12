import { Exercise } from '@prisma/client';
import { prisma } from '../../prisma/prisma'; // Importing the shared Prisma instance
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

    public async createExercise(categoryId: number, exercise: ExerciseDto): Promise<Exercise> {
        return await prisma.exercise.create({
            data: {
                title: exercise.title,
                difficulty: exercise.difficulty,
                description: exercise.description,
                duration: exercise.duration,
                sets: exercise.sets,
                reps: exercise.reps,
                video_url: exercise.video_url,
                categoryId: categoryId
            }
        });
    }

    public async updateExercise(categoryId: number, exerciseId: number, exercise: ExerciseDto): Promise<Exercise | null> {
        return await prisma.exercise.update({
            where: {
                id: exerciseId,
                categoryId: categoryId
            },
            data: exercise,
        });
    }

    public async deleteExercise(categoryId: number, exerciseId: number): Promise<void> {
        await prisma.exercise.delete({
            where: {
                id: exerciseId,
                categoryId: categoryId
            },
        });
    }
}