import {React, bs} from '../../import'
import * as act from "../../actions/actionAuth";
import {connect} from "react-redux";
import { Redirect } from 'react-router';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            remember:'',
            emailErr: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount(){
    
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps && nextProps.error){
            let {error} = nextProps;
            this.setState({
                error : error
            })
        }
    }

    validateEmail(email) {
        //eslint-disable-next-line
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    }

    handleChange(e){
        const { name,value } = e.target;
        let emailErr = [];
        if(name === 'email'){
            if (value === '') {
                emailErr.push('Tên email không được để trống');
            }else{
                if(this.validateEmail(value) === false){
                    emailErr.push("Email không đúng định dạng")
                }
            }
        }
        this.setState({
            [name] : value,
            emailErr : emailErr
        });
    }

    handleOnClick(e){
        e.preventDefault();
        this.handleSubmit();
    }

    handleSubmit(e){
        try {
            var formData = new FormData();
            formData.append('email',this.state.email);
            formData.append('hash_password', this.state.password);
            formData.append('remember',this.state.remember);
            this.props.onLogin(formData);
            this.props.history.push('/')
        } catch (e) {
            alert(e.message);
        }
    }

    render() {
        if (localStorage.getItem('token')) {
            return    <Redirect push to="/"/>;
        }
        let {emailErr} = this.state;
        return (
            <main className="py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Login</div>
                                <div className="card-body">
                                    <bs.Form onSubmit={this.handleSubmit} id="form-login">
                                        <bs.Form.Group>
                                            <bs.FormLabel>Email Address</bs.FormLabel>
                                            <bs.FormControl
                                                type="text"
                                                placeholder="Email"
                                                name="email"
                                                onChange={this.handleChange}
                                                value={this.state.value}
                                            />
                                            {emailErr
                                                ? emailErr.map((name, key) => {
                                                    return <span className='error' key={key}>{name}</span>
                                                })
                                                : ''}
                                        </bs.Form.Group>
                                        <bs.Form.Group>
                                            <bs.FormLabel>Password</bs.FormLabel>
                                            <bs.FormControl
                                                type="password"
                                                placeholder="password"
                                                name="password"
                                                value={this.state.value}
                                                onChange={this.handleChange}
                                            />
                                        </bs.Form.Group>
                                        <bs.FormGroup className="row justify-content-center">
                                            <bs.FormCheck
                                                type="checkbox"
                                                label="Remember Me"
                                                name="remember"
                                                onChange={this.handleChange}
                                            />
                                        </bs.FormGroup>
                                        <bs.FormGroup className="row justify-content-center">
                                            <bs.Button className="btn btn-primary" onClick={this.handleOnClick}>Submit</bs.Button>
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
        onLogin : (formData) => {
            dispatch(act.actRequestLogin(formData))
        },
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Login)


