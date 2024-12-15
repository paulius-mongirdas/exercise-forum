import { Component, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from 'axios';
import React from "react";
import "./login.css";
import apiClient from "../ApiClient";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form data:', formData);
        console.log('Base URL:', apiClient.defaults.baseURL); 

        try {
            const response = await apiClient.post(`/api/register`, formData, {
                headers: {
                    "Content-Type": "application/json"
                },
            });
            console.log('Response:', response);
            navigate("/api/login");
        }
        catch (error) {
            console.error('Error on submitting form:', error);
            // notify client of error
            alert("Invalid input. Please try again.");
        }
    }

    return (
        <div className="container">
            <h2 className="text-center text-dark mt-4">Exercise forum</h2>
            <div className="col-md-6 offset-md-3 mt-5">
                <div className="login-box p-lg-4 my-5">

                    <Form
                        onSubmit={handleRegister}
                    >
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control className="mb-4" name="name" type="text" onChange={handleInputChange}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control className="mb-4" name="email" type="email" onChange={handleInputChange}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control className="mb-4" name="password" type="password" onChange={handleInputChange}/>
                        </Form.Group>

                        <Button variant="success" className="btn btn-color px-5 mb-3 w-100" type="submit">
                            Register
                        </Button>
                        <div id="emailHelp" className="form-text text-center mb-5 text-dark">Already have
                            an account? <a href="/api/login" className="text-dark fw-bold"> Sign in</a>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
export default Register;