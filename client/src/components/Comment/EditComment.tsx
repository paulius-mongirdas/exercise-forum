import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";
import apiClient from "../../ApiClient";

interface EditCommentModalProps {
    isVisible: boolean;
    onClose: () => void;
    categoryId: number;
    comment: Comment;
}

interface Comment {
    id: number;
    userId: string;
    exerciseId: number;
    text: string;
}

const EditCommentModal: React.FC<EditCommentModalProps> = ({ isVisible, onClose, comment, categoryId }) => {
    const [formData, setFormData] = useState({
        text: comment.text,
    });

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        try {
            const response = await apiClient.put(`/api/categories/${categoryId}/exercises/${comment.exerciseId}/comments/${comment.id}`, {
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
            localStorage.setItem("Status", "Comment updated Successfully"); // Set the flag
            alert("Comment updated Successfully");
        } catch (error) {
            console.error('Error submitting post:', error);
            alert("Invalid input. Please try again.");
        }
    };

    return (
        <Modal show={isVisible} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleCommentSubmit}>
                    <Form.Group controlId="text">
                        <Form.Label>Text</Form.Label>
                        <Form.Control as="textarea" name="text" value={formData.text} onChange={handleTextChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
export default EditCommentModal;