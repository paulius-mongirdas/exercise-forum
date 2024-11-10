import { Comment } from '@prisma/client';
import { prisma } from '../../prisma/prisma'; // Importing the shared Prisma instance
import { CommentDto } from './commentDto';
import { ForbiddenError, NotFoundError } from '../errors';
export class CommentService {

    public async getComments(categoryId: number, exerciseId: number): Promise<Comment[]> {
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

        return await prisma.comment.findMany({
            where: { exerciseId: exerciseId }
        });
    }

    public async getComment(categoryId: number, exerciseId: number, commentId: number): Promise<Comment | null> {
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

        const comment = await prisma.comment.findUnique({
            where: {
                id: commentId,
                exerciseId: exerciseId
            }
        });
        if (!comment) {
            throw new NotFoundError(`Comment with id ${commentId} not found`);
        }

        return comment
    }

    public async createComment(categoryId: number, exerciseId: number, comment: CommentDto,  userId: string): Promise<Comment> {
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

        return await prisma.comment.create({
            data: {
                text: comment.text,
                exerciseId: exerciseId,
                userId: userId
            }
        });
    }

    public async updateComment(categoryId: number, exerciseId: number, commentId: number, commentData: CommentDto, userId: string, userRole: string): Promise<Comment | null> {
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

        const comment = await prisma.comment.findUnique({
            where: {
                id: commentId,
                exerciseId: exerciseId
            }
        });
        if (!comment) {
            throw new NotFoundError(`Comment with id ${commentId} not found`);
        }

        console.log("COMMENT:", comment.userId, userId)
        if (userRole !== "admin" && comment.userId !== userId) {
            throw new ForbiddenError("You are not authorized to update this comment");
        }

        return await prisma.comment.update({
            where: {
                id: commentId,
                exerciseId: exerciseId,
            },
            data: commentData,
        });
    }

    public async deleteComment(categoryId: number, exerciseId: number, commentId: number, userId: string, userRole: string): Promise<void> {
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

        const comment = await prisma.comment.findUnique({
            where: {
                id: commentId,
                exerciseId: exerciseId
            }
        });
        if (!comment) {
            throw new NotFoundError(`Comment with id ${commentId} not found`);
        }

        if (userRole !== "admin" && comment.userId !== userId) {
            throw new ForbiddenError("You are not authorized to update this comment");
        }

        await prisma.comment.delete({
            where: {
                id: commentId,
                exerciseId: exerciseId
            },
        });
    }
}