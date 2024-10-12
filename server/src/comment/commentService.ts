import { Comment } from '@prisma/client';
import { prisma } from '../../prisma/prisma'; // Importing the shared Prisma instance
import { CommentDto } from './commentDto';

export class CommentService {

    public async getComments(exerciseId: number): Promise<Comment[]> {
        return await prisma.comment.findMany({
            where: { exerciseId: exerciseId }
        });
    }

    public async getComment(exerciseId: number, commentId: number): Promise<Comment | null> {
        return await prisma.comment.findFirst({
            where: {
                id: commentId,
                exerciseId: exerciseId
            },
        });
    }

    public async createComment(exerciseId: number, comment: CommentDto): Promise<Comment> {
        return await prisma.comment.create({
            data: {
                text: comment.text,
                exerciseId: exerciseId
            }
        });
    }

    public async updateComment(exerciseId: number, commentId: number, comment: CommentDto): Promise<Comment | null> {
        return await prisma.comment.update({
            where: {
                id: commentId,
                exerciseId: exerciseId
            },
            data: comment,
        });
    }

    public async deleteComment(exerciseId: number, commentId: number): Promise<void> {
        await prisma.comment.delete({
            where: {
                id: commentId,
                exerciseId: exerciseId
            },
        });
    }
}