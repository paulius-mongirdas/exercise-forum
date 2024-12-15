import React, { useEffect, useState } from "react";
import Exercise from "../../pages/ExerciseExtd";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";

interface EditExerciseModalProps {
    isVisible: boolean;
    onClose: () => void;
    exercise: Exercise;
}

const EditExerciseModal: React.FC<EditExerciseModalProps> = ({ isVisible, onClose, exercise }) => {
    const [formData, setFormData] = useState({
        title: exercise.title,
        description: exercise.description,
        difficulty: exercise.difficulty,
        sets: exercise.sets,
        reps: exercise.reps,
        duration: exercise.duration,
        video_url: exercise.video_url
    });

    const [hasSets, setHasSets] = useState(formData.sets > 0);
    const [hasReps, setHasReps] = useState(formData.reps > 0);

    const youtubeRegEx = new RegExp(/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|watch\?.+&v=))((\w|-){11})(?:\S+)?$/);
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState('');

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        if (name === "hasSets") {
            setHasSets(checked);
            if (!checked) setFormData((prev) => ({ ...prev, sets: 0 })); // Clear field when unchecked
        } else if (name === "hasReps") {
            setHasReps(checked);
            if (!checked) setFormData((prev) => ({ ...prev, reps: 0 })); // Clear field when unchecked
        }
    };

    const handleExerciseSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        if (formData.video_url && !youtubeRegEx.test(formData.video_url)) {
            setError('Please provide a valid YouTube URL.');
            setValidated(false);
        }
        else {
            setError('');
            setValidated(true);
            try {
                const response = await axios.put(`http://localhost:8000/api/categories/${exercise.categoryId}/exercises/${exercise.id}`, {
                    title: formData.title,
                    difficulty: formData.difficulty,
                    description: formData.description,
                    sets: formData.sets,
                    reps: formData.reps,
                    duration: formData.duration,
                    video_url: formData.video_url
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('accessToken'),
                    },
                });
                onClose();
                window.location.reload();
                console.log('Response from server:', response.data);
                localStorage.setItem("Status", "Exercise updated Successfully"); // Set the flag
            } catch (error) {
                console.error('Error submitting post:', error);
            }
        }
    };
    if (!isVisible) return null; // Don't render if not visible

    return (
        <Modal show={isVisible} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit exercise</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleExerciseSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label><b>Title</b></Form.Label>
                        <Form.Control required type="text" name="title" value={formData.title} onChange={handleTextChange} />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="description">
                        <Form.Label><b>Description</b></Form.Label>
                        <Form.Control required as="textarea" rows={3} name="description" placeholder="Enter exercise description" value={formData.description} onChange={handleTextChange} />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="difficulty">
                        <Form.Label><b>Difficulty</b></Form.Label>
                        <Form.Select required name="difficulty" value={formData.difficulty} onChange={handleSelectChange}>
                            <option value="LIGHT">Light</option>
                            <option value="MODERATE">Moderate</option>
                            <option value="HARD">Hard</option>
                            <option value="EXTREME">Extreme</option>
                        </Form.Select>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="duration">
                        <Form.Label><b>Duration (minutes)</b></Form.Label>
                        <Form.Control required type="text" name="duration" value={formData.duration} onChange={handleTextChange} />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="hasSets">
                        <Form.Check
                            type="checkbox"
                            label="Has Sets"
                            name="hasSets"
                            checked={hasSets}
                            onChange={handleCheckboxChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="sets">
                        <Form.Label><b>Sets</b></Form.Label>
                        <Form.Control disabled={!hasSets} type="number" name="sets" pattern="[0-9]*" min={1} inputMode="numeric" value={formData.sets} onChange={handleTextChange} />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="hasReps">
                        <Form.Check
                            type="checkbox"
                            label="Has Reps"
                            name="hasReps"
                            checked={hasReps}
                            onChange={handleCheckboxChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="reps">
                        <Form.Label><b>Reps</b></Form.Label>
                        <Form.Control disabled={!hasReps} type="number" name="reps" pattern="[0-9]*" min={1} inputMode="numeric" value={formData.reps} onChange={handleTextChange} />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="video_url">
                        <Form.Label><b>YouTube video URL</b></Form.Label>
                        <Form.Control type="text" isInvalid={!!error} name="video_url" value={formData.video_url} onChange={handleTextChange} />
                        <Form.Control.Feedback type="invalid">
                            {error}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br />
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
export default EditExerciseModal;
