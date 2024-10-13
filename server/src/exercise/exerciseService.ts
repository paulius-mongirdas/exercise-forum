import { Exercise } from '@prisma/client';
import { prisma } from '../../prisma/prisma'; // Importing the shared Prisma instance
import { ExerciseDto } from './exerciseDto';
import { NotFoundError } from '../errors';

export class ExerciseService {

    public async getExercises(categoryId: number): Promise<Exercise[]> {
        const category = await prisma.category.findUnique({
            where: { id: categoryId }
        });
        if (!category) {
            throw new NotFoundError(`Category with id ${categoryId} not found`);
        }

        return await prisma.exercise.findMany({
            where: { categoryId: categoryId }
        });
    }

    public async getExercise(categoryId: number, exerciseId: number): Promise<Exercise | null> {
        const category = await prisma.category.findUnique({
            where: { id: categoryId }
        });
        if (!category) {
            throw new NotFoundError(`Category with id ${categoryId} not found`);
        }

        const exercise = await prisma.exercise.findUnique({
            where: { id: exerciseId }
        });
        if (!exercise) {
            throw new NotFoundError(`Exercise with id ${exerciseId} not found`);
        }

        return exercise
    }

    public async createExercise(categoryId: number, exerciseData: ExerciseDto): Promise<Exercise> {
        const category = await prisma.category.findUnique({
            where: { id: categoryId }
        });
        if (!category) {
            throw new NotFoundError(`Category with id ${categoryId} not found`);
        }

        return await prisma.exercise.create({
            data: {
                title: exerciseData.title,
                difficulty: exerciseData.difficulty,
                description: exerciseData.description,
                duration: exerciseData.duration,
                sets: exerciseData.sets,
                reps: exerciseData.reps,
                video_url: exerciseData.video_url,
                categoryId: categoryId
            }
        });
    }

    public async updateExercise(categoryId: number, exerciseId: number, exerciseData: ExerciseDto): Promise<Exercise | null> {
        const category = await prisma.category.findUnique({
            where: { id: categoryId }
        });
        if (!category) {
            throw new NotFoundError(`Category with id ${categoryId} not found`);
        }

        const _exercise = await prisma.exercise.findUnique({
            where: { id: exerciseId }
        });
        if (!_exercise) {
            throw new NotFoundError(`Exercise with id ${exerciseId} not found`);
        }

        return await prisma.exercise.update({
            where: {
                id: exerciseId,
                categoryId: categoryId
            },
            data: exerciseData,
        });
    }

    public async deleteExercise(categoryId: number, exerciseId: number): Promise<void> {
        const category = await prisma.category.findUnique({
            where: { id: categoryId }
        });
        if (!category) {
            throw new NotFoundError(`Category with id ${categoryId} not found`);
        }

        const _exercise = await prisma.exercise.findUnique({
            where: { id: exerciseId }
        });
        if (!_exercise) {
            throw new NotFoundError(`Exercise with id ${exerciseId} not found`);
        }
        
        await prisma.exercise.delete({
            where: {
                id: exerciseId,
                categoryId: categoryId
            },
        });
    }
}