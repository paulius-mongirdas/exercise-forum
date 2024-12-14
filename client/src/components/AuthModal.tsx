import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

interface User {
    id: number;
    name: string;
    role: string;
}

const AuthModal = () => {
    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>To continue, you need to sign in</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Please sign in <a href="/api/login">here</a>to continue</p>
                    <p>Or register <a href="/api/register">here</a></p>
                </Modal.Body>
            </Modal.Dialog>
        </div>
    );
}
export default AuthModal;