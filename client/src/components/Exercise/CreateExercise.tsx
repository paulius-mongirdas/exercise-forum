import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface CreateExerciseModalProps {
    isVisible: boolean;
    onClose: () => void;
    categoryId: number;
}

const CreateExerciseModal: React.FC<CreateExerciseModalProps> = ({ isVisible, onClose, categoryId }) => {
    const [formData, setFormData] = useState({
        title: '',
        difficulty: 'LIGHT',
        description: '',
        sets: 0,
        reps: 0,
        duration: 0,
        video_url: '',
    });
    const [hasSets, setHasSets] = useState(false);
    const [hasReps, setHasReps] = useState(false);

    const youtubeRegEx = new RegExp(/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|watch\?.+&v=))((\w|-){11})(?:\S+)?$/);
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState('');

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError(''); // Clear the error when user types
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
                const response = await axios.post(`http://localhost:8000/api/categories/${categoryId}/exercises`, {
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
                localStorage.setItem("Status", "Exercise added Successfully"); // Set the flag
            } catch (error) {
                console.error('Error submitting post:', error);
            }
        }
    };
    if (!isVisible) return null;

    return (
        <Modal
            size="lg"
            show={isVisible}
            onHide={onClose}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Create new exercise
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleExerciseSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label><b>Title</b></Form.Label>
                        <Form.Control required type="text" name="title" value={formData.title} onChange={handleTextChange} />
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
                    <Form.Group controlId="description">
                        <Form.Label><b>Description</b></Form.Label>
                        <Form.Control required as="textarea" rows={3} name="description" placeholder="Enter exercise description" value={formData.description} onChange={handleTextChange} />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="duration">
                        <Form.Label><b>Duration (minutes)</b></Form.Label>
                        <Form.Control required type="number" pattern="[0-9]*" min={1} inputMode="numeric" name="duration" value={formData.duration} onChange={handleTextChange} />
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
    )
}
export default CreateExerciseModal;