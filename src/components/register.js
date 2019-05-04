import React from 'react';
import * as bs from "react-bootstrap";

class Register extends React.Component {
    render() {
        return (
            <main className="py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Register</div>
                                <div className="card-body">
                                    <bs.Form>
                                        <bs.Form.Group>
                                            <bs.FormLabel>Name</bs.FormLabel>
                                            <bs.FormControl type="input" placeholder="Name" name="name" />
                                        </bs.Form.Group>
                                        <bs.Form.Group>
                                            <bs.FormLabel>Email Address</bs.FormLabel>
                                            <bs.FormControl type="email" placeholder="Email" name="email" />
                                        </bs.Form.Group>
                                        <bs.Form.Group>
                                            <bs.FormLabel>Password</bs.FormLabel>
                                            <bs.FormControl type="password" placeholder="Password" name="password" />
                                        </bs.Form.Group>
                                        <bs.Form.Group>
                                            <bs.FormLabel>Confirm password</bs.FormLabel>
                                            <bs.FormControl type="password" placeholder="Confirm password" name="confirm-password"  />
                                        </bs.Form.Group>
                                        <bs.FormGroup className="row justify-content-center">
                                            <bs.Button className="btn btn-primary">Register</bs.Button>
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
export default Register;

