import React from 'react';
import { Button, Navbar, Nav} from 'react-bootstrap';

export default function CustomNavbar() {

    let logout = () => {
        console.log(sessionStorage);
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('isAdmin');
        console.log(sessionStorage)
        window.location.replace('/login');
    }

    return(
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/login">{sessionStorage.getItem('isAdmin') ? 'Stocks Admin' : 'Stocks'}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {
                        sessionStorage.getItem('isAdmin') ? <Nav.Link href="/brokers">Brokers</Nav.Link> : <Nav.Link href="/">Stocks Dashboard</Nav.Link>
                    }
                </Nav>
                <Button variant="outline-info" onClick={logout}>Logout</Button>
            </Navbar.Collapse>
        </Navbar>
    );
}