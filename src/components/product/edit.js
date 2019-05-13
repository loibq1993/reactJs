import { React, rt, bs, FontAwesomeIcon} from '../../import'
import * as action from "../../actions/action.js";
import {connect} from 'react-redux';
import callApi from '../../callApi'

const baseUrl = 'http://laravel.cc';

class EditProduct extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            image:'',
            description:'',
            quantity:'',
            errors: {
                name: '',
                image: ''
            },
            previewUrl : '',
            previewFileName : ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let {match} = this.props;
        let id = match.params.id;
        callApi('product/'+id+'/edit','GET',null)
            .then( (res) => {
                this.setState({
                    name : res.data.name,
                    image : res.data.photo,
                    description : res.data.description,
                    quantity : res.data.quantity
                });
            })
    }

    handleChange(e){
        const { name, value } = e.target;
        let reader = new FileReader();
        let errorName = "";
        let errorImg = "";
        let previewFileName = "";
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
        const fileType = file['type'];
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
        switch (name) {
            case 'name':
                errorName =
                    value.length <= 0
                        ? 'Tên sản phẩm không được để trống'
                        : '';
                break;
            case 'image':
                //e.target.files[0].name
                errorImg =
                    !validImageTypes.includes(fileType)
                        ? 'Ảnh phải là định dạng jpeg, png, jpg, gif, svg'
                        : '';
                break;
            default:
                break;
        }
        this.setState({
            errors : {
                name : errorName,
                image : errorImg
            },
            [name] : value,
        });
    }

    handleSubmit(e){
        e.preventDefault();
        let {match} = this.props;
        var formData = new FormData();
        let id = match.params.id;
        formData.append('name',this.state.name);
        formData.append('description',this.state.description);
        if(this.state.quantity!== ""){
            formData.append('quantity',this.state.quantity);
        }else{
            formData.append('quantity',"0");
        }
        if(e.target.image.files.length > 0){
            formData.append('photo',e.target.image.files[0]);
        }
        formData.append('id',id);
        formData.append('_method','PATCH');

        console.log(id);
        callApi('product/'+id,'POST',formData)
            .then( (res) => {
                this.props.history.push('/')
            })
            .catch( (errs) => {
                let json = errs.response.data.error;
                this.setState({
                    errors: {
                        name : json.name,
                        image : json.photo
                    }
                });
            })
    }

    render() {
        let product = this.state;
        let errors = this.state.errors;
        let previewUrl = this.state.previewUrl;
        let previewFileName = this.state.previewFileName;
        return (
            <main className="py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="card">
                                <div className="card-header">Create new product</div>
                                <div className="card-body">
                                    <form
                                        id="form-create"
                                        encType="multipart/form-data"
                                        onSubmit={this.handleSubmit}
                                    >
                                        <div className="form-group">
                                            <label>Product Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Product name"
                                                value={product.name}
                                                onChange={this.handleChange}
                                                className="form-control"
                                            />
                                            {<span className='error'>{errors.name}</span>}
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-12">Product image</label>
                                            <span className="col-md-6">
                                                {previewUrl !== ''
                                                    ? <img height="100" width="100" src={previewUrl} alt={product.photo} />
                                                    :<img height="100" width="100" src={baseUrl + '/images/' + product.image} alt={product.photo} />
                                                }
                                                <p>
                                                    {previewUrl !== ''
                                                        ? previewFileName
                                                        : product.image
                                                    }
                                                </p>
                                            </span>
                                            <input
                                                type="file"
                                                name="image"
                                                onChange={this.handleChange}
                                                className="col-md-6"

                                            />
                                            {<span className='col-md-12 error'>{errors.image}</span>}
                                        </div>
                                        <div className="form-group">
                                            <label>Product Description</label>
                                            <textarea
                                                className="form-control"
                                                name="description"
                                                placeholder="Product description"
                                                onChange={this.handleChange}
                                                value={product.description || ''}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Product quantity</label>
                                            <input
                                                type="number"
                                                name="quantity"
                                                placeholder="Product quantity"
                                                value={product.quantity}
                                                onChange={this.handleChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary">Save</button>
                                        </div>
                                    </form>
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
        products :state.products
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllProducts : (products) => {
            dispatch(action.actFetchData(products));
        },
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(EditProduct)
