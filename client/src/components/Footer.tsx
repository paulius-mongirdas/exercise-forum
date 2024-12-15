import axios from "axios";
import React, { useEffect, useState } from "react";

interface User {
    id: number;
    name: string;
    roleId: number;
}

const Footer = () => {
    const accessToken = localStorage.getItem('accessToken');
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (accessToken !== null) {
            axios.get('http://localhost:8000/api/users/me', {
                headers: {
                    Authorization: `${accessToken}`
                }
            }).then((response) => {
                setUser(response.data);
            }).catch((error) => {
                // check if error is jwt expired
                console.log('Error:', error);
            });
        }
    }, []);
    return (
        <footer className="footer">
            <div className="container footer-content">
                <img
                    src="/stretch.svg"
                    alt="Left Icon"
                    className="footer-icon"
                />
                <span className="footer-text">© 2024 - Exercise forum by Paulius Mongirdas</span>
                <img
                    src="/pullup.svg"
                    alt="Right Icon"
                    className="footer-icon"
                />
            </div>
        </footer>
    );
}
export default Footer;