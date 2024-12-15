import React, { useEffect } from "react";
import ResponsiveNavbar from "../components/Navbar";
import axios from "axios";
import { Button, Card, CardGroup, Col, Container, ListGroup, Row, Table } from "react-bootstrap";
import { useState } from "react";
import Category from "../components/Category/CategoryListItem";
import "./home.css";
import CreateCategoryModal from "../components/Category/CreateCategory";
import DeleteCategoryModal from "../components/Category/DeleteCategory";
import { Link } from "react-router-dom";
import EditCategoryModal from "../components/Category/EditCategory";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

interface User {
    id: number;
    name: string;
    roleId: number;
}

const showToastMessage = (message: string) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 3000,
    });
};

const Home = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [welcomeMessage, setWelcomeMessage] = useState<string>('');
    const [showCreateCategory, setShowCreateCategory] = useState<boolean>(false);
    const [showDeleteCategory, setShowDeleteCategory] = useState<boolean>(false);
    const [showEditCategory, setShowEditCategory] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const accessToken = localStorage.getItem('accessToken');

    // Success messages
    useEffect(() => {
        if (localStorage.getItem("Status") && document.readyState === 'complete') {
            const message = localStorage.getItem("Status") || "";
            showToastMessage(message);
            localStorage.removeItem("Status");
        }
    });

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
            <ResponsiveNavbar />
            <div className="container-box">
                <h2>{welcomeMessage}</h2>
                <br />
                <div className="container-row" >
                    <h3>Categories</h3>
                    <br />
                    {user && user.roleId > 1 && (
                        <Button variant="success" onClick={() => setShowCreateCategory(true)}>Create Category</Button>)}
                    {showCreateCategory && (
                        <CreateCategoryModal isVisible={showCreateCategory}
                            onClose={() => setShowCreateCategory(false)} />
                    )}
                </div>
                <Row className="g-2">
                    {[...categories].reverse().map((category, index) => (
                        <Col key={index} xs={12} sm={12} md={6} lg={4}>
                            <Card key={index} className="card-box h-100">
                                <Card.Body>
                                    <Card.Title>{category.title}</Card.Title>
                                    <Card.Text>
                                        {category.description}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="container-row">
                                    <Link to={"/api/categories/" + category.id + "/exercises"}>
                                        <Button variant="secondary">View exercises</Button>
                                    </Link>
                                    {user && user.roleId > 1 && (
                                        <>
                                            <Button variant="warning" onClick={() => {
                                                setSelectedCategory(category);
                                                setShowEditCategory(true);
                                            }}>Edit</Button>
                                            <Button variant="danger" onClick={() => {
                                                setSelectedCategory(category);
                                                setShowDeleteCategory(true);
                                            }}>Delete</Button>
                                        </>
                                    )}
                                </Card.Footer>
                            </Card>
                        </Col>

                    ))}
                </Row>

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
            <Footer/>
        </>
    );
}
export default Home;