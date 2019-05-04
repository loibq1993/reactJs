import Header from 'react';
import React from 'react';
import './App.css';
import { Route, BrowserRouter ,Link} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';
import Login from '../src/components/login.js'
import Home from '../src/components/home.js';
import Register from '../src/components/register.js'
class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <header className="header">
                    <Navbar bg="dark" variant="dark">
                        <Nav className="mr-auto">
                            <Link to="/" activeClassName="active" className="nav-link">Home</Link>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link">Register</Link>
                        </Nav>
                    </Navbar>
                    <div className="main-route-place">
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                    </div>
                </header>
            </BrowserRouter>
        );
    }
}

export default App;
