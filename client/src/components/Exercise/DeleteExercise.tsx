import React from "react";
import { Button, Modal } from "react-bootstrap";
import apiClient from "../../ApiClient";

interface DeleteExerciseModalProps {
    isVisible: boolean;
    onClose: () => void;
    categoryId: number;
    exerciseId: number;
    exerciseTitle: string;
}

const DeleteExerciseModal: React.FC<DeleteExerciseModalProps> = ({ isVisible, onClose, categoryId, exerciseId, exerciseTitle }) => {
    const handleDelete = async () => {
        try {
            const response = await apiClient.delete(`/api/categories/${categoryId}/exercises/${exerciseId}`, {
                headers: {
                    Authorization: localStorage.getItem('accessToken'),
                },
            });
            console.log('Response from server:', response.data);
            onClose();
            window.location.reload();
            localStorage.setItem("Status", "Exercise deleted Successfully"); // Set the flag
            alert("Exercise deleted Successfully");
        } catch (error) {
            console.error('Error deleting exercise:', error);
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
                    Delete exercise
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete the exercise: <b>{exerciseTitle}</b>?</p>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Modal.Body>
        </Modal>
    );
}
export default DeleteExerciseModal;