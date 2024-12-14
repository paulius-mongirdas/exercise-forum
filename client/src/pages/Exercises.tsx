import React, { useEffect, useState } from "react";
import Nav from "../components/Navbar";
import axios from "axios";
import ExerciseListItem from "../components/Exercise/ExerciseListItem";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Exercise from "./ExerciseExtd";

interface Exercises {
    categoryID: number;
}

interface User {
    uuid: string;
    name: string;
    roleId: number;
}

const Exercises: React.FC<Exercises> = ({ categoryID }) => {
    const navigate = useNavigate();

    const [exercises, setExercises] = useState<ExerciseListItem[]>([]);
    const [category, setCategory] = useState<string>('');
    const [user, setUser] = useState<User | null>(null);
    const [showCreateExercise, setShowCreateExercise] = useState<boolean>(false);
    const [showDeleteExercise, setShowDeleteExercise] = useState<boolean>(false);
    const [showEditExercise, setShowEditExercise] = useState<boolean>(false);
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        if (accessToken !== null) {
            axios.get('http://localhost:8000/api/users/me', {
                headers: {
                    Authorization: `${accessToken}`
                }
            }).then((response) => {
                setUser(response.data);
            }).catch((error) => {
                // check if error is jwt expired
                console.log('Error:', error);
            });
        }
    }, []);

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
            <div className="container-box">
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...exercises].reverse().map((exercise, index) => {
                            return (
                                <tr key={index}>
                                    <td><Link to={"/api/categories/" + exercise.categoryId + "/exercises/" + exercise.id}>{exercise.title}</Link></td>
                                    <td>{exercise.difficulty}</td>
                                    <td>{exercise.duration} minutes</td>
                                    <td>{exercise.sets}</td>
                                    <td>{exercise.reps}</td>
                                    <td>{exercise.video_url !== null ? "video is provided" : "no video provided"} </td>
                                    {user && (user.roleId > 1 || user.uuid === exercise.userId) && (
                                        <td>
                                            <div className="container-row" >
                                                <Button onClick={() => {
                                                    setSelectedExercise(exercise);
                                                    setShowEditExercise(true);
                                                }}>Edit</Button>
                                                <Button onClick={() => {
                                                    setSelectedExercise(exercise);
                                                    setShowDeleteExercise(true);
                                                }}>Delete</Button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default Exercises;