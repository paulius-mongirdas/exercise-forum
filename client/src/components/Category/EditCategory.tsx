import axios from "axios";
import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import Category from "./CategoryListItem";

interface EditCategoryModalProps {
    isVisible: boolean;
    onClose: () => void;
    category: Category;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({ isVisible, onClose, category }) => {
    const [formData, setFormData] = useState({
        title: category.title,
        description: category.description,
    });

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCategorySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        try {
            const response = await axios.put(`http://localhost:8000/api/categories/${category.id}`, {
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
            localStorage.setItem("Status", "Category updated Successfully"); // Set the flag
        } catch (error) {
            console.error('Error submitting post:', error);
        }
    };
    if (!isVisible) return null; // Don't render if not visible

    return (
        <Modal show={isVisible} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleCategorySubmit}>
                    <Form.Group controlId="formBasicTitle">
                        <Form.Label><b>Title</b></Form.Label>
                        <Form.Control required type="text" name="title" value={formData.title} onChange={handleTextChange} />
                    </Form.Group>
                    <br/>
                    <Form.Group controlId="formBasicDescription">
                        <Form.Label><b>Description</b></Form.Label>
                        <Form.Control required as="textarea" rows={3} name="description" placeholder="Enter category description" value={formData.description} onChange={handleTextChange} />
                    </Form.Group>
                    <br/>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};
export default EditCategoryModal;