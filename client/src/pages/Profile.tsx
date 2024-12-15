import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ResponsiveNavbar from "../components/Navbar";

interface User {
    id: number;
    name: string;
    roleId: number;
    email: string;
}

const Profile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken) {
            axios.get('http://localhost:8000/api/users/me', {
                headers: {
                    Authorization: `${accessToken}`
                }
            }).then((response) => {
                setUser(response.data);
            }).catch((error) => {
                if (error.response?.data?.details === 'TokenExpiredError') {
                    if (!isRefreshing) {
                        setIsRefreshing(true);

                        axios.post('http://localhost:8000/api/refresh', {
                            token: refreshToken,
                        }).then((response) => {
                            const newAccessToken = response.data.accessToken;
                            localStorage.setItem('accessToken', newAccessToken);
                            localStorage.setItem('refreshToken', response.data.refreshToken);
                            setIsRefreshing(false);

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
        <>
            <ResponsiveNavbar />
            <div className="container-box">
                <Button onClick={() => navigate(-1)}>Back</Button>
                <br />
                <br />
                <h3>Profile</h3>
                {user ? (
                    <div>
                        <p><b>Username:</b> {user.name}</p>
                        <p><b>Email:</b> {user.email}</p>
                        <p><b>Role:</b> {user.roleId === 1 ? 'Admin' : 'User'}</p>
                    </div>
                ) : (
                    <>
                        <p>To see your profile, you need to be signed in.</p>
                        <p>Click <a href="/api/login">here</a> to sign in.</p>
                        <p>Or, click <a href="/api/register">here</a> to register.</p>
                    </>
                )}
            </div>
        </>
    );
}
export default Profile;