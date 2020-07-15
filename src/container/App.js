import './App.css';
import {React, bs, rt} from '../import';
import Login from '../components/auth/login.js'
import Register from '../components/auth/register.js'
import ResetPassword from "../components/auth/resetpassword.js";
import IndexProduct from '../components/product/index.js';
import CreateProduct from '../components/product/create.js';
import EditProduct from '../components/product/edit.js';
import ViewProduct from '../components/product/view.js';
import { Redirect } from 'react-router';

class App extends React.Component {
    handleOnClick (e) {
        e.preventDefault();
        localStorage.removeItem("token");
    }
    render() {
        const isLoggedIn = localStorage.getItem('token');
        return (
            <rt.BrowserRouter>
                <header className="header">
                    <bs.Navbar bg="dark" variant="dark">
                        <bs.Nav className="mr-auto">
                            {isLoggedIn ?
                                <React.Fragment>
                                    <rt.Link to="/" className="nav-link">Home</rt.Link>
                                    <rt.Link to="" onClick={this.handleOnClick} className="nav-link">Logout</rt.Link>
                                </React.Fragment>
                            : 
                                <React.Fragment>
                                    <rt.Link to="/login" className="nav-link">Login</rt.Link>
                                    <rt.Link to="/register" className="nav-link">Register</rt.Link>
                                </React.Fragment>}
                        </bs.Nav>
                    </bs.Navbar>
                </header>
                <div className="main-route-place">
                    <rt.Switch>
                        <rt.Route exact path="/" component={IndexProduct} />
                        <rt.Route path="/login" component={Login} />
                        <rt.Route path="/register" component={Register} />
                        <rt.Route path="/reset-password" component={ResetPassword} />
                        <rt.Route path="/product/create" component={CreateProduct} />
                        <rt.Route path="/product/edit/:id" component={EditProduct} />
                        <rt.Route path="/product/:id" component={ViewProduct} main/>
                    </rt.Switch>
                </div>
            </rt.BrowserRouter>
        );
    }
}

export default App;
