import './App.css';
import {React, bs, rt} from '../import';
import Login from '../components/auth/login.js'
import Register from '../components/auth/register.js'
import ResetPassword from "../components/auth/resetpassword.js";
import IndexProduct from '../components/product/index.js';
import CreateProduct from '../components/product/create.js';
import EditProduct from '../components/product/edit.js';
import ViewProduct from '../components/product/view.js';

class App extends React.Component {
    render() {
        return (
            <rt.BrowserRouter>
                <header className="header">
                    <bs.Navbar bg="dark" variant="dark">
                        <bs.Nav className="mr-auto">
                            <rt.Link to="/" className="nav-link">Home</rt.Link>
                            <rt.Link to="/login" className="nav-link">Login</rt.Link>
                            <rt.Link to="/register" className="nav-link">Register</rt.Link>
                        </bs.Nav>
                    </bs.Navbar>
                </header>
                <div className="main-route-place">
                    <rt.Switch>
                        <rt.Route path="/login" component={Login} />
                        <rt.Route path="/register" component={Register} />
                        <rt.Route path="/reset-password" component={ResetPassword} />
                        <rt.Route exact path="/" component={IndexProduct} />
                        <rt.Route path="/product/create" component={CreateProduct} />
                        <rt.Route path="/product/edit/:id" component={EditProduct} />
                        <rt.Route path="/product/:id" component={ViewProduct} />
                    </rt.Switch>
                </div>
            </rt.BrowserRouter>
        );
    }
}

export default App;
