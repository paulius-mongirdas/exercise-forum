import axios from "axios";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import apiClient from "../../ApiClient";

interface DeleteCommentModalProps {
    isVisible: boolean;
    onClose: () => void;
    commentId: number;
    exerciseId: number;
    categoryId: number;
}

const DeleteCommentModal: React.FC<DeleteCommentModalProps> = ({ isVisible, onClose, commentId, exerciseId, categoryId }) => {
    const handleDelete = async () => {
        try {
            const response = await apiClient.delete(`/api/categories/${categoryId}/exercises/${exerciseId}/comments/${commentId}`, {
                headers: {
                    Authorization: localStorage.getItem('accessToken'),
                },
            });
            console.log('Response from server:', response.data);
            onClose();
            window.location.reload();
            localStorage.setItem("Status", "Comment deleted Successfully"); // Set the flag
        } catch (error) {
            console.error('Error deleting comment:', error);
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
                    Delete comment
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this comment?</p>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Modal.Body>
        </Modal>
    );
}
export default DeleteCommentModal;