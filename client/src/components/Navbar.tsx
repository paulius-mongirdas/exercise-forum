import { Form, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Navi from 'react-bootstrap/Nav';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavDropdown } from 'react-bootstrap';

interface User {
    id: number;
    name: string;
    roleId: number;
}

interface TokenDto {
    token: string;
}

const Nav: React.FC<{}> = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState<User | null>(null);
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    let isRefreshing = false;
    let refreshSubscribers: any[] = [];

    const subscribeTokenRefresh = (callback: any) => {
        refreshSubscribers.push(callback);
    };

    const onTokenRefreshed = (newAccessToken: any) => {
        refreshSubscribers.forEach((callback) => callback(newAccessToken));
        refreshSubscribers = [];
    };

    useEffect(() => {
        if (accessToken !== null) {
            axios.get('http://localhost:8000/api/users/me', {
                headers: {
                    Authorization: `${accessToken}`
                }
            }).then((response) => {
                setUser(response.data);
            }).catch((error) => {
                if (error.response?.data?.details === 'TokenExpiredError') {
                    if (!isRefreshing) {
                        isRefreshing = true;

                        axios.post('http://localhost:8000/api/refresh', {
                            token: refreshToken,
                        }).then((response) => {
                            const newAccessToken = response.data.accessToken;
                            localStorage.setItem('accessToken', newAccessToken);
                            localStorage.setItem('refreshToken', response.data.refreshToken);
                            isRefreshing = false;

                            // Retry the original request
                            axios.get('http://localhost:8000/api/users/me', {
                                headers: {
                                    Authorization: `${newAccessToken}`
                                }
                            }).then((response) => {
                                setUser(response.data);
                            }).catch((error) => {
                                console.error('Retry failed:', error.response.data);
                            });
                        }).catch((refreshError) => {
                            if (refreshError.response?.data?.details === 'RefreshTokenExpiredError') {
                                console.log('Refresh token expired, please log in again');
                                navigate('/api/login');
                            }
                            console.error('Refresh error:', refreshError.response.data);
                        });
                    }
                } else {
                    console.log('Error:', error.response?.data?.details);
                }
            });
        }
    }, []);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid style={{ paddingLeft: 10, paddingRight: 10 }}>
                <Navbar.Collapse className="justify-content-start">
                    <Navi>
                        <Navi.Link href="/">Home</Navi.Link>
                    </Navi>
                    {user && user.roleId > 1 && (
                        <Navi>
                            <NavDropdown title="Admin actions" id="basic-nav-dropdown">
                                <NavDropdown.Item href="">Create new category</NavDropdown.Item>
                            </NavDropdown>
                        </Navi>)}
                </Navbar.Collapse>

                <Navbar.Collapse className="justify-content-end">
                    <Navi>
                        {!user && (
                            <Navi.Link href="/api/login">Log in</Navi.Link>
                        )}
                        {user && (
                            <Navi.Link href="/api/logout">Log out</Navi.Link>
                        )}
                    </Navi>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Nav;