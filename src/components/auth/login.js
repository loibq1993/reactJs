import {React, bs} from '../../import.js'

class Login extends React.Component {
    render() {
        return (
            <main className="py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Login</div>
                                <div className="card-body">
                                    <bs.Form>
                                        <bs.Form.Group>
                                            <bs.FormLabel>Email Address</bs.FormLabel>
                                            <bs.FormControl type="email" placeholder="Email" name="email" />
                                        </bs.Form.Group>
                                        <bs.Form.Group>
                                            <bs.FormLabel>Password</bs.FormLabel>
                                            <bs.FormControl type="password" placeholder="password" name="password" />
                                        </bs.Form.Group>
                                        <bs.FormGroup className="row justify-content-center">
                                            <bs.FormCheck type="checkbox" label="Remember Me" name="checkbox"/>
                                        </bs.FormGroup>
                                        <bs.FormGroup className="row justify-content-center">
                                            <bs.Button className="btn btn-primary">Submit</bs.Button>
                                            <bs.Nav.Link to="/reset-password" className="btn btn-link">Reset password</bs.Nav.Link>
                                            {/*<rt.Route exact path="/reset-password" component={ResetPassword} />*/}
                                        </bs.FormGroup>
                                    </bs.Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default Login;
