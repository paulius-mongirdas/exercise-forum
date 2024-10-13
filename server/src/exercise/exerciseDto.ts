import { Difficulty } from '@prisma/client';

export interface ExerciseDto {
    /**
     * Title of an exercise
     */
    title: string;
    /**
     * Difficulty of an exercise (LIGHT, MODERATE, HARD, EXTREME)
     */
    difficulty: Difficulty;
    /**
     * Description for an exercise
     */
    description: string;
    /**
     * Duration for an exercise (minutes)
     */
    duration: number;
    /**
     * Number of sets for an exercise
     */
    sets?: number;
    /**
     * Number of repetitions for an exercise
     */
    reps?: number;
    /**
     * Video URL for visualizing an exercise
     */
    video_url?: string;
}