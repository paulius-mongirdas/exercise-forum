import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { set } from "store";

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

    const youtubeRegEx = new RegExp(/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|watch\?.+&v=))((\w|-){11})(?:\S+)?$/);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const validateYoutubeUrl = () => {
        return youtubeRegEx.test(formData.video_url);
    }

    const handleExerciseSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        if (formData.video_url !== "" && !validateYoutubeUrl()) {
            // TODO : use toast to show error message
            console.log('Invalid YouTube URL');
        }
        else {
            try {
                const response = await axios.post(`http://localhost:8000/api/categories/${categoryId}/exercises`, {
                    ...formData,
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
                    <Form.Group controlId="sets">
                        <Form.Label><b>Sets</b></Form.Label>
                        <Form.Control required type="number" name="sets" value={formData.sets} onChange={handleTextChange} />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="reps">
                        <Form.Label><b>Reps</b></Form.Label>
                        <Form.Control required type="number" name="reps" value={formData.reps} onChange={handleTextChange} />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="duration">
                        <Form.Label><b>Duration</b></Form.Label>
                        <Form.Control required type="number" name="duration" value={formData.duration} onChange={handleTextChange} />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="video_url">
                        <Form.Label><b>YouTube video URL</b></Form.Label>
                        <Form.Control type="text" name="video_url" value={formData.video_url} onChange={handleTextChange} />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid YouTube URL.
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