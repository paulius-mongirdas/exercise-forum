import axios from "axios";
import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import apiClient from "../../ApiClient";

interface CreateCategoryModalProps {
    isVisible: boolean;
    onClose: () => void;
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({ isVisible, onClose }) => {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [refreshing, setRefresh] = useState(false);

    const handleCategorySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        try {
            const response = await apiClient.post('/api/categories', {
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
            setRefresh(true);
            localStorage.setItem("Status", "Category added Successfully"); // Set the flag
        } catch (error) {
            console.error('Error submitting post:', error);
        }
    };
    if (!isVisible) return null; // Don't render if not visible

    return (
        <Modal
            size="lg"
            show={isVisible}
            onHide={onClose}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Create new category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleCategorySubmit}>
                    <Form.Group controlId="title">
                        <Form.Label><b>Title:</b></Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={formData.title}
                            name="title"
                            placeholder="Enter category title"
                            onChange={handleTextChange}
                        >
                        </Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="description">
                        <Form.Label><b>Description:</b></Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" placeholder="Enter category description" value={formData.description} onChange={handleTextChange} />
                    </Form.Group>
                    <br />
                    <Button variant="success" type="submit" className="float-right" style={{ height: '35px' }}>
                        Create
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default CreateCategoryModal;