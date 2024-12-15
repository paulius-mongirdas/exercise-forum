import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import apiClient from "../../ApiClient";

interface CreateCommentModalProps {
    isVisible: boolean;
    onClose: () => void;
    categoryId: number;
    exerciseId: number;
}

const CreateCommentModal: React.FC<CreateCommentModalProps> = ({ isVisible, onClose, categoryId, exerciseId }) => {
    const [formData, setFormData] = useState({
        text: '',
    });

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        try {
            const response = await apiClient.post(`/api/categories/${categoryId}/exercises/${exerciseId}/comments`, {
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
            localStorage.setItem("Status", "Comment added Successfully"); // Set the flag
            alert("Comment added Successfully");
        } catch (error) {
            console.error('Error submitting post:', error);
            alert("Invalid Input. Please try again.");
        }
    };

    return (
        <Modal
        size="lg"
        show={isVisible}
        onHide={onClose}
        aria-labelledby="example-modal-sizes-title-lg"
        >
        <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
                Create new comment
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleCommentSubmit}>
                <Form.Group controlId="content">
                    <Form.Label><b>Text</b></Form.Label>
                    <Form.Control required as="textarea" name="text" value={formData.text} onChange={handleTextChange} />
                </Form.Group>
                <br />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Modal.Body>
        </Modal>
    );
};
export default CreateCommentModal;