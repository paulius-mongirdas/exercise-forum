import React, { useEffect } from "react";
import Nav from "../components/Navbar";
import axios from "axios";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useState } from "react";
import Category from "../components/Category/CategoryListItem";
import "./home.css";
import CreateCategoryModal from "../components/Category/CreateCategory";
import DeleteCategoryModal from "../components/Category/DeleteCategory";
import { set } from "store";
import { Link } from "react-router-dom";
import EditCategoryModal from "../components/Category/EditCategory";

interface User {
    id: number;
    name: string;
    roleId: number;
}

const Home = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [welcomeMessage, setWelcomeMessage] = useState<string>('');
    const [showCreateCategory, setShowCreateCategory] = useState<boolean>(false);
    const [showDeleteCategory, setShowDeleteCategory] = useState<boolean>(false);
    const [showEditCategory, setShowEditCategory] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        if (accessToken !== null) {
            axios.get('http://localhost:8000/api/users/me', {
                headers: {
                    Authorization: `${accessToken}`
                }
            }).then((response) => {
                setUser(response.data);
                setWelcomeMessage(`Welcome, ${response.data.name}`);
            }).catch((error) => {
                // check if error is jwt expired
                console.log('Error:', error);
            });
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
            <div className="container-box">
                <h2>{welcomeMessage}</h2>
                <br />
                <div className="container-row" >
                    <h3>Categories</h3>
                    <br />
                    {user && user.roleId > 1 && (
                        <Button onClick={() => setShowCreateCategory(true)}>Create Category</Button>)}
                    {showCreateCategory && (
                        <CreateCategoryModal isVisible={showCreateCategory}
                            onClose={() => setShowCreateCategory(false)} />
                    )}
                </div>
                <table className="table table-bordered table-responsive">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            {user && user.roleId > 1 && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {[...categories].reverse().map((category, index) => {
                            return (
                                <tr key={index}>
                                    <td><Link to={"/api/categories/" + category.id + "/exercises"}>{category.title}</Link></td>
                                    <td>{category.description}</td>
                                    {user && user.roleId > 1 && (
                                        <td>
                                            <div className="container-row" >
                                                <Button variant="danger" onClick={() => {
                                                    setShowDeleteCategory(true)
                                                    setSelectedCategory(category)
                                                }
                                                }>Delete</Button>
                                                <Button variant="warning" onClick={() => {
                                                    setShowEditCategory(true)
                                                    setSelectedCategory(category)
                                                }
                                                }>Edit</Button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {showDeleteCategory && selectedCategory && (
                <DeleteCategoryModal isVisible={showDeleteCategory}
                    onClose={() => setShowDeleteCategory(false)}
                    categoryId={selectedCategory.id}
                    categoryTitle={selectedCategory.title} />
            )}
            {showEditCategory && selectedCategory && (
                <EditCategoryModal isVisible={showEditCategory}
                    onClose={() => setShowEditCategory(false)}
                    category={selectedCategory} />
            )}
        </>
    );
}
export default Home;