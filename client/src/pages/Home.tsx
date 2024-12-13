import React, { useEffect } from "react";
import Nav from "../components/Navbar";
import axios from "axios";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useState } from "react";
import Category from "../components/Category/CategoryListItem";
import "./home.css";

const Home = () => {
    const [categories, setCategories] = useState<Category[]>([]);

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
            <h1>Categories</h1>
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