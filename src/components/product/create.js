import {React,bs} from '../../import'
import {connect} from "react-redux";
import * as act from '../../actions/actionRequestProduct';

class CreateProduct extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            image:'',
            description:'',
            quantity:'',
            previewUrl : '',
            previewFileName : '',
            errors: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount(){
        if (!localStorage.getItem('token') && !localStorage.getItem('user')) {
            this.props.history.push('/login')
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps && nextProps.errors){
            let errors = nextProps.errors.message.errors;
            let err = [];
            if(Object.keys(errors).length !==0){
                if(errors.image){
                    err['image']  = errors.image;
                }
                if(errors.name){
                    err['name'] = errors.name;
                }
            }
            this.setState({
                errors : err
            })
        }
    }

    handleChange(e){
        const { name, value } = e.target;
        let reader = new FileReader();
        let file = '';
        if( e.target.files ){
            file =  e.target.files[0];
            reader.onloadend = () => {
                this.setState({
                    previewUrl : reader.result,
                    previewFileName : file.name
                });
            }
            reader.readAsDataURL(file)
        }
        this.setState({
            [name] : value,
        });
    }

    handleSubmit(e){
        e.preventDefault();
        var formData = new FormData();
        formData.append('name',this.state.name);
        formData.append('description',this.state.description);
        if(this.state.quantity!== ""){
            formData.append('quantity',this.state.quantity);
        }else{
            formData.append('quantity',"0");
        }
        if(e.target.image.files.length > 0){
            formData.append('image',e.target.image.files[0]);
        }
        formData.append('token', localStorage.getItem('token'));
        this.props.onCreateData(formData);
        this.props.history.push('/');
    }

    render() {
        let { image,errors } = this.state;
        let previewUrl = this.state.previewUrl;
        let previewFileName = this.state.previewFileName;
        let divError = (data) => <span className="col-md-12 error">{data}</span>
        return (
            <main className="py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="card">
                                <div className="card-header">Create new product</div>
                                <div className="card-body">
                                    <bs.Form id="form-create"  encType="multipart/form-data" onSubmit={this.handleSubmit}>
                                        <bs.Form.Group>
                                            <bs.FormLabel>Product Name</bs.FormLabel>
                                            <bs.FormControl
                                                type="text"
                                                name="name"
                                                placeholder="Product name"
                                                value={this.state.value}
                                                onChange={this.handleChange}
                                            />
                                            {errors && errors.name
                                                ? divError(errors.name.properties.message)
                                                : ''}
                                        </bs.Form.Group>
                                        <div className="form-group row">
                                            <label className="col-md-12">Product image</label>
                                            <span className="col-md-6">
                                                {previewUrl !== ''
                                                    ? <img height="100" width="100" src={previewUrl} alt={image} />
                                                    : <img height="100" width="100" alt="" />
                                                }
                                                <p>
                                                    {previewUrl !== ''
                                                        ? previewFileName
                                                        : ''
                                                    }
                                                </p>
                                            </span>
                                            <input
                                                type="file"
                                                name="image"
                                                onChange={this.handleChange}
                                                className="col-md-6"
                                            />
                                            {errors.image
                                                ? divError(errors.image.properties.message)
                                                : ''}
                                        </div>
                                        <bs.Form.Group>
                                            <bs.FormLabel>Product Name</bs.FormLabel>
                                            <bs.FormControl
                                                as="textarea"
                                                name="description"
                                                placeholder="Product description"
                                                value={this.state.value}
                                                onChange={this.handleChange}
                                            />
                                        </bs.Form.Group>
                                        <bs.Form.Group>
                                            <bs.FormLabel>Product quantity</bs.FormLabel>
                                            <bs.FormControl
                                                type="number"
                                                name="quantity"
                                                placeholder="Product quantity"
                                                value={this.state.value}
                                                onChange={this.handleChange}
                                                defaultValue="0"
                                            />
                                        </bs.Form.Group>
                                        <bs.Form.Group>
                                            <bs.Button type="submit">Submit</bs.Button>
                                        </bs.Form.Group>
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
        onViewData: () => {
            dispatch(act.actRequestCreateView());
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(CreateProduct)

