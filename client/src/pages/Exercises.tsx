import React, { useEffect, useState } from "react";
import Nav from "../components/Navbar";
import axios from "axios";
import ExerciseListItem from "../components/Exercise/ExerciseListItem";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface Exercises {
    categoryID: number;
}

const Exercises: React.FC<Exercises> = ({categoryID}) => {
    const navigate = useNavigate();
    
    const [exercises, setExercises] = useState<ExerciseListItem[]>([]);
    const [category, setCategory] = useState<string>('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/categories/' + categoryID + '/exercises').then((response) => {
            const exercises = response.data.map((exercise: ExerciseListItem) => ({
                id: exercise.id,
                userId: exercise.userId,
                categoryId: exercise.categoryId,
                title: exercise.title,
                difficulty: exercise.difficulty,
                description: exercise.description,
                sets: exercise.sets,
                reps: exercise.reps,
                duration: exercise.duration,
                video_url: exercise.video_url
            }));
            setExercises(exercises);
        });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/api/categories/' + categoryID).then((response) => {
            setCategory(response.data.title);
        });
    }, []);

return (
    <>
        <Nav />
        <Button onClick={() => navigate(-1)}>Back</Button>
        <div className="home-container">
        <h1>Exercises for {category}</h1>
        <table className="table table-bordered table-responsive">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Difficulty</th>
                    <th>Duration</th>
                    <th>Sets</th>
                    <th>Reps</th>
                    <th>Video</th>
                </tr>
            </thead>
            <tbody>
                {[...exercises].reverse().map((exercise, index) => {
                    return (
                        <ExerciseListItem key={index} id={exercise.id} title={exercise.title} description={exercise.description} userId={exercise.userId}
                        categoryId={exercise.categoryId} difficulty={exercise.difficulty} duration={exercise.duration} sets={exercise.sets} reps={exercise.reps}
                        video_url={exercise.video_url}/>
                    );
                })}
            </tbody>
        </table>
        </div>
    </>
);
}
export default Exercises;