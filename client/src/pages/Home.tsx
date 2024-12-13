import React, { useEffect } from "react";
import Nav from "../components/Navbar";
import axios from "axios";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useState } from "react";
import Category from "../components/Category/CategoryListItem";
import "./home.css";

interface User {
    id: number;
    name: string;
    role: string;
}

const Home = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [welcomeMessage, setWelcomeMessage] = useState<string>('');

    const accessToken = localStorage.getItem('token');

    useEffect(() => {
        if (accessToken !== null) {
            axios.get('http://localhost:8000/api/users/me', {
                headers: {
                    Authorization: `${accessToken}`
                }
            }).then((response) => {
                setUser(response.data);
                setWelcomeMessage(`Welcome, ${response.data.name}`);
            })  
        }
        else {
            setWelcomeMessage('Hello, guest user!');
        }
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/api/categories').then((response) => {
            const categories = response.data.map((category: Category) => ({
                id: category.id,
                title: category.title,
                description: category.description,
                userId: category.userId
            }));
            setCategories(categories);
        });
    }, []);

    return (
        <>
            <Nav />
            <div className="home-container">
                <h2>{welcomeMessage}</h2>
                <br></br>
                <h3>Categories</h3>
                <table className="table table-bordered table-responsive">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...categories].reverse().map((category, index) => {
                            return (
                                <Category key={index} id={category.id} title={category.title} description={category.description} userId={category.userId} />
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default Home;