import React, { useEffect, useState } from "react";
import ResponsiveNavbar from "../components/Navbar";
import axios from "axios";
import ExerciseListItem from "../components/Exercise/ExerciseListItem";
import { Button, Card, CardGroup, Col, ListGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Exercise from "./ExerciseExtd";
import CreateExerciseModal from "../components/Exercise/CreateExercise";
import DeleteExerciseModal from "../components/Exercise/DeleteExercise";
import EditExerciseModal from "../components/Exercise/EditExercise";
import Footer from "../components/Footer";
import apiClient from "../ApiClient";

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
            apiClient.get('/api/users/me', {
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
        apiClient.get('/api/categories/' + categoryID + '/exercises').then((response) => {
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
        apiClient.get('/api/categories/' + categoryID).then((response) => {
            setCategory(response.data.title);
        });
    }, []);

    return (
        <>
            <ResponsiveNavbar />
            <div className="container-box">
                <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
                <br />
                <br />
                <div className="container-row">
                    <h3>Exercises for {category}</h3>
                    {user && (
                        <Button variant="success" onClick={() => setShowCreateExercise(true)}>Create Exercise</Button>)}
                </div>
                <Row className="g-2">
                    {[...exercises].reverse().map((exercise, index) => (
                        <Col key={index} xs={12} sm={12} md={6} lg={4}>
                            <Card className="card-box h-100">
                                <Card.Body>
                                    <Card.Title>{exercise.title}</Card.Title>
                                    <Card.Text>{exercise.description}</Card.Text>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <b>Difficulty:</b> {exercise.difficulty}
                                        </ListGroup.Item>
                                        {exercise.sets > 0 && (
                                            <ListGroup.Item>
                                                <b>Sets:</b> {exercise.sets}
                                            </ListGroup.Item>
                                        )}
                                        {exercise.reps > 0 && (
                                            <ListGroup.Item>
                                                <b>Reps:</b> {exercise.reps}
                                            </ListGroup.Item>
                                        )}
                                        <ListGroup.Item>
                                            <b>Duration:</b> {exercise.duration} minutes
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                                <Card.Footer className="container-row">
                                    <Link to={`/api/categories/${exercise.categoryId}/exercises/${exercise.id}`}>
                                        <Button variant="secondary">View</Button>
                                    </Link>
                                    {user && (user.roleId > 1 || user.uuid === exercise.userId) && (
                                        <>
                                            <Button variant="warning" onClick={() => {
                                                setSelectedExercise(exercise);
                                                setShowEditExercise(true);
                                            }}>Edit</Button>
                                            <Button variant="danger" onClick={() => {
                                                setSelectedExercise(exercise);
                                                setShowDeleteExercise(true);
                                            }}>Delete</Button>
                                        </>)}
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
            {showCreateExercise && (
                <CreateExerciseModal isVisible={showCreateExercise}
                    onClose={() => setShowCreateExercise(false)} categoryId={categoryID} />
            )}
            {showDeleteExercise && selectedExercise && (
                <DeleteExerciseModal isVisible={showDeleteExercise}
                    onClose={() => setShowDeleteExercise(false)}
                    categoryId={selectedExercise.categoryId}
                    exerciseId={selectedExercise.id}
                    exerciseTitle={selectedExercise.title} />
            )}
            {showEditExercise && selectedExercise && (
                <EditExerciseModal isVisible={showEditExercise}
                    onClose={() => setShowEditExercise(false)}
                    exercise={selectedExercise} />
            )}
            <Footer />
        </>
    );
}
export default Exercises;