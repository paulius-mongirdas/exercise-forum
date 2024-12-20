import { Component, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from 'axios';
import React from "react";
import apiClient from "../ApiClient";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form data:', formData);

        try {
            const response = await apiClient.post(`/api/login`, formData, {
                headers: {
                    "Content-Type": "application/json"
                },
            });
            console.log('Response:', response);
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            navigate("/api/home");
        }
        catch (error) {
            console.error('Error on submitting form:', error);
            alert("Invalid input. Please try again.");
        }
    }

    return (
        <div className="container">
            <h2 className="text-center text-dark mt-4">Exercise forum</h2>
            <div className="col-md-6 offset-md-3 mt-5">
                <div className="login-box p-lg-4 my-5">
                    <Form
                    onSubmit={handleLogin}
                    >
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control className="mb-4" name="email" type="email" onChange={handleInputChange}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control className="mb-4" name="password" type="password" onChange={handleInputChange}/>
                        </Form.Group>

                        <Button variant="success" className="btn btn-color px-5 mb-3 w-100" type="submit">
                            Login
                        </Button>
                        <div id="emailHelp" className="form-text text-center mb-5 text-dark">Not
                            Registered? <a href="/api/register" className="text-dark fw-bold"> Create an
                                Account</a>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
export default Login;