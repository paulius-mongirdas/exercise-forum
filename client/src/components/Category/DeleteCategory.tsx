import axios from "axios";
import React from "react";
import { Modal, Button } from "react-bootstrap";
import apiClient from "../../ApiClient";

interface DeleteCategoryModalProps {
    isVisible: boolean;
    onClose: () => void;
    categoryId: number;
    categoryTitle: string;
}

const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({ isVisible, onClose, categoryId, categoryTitle }) => {
    const handleDelete = async () => {
        try {
            const response = await apiClient.delete(`/api/categories/${categoryId}`, {
                headers: {
                    Authorization: localStorage.getItem('accessToken'),
                },
            });
            console.log('Response from server:', response.data);
            onClose();
            window.location.reload();
            localStorage.setItem("Status", "Category deleted Successfully"); // Set the flag
            alert("Category deleted Successfully");
        } catch (error) {
            console.error('Error deleting category:', error);
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
                    Delete category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete the category: <b>{categoryTitle}</b>?</p>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Modal.Body>
        </Modal>
    );
};
export default DeleteCategoryModal;