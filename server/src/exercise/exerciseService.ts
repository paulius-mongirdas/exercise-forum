import { Exercise } from '@prisma/client';
import { prisma } from '../../prisma/prisma'; // Importing the shared Prisma instance
import { ExerciseDto } from './exerciseDto';
import { ForbiddenError, NotFoundError } from '../errors';
import { ValidateError } from 'tsoa';

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
            where: {
                id: exerciseId,
                categoryId: categoryId
            }
        });
        if (!exercise) {
            throw new NotFoundError(`Exercise with id ${exerciseId} not found`);
        }

        return exercise
    }

    public async createExercise(categoryId: number, exerciseData: ExerciseDto, userId: string): Promise<Exercise> {
        const category = await prisma.category.findUnique({
            where: { id: categoryId }
        });
        if (!category) {
            throw new NotFoundError(`Category with id ${categoryId} not found`);
        }

        const youtubeRegex = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (exerciseData.video_url && !youtubeRegex.test(exerciseData.video_url)) {
            throw new ValidateError({  "video_url": {
                "message": "Please provide a valid YouTube URL. Otherwise, leave the field empty.",
                "value": `${exerciseData.video_url}` // the invalid phone number value
              }}, "Please provide a valid YouTube URL. Otherwise, leave the field empty.");
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
                categoryId: categoryId,
                userId: userId
            }
        });
    }

    public async updateExercise(categoryId: number, exerciseId: number, exerciseData: ExerciseDto, userId: string, userRole: string): Promise<Exercise | null> {
        const category = await prisma.category.findUnique({
            where: { id: categoryId }
        });
        if (!category) {
            throw new NotFoundError(`Category with id ${categoryId} not found`);
        }

        const _exercise = await prisma.exercise.findUnique({
            where: {
                id: exerciseId,
                categoryId: categoryId
            }
        });
        if (!_exercise) {
            throw new NotFoundError(`Exercise with id ${exerciseId} not found`);
        }

        if (userRole !== "admin" && _exercise.userId !== userId) {
            throw new ForbiddenError("You are not authorized to update this exercise");
        }

        const youtubeRegex = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (exerciseData.video_url && !youtubeRegex.test(exerciseData.video_url)) {
            throw new ValidateError({  "video_url": {
                "message": "Please provide a valid YouTube URL. Otherwise, leave the field empty.",
                "value": `${exerciseData.video_url}` // the invalid phone number value
              }}, "Please provide a valid YouTube URL. Otherwise, leave the field empty.");
        }

        return await prisma.exercise.update({
            where: {
                id: exerciseId,
                categoryId: categoryId
            },
            data: exerciseData,
        });
    }

    public async deleteExercise(categoryId: number, exerciseId: number, userId: string, userRole: string): Promise<void> {
        const category = await prisma.category.findUnique({
            where: { id: categoryId }
        });
        if (!category) {
            throw new NotFoundError(`Category with id ${categoryId} not found`);
        }

        const _exercise = await prisma.exercise.findUnique({
            where: {
                id: exerciseId,
                categoryId: categoryId
            }
        });
        if (!_exercise) {
            throw new NotFoundError(`Exercise with id ${exerciseId} not found`);
        }

        if (userRole !== "admin" && _exercise.userId !== userId) {
            throw new ForbiddenError("You are not authorized to update this exercise");
        }

        await prisma.exercise.delete({
            where: {
                id: exerciseId,
                categoryId: categoryId
            },
        });
    }
}