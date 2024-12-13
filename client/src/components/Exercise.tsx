import axios from "axios";
import React, { useEffect, useState } from "react";
import Nav from "./Navbar";
import Comment from "./Comment";

interface ExerciseWrapper {
    id: number;
    categoryId: number;
}

interface Exercise {
    id: number;
    userId: string;
    categoryId: number;
    title: string;
    difficulty: string;
    description: string;
    sets: number;
    reps: number;
    duration: number;
    video_url: string;
}

const Exercise: React.FC<ExerciseWrapper> = ({ id, categoryId }) => {
    const [exercise, setExercise] = useState<Exercise>({
        id: 0,
        userId: '',
        categoryId: 0,
        title: '',
        difficulty: '',
        description: '',
        sets: 0,
        reps: 0,
        duration: 0,
        video_url: ''
    });

    useEffect(() => {
        axios.get('http://localhost:8000/api/categories/' + categoryId + '/exercises/' + id).then((response) => {
            const exercise = response.data;
            setExercise(exercise);
        })
    }, []);

    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/categories/' + categoryId + '/exercises/' + id + '/comments').then((response) => {
            const comments = response.data.map((comment: Comment) => ({
                id: comment.id,
                userId: comment.userId,
                exerciseId: comment.exerciseId,
                text: comment.text
            }));
            setComments(comments);
        });
    }, []);

    return (
        <>
            <Nav />
            <div className="home-container">
                <h1>{exercise.title}</h1>
                <p>{exercise.description}</p>
                <p><b>Difficulty:</b> {exercise.difficulty}</p>
                <p><b>Duration:</b> {exercise.duration}</p>
                <p><b>Sets:</b> {exercise.sets}</p>
                <p><b>Reps:</b> {exercise.reps}</p>
                <p><b>Video:</b> {exercise.video_url}</p>
                <br />
                <h2>Comments</h2>
                {[...comments].reverse().map((comment, index) => {
                    return (
                        <Comment key={index} id={comment.id} userId={comment.userId} exerciseId={comment.exerciseId} text={comment.text}/>
                    );
                })}

            </div>
        </>
    )
}

export default Exercise;