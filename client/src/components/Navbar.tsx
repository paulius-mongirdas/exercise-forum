import { useNavigate } from 'react-router-dom';
import Navi from 'react-bootstrap/Nav';
import React, { useEffect, useState } from 'react';
import apiClient from '../ApiClient';
import { NavDropdown } from 'react-bootstrap';
import { Navbar, Container, Nav } from 'react-bootstrap';

interface User {
    id: number;
    name: string;
    roleId: number;
}

const ResponsiveNavbar: React.FC<{}> = () => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    const [user, setUser] = useState<User | null>(null);
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    let isRefreshing = false;

    useEffect(() => {
        if (accessToken !== null) {
            apiClient.get('/api/users/me', {
                headers: {
                    Authorization: `${accessToken}`
                }
            }).then((response) => {
                setUser(response.data);
            }).catch((error) => {
                if (error.response?.data?.details === 'TokenExpiredError') {
                    if (!isRefreshing) {
                        isRefreshing = true;

                        apiClient.post('/api/refresh', {
                            token: refreshToken,
                        }).then((response) => {
                            const newAccessToken = response.data.accessToken;
                            localStorage.setItem('accessToken', newAccessToken);
                            localStorage.setItem('refreshToken', response.data.refreshToken);
                            isRefreshing = false;

                            // Retry the original request
                            apiClient.get('/api/users/me', {
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
        <Navbar
            expand="lg"
            className="bg-body-tertiary"
            expanded={expanded}
            style={{ position: 'relative' }} // Ensure proper positioning for sliding effect
        >
            <Container fluid style={{ paddingLeft: 10, paddingRight: 10 }}>
                <Navbar.Brand href="/">Exercise forum</Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    onClick={() => setExpanded(!expanded)} // Toggle menu
                />
                <Navbar.Collapse
                    id="basic-navbar-nav"
                    className={`side-slide ${expanded ? 'show' : ''}`}
                >
                    <Nav className="justify-content-start flex-grow-1 pe-3">
                        <Nav.Link href="/api/profile">Profile</Nav.Link>
                    </Nav>

                    <Nav className="justify-content-end flex-grow-1">
                        {!user && <Nav.Link href="/api/login">Log in</Nav.Link>}
                        {user && <Nav.Link href="/api/logout">Log out</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
export default ResponsiveNavbar;