import { Difficulty } from '@prisma/client';
import { IsString, IsNumber } from 'class-validator';

export class ExerciseDto {
    @IsString()
    title: string;

    difficulty: Difficulty;

    @IsString()
    description: string;

    @IsNumber()
    duration: number;

    @IsNumber()
    sets?: number;

    @IsNumber()
    reps?: number;

    @IsString()
    video_url?: string;

    @IsNumber()
    categoryId: number; // remove maybe? as it gets passed by path anyway
}