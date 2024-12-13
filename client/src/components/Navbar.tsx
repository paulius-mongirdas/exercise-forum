import { Form, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Navi from 'react-bootstrap/Nav';
import React from 'react';

const Nav: React.FC<{}> = () => {
    const navigate = useNavigate()

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid style={{ paddingLeft: 10, paddingRight: 10 }}>
                <Navbar.Collapse className="justify-content-start">
                    <Navi>
                        <Navi.Link href="/">Home</Navi.Link>
                    </Navi>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navi>
                        <Navi.Link href="/api/login">Log in</Navi.Link>
                        <Navi.Link href="/api/logout">Log out</Navi.Link>
                    </Navi>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Nav;