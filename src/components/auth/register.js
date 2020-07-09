import { React, bs} from '../../import'
import {connect} from "react-redux";
import * as act from '../../actions/actionRequestUser';
const createHistory = require("history").createBrowserHistory;
const history = createHistory();

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            email:'',
            hash_password:'',
            confirm_hash_password : '',
            role_id: "2",
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount(){
        if (localStorage.getItem('token')) {
            this.props.history.push('/')
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps && nextProps.errors){
            let {errors} = nextProps;
            this.setState({
                errors : errors
            })
        }
    }

    validationName(value) {
        let validation = {
            'status': false, 
            'name': {}
        };
        if (value === null || value === "") {
            validation['status'] = true;
            validation['name']['message'] = 'Name can not be empty';
        }
        return validation;
    }

    validationEmail(value) {
        let validation = {
            'status': false, 
            'email': { }
        };
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (value === null || value === "") { 
            validation['status'] = true;
            validation['email']['message'] = 'Email can not be null';
        } else if (!re.test(String(value).toLowerCase())) {
            validation['status'] = true;
            validation['email']['message'] = 'Email invalid';
        }
        return validation;
    }

    validationPassword(value) {
        let validation = {
            'status': false,
            'hash_password':{}
        };
        if (value === null || value === "") { 
            validation['status'] = true;
            validation['hash_password']['message'] = 'Email can not be null';
        } else if (value.length < 6) {
            validation['status'] = true;
            validation['hash_password']['message'] = 'Password need longer than 6 digit';
        }
        return validation;
    }

    validationConfirmPassword(value) {
        let validation = {
            'status': false,
            'confirm_hash_password': {}
        };
        if (value === null || value === "") { 
            validation['status'] = true;
            validation['confirm_hash_password']['message'] = 'Confirm password can not be null';
        } else if (this.state.hash_password!==value) {
            validation['status'] = true;
            validation['confirm_hash_password']['message'] = `Confirm password must match with password field`;
        }
        return validation;
    }


    handleChange (e) {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleOnClick (event) {
        event.preventDefault();
        const fields = Object.keys(this.state);
        const {name, email, hash_password, confirm_hash_password} = this.state;
        let errors = [];
        let validation;
        for (let i = 0; i < fields.length; i++ ) {
            let field = fields[i];
            switch (field) {
                case 'name': 
                    validation = this.validationName(name);
                    errors[field] = validation[field]
                    errors['status'] = this.validationName(name).status;
                    break;
                case 'email':
                    validation = this.validationEmail(email);
                    errors[field] = validation[field]
                    errors['status'] = validation.status;
                    break;
                case 'hash_password':
                    validation = this.validationPassword(hash_password);
                    errors[field] = validation[field]
                    errors['status'] = validation.status;
                    break;
                case 'confirm_hash_password':
                    validation = this.validationConfirmPassword(confirm_hash_password);
                    errors[field] = validation[field]
                    errors['status'] = validation.status;
                    break;
                default:
                    break;
            }
        }
        this.setState({errors : errors}, () => {
            this.handleSubmit();
        })
    }

    handleSubmit () {
        const {errors} = this.state;
        try {
            var formData = new FormData();
            formData.append('username',this.state.name);
            formData.append('email',this.state.email);
            formData.append('hash_password',this.state.hash_password);
            formData.append('role_id', this.state.role_id)
            this.props.onCreateData(formData);
            history.push('/');
        } catch(e) {

        }
    }

    render() {
        let {errors} = this.state;
        let divError = (data) => <span className="col-md-12 error">{data}</span>
        return (
            <main className="py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Register</div>
                                <div className="card-body">
                                    <bs.Form onSubmit={e => e.preventDefault()} encType="multipart/form-data" id="form-create">
                                        <bs.Form.Group>
                                            <bs.FormLabel>Name</bs.FormLabel>
                                            <bs.FormControl type="fields" placeholder="Name" name="name" onChange={this.handleChange}/>
                                            {errors.name ? divError(errors.name.message) : ''}
                                        </bs.Form.Group>
                                        <bs.Form.Group>
                                            <bs.FormLabel>Email Address</bs.FormLabel>
                                            <bs.FormControl type="email" placeholder="Email" name="email" onChange={this.handleChange}/>
                                            {errors.email ? divError(errors.email.message) : ''}
                                        </bs.Form.Group>
                                        <bs.Form.Group>
                                            <bs.FormLabel>Password</bs.FormLabel>
                                            <bs.FormControl type="password" placeholder="Password" name="hash_password" onChange={this.handleChange}/>
                                            {errors.hash_password ? divError(errors.hash_password.message) : ''}
                                        </bs.Form.Group>
                                        <bs.Form.Group>
                                            <bs.FormLabel>Confirm password</bs.FormLabel>
                                            <bs.FormControl type="password" placeholder="Confirm password" name="confirm_hash_password"  onChange={this.handleChange}/>
                                            {errors.confirm_hash_password ? divError(errors.confirm_hash_password.message) : ''}
                                        </bs.Form.Group>
                                        <bs.Form.Group>
                                            <bs.FormLabel>Role</bs.FormLabel>
                                            <bs.FormControl as="select" name="role_id" onChange={this.handleChange}>
                                                <option value="2">User</option>
                                                <option value="1">Admin</option>
                                            </bs.FormControl>
                                        </bs.Form.Group>
                                        <bs.FormGroup className="row justify-content-center">
                                            <bs.Button className="btn btn-primary" type="submit" onClick={this.handleOnClick}>Register</bs.Button>
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

const mapStateToProps = state => {
    return {
        errors : state.errors,
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onCreateData : (formData) => {
            dispatch(act.actRequestCreateData(formData))
        },
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Register)

