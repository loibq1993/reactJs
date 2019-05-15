import { React,bs } from '../../import';
import * as action from "../../actions/action.js";
import {connect} from 'react-redux';

const baseUrl = 'http://laravel.cc';

class EditProduct extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            image:'',
            description:'',
            quantity:'',
            previewUrl : '',
            previewFileName : '',
            errors: {
                name: '',
                image: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let {match} = this.props;
        if(match){
            let id = match.params.id;
            this.props.fetchProduct(id);
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps && nextProps.product){
            var {product} = nextProps;
            this.setState({
                name: product.name,
                image: product.photo,
                description: product.description,
                quantity : product.quantity
            })
        }
    }

    handleChange(e){
        const { name, value } = e.target;
        let reader = new FileReader();
        let errorName = "";
        let errorImg = "";
        // let previewFileName = "";
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

        this.props.onEditData(formData,id);
        this.props.history.push('/product/'+id+'/edit');
        // callApi('product/'+id,'POST',formData)
        //     .then( (res) => {
        //         this.props.history.push('/')
        //     })
        //     .catch( (errs) => {
        //         let json = errs.response.data.error;
        //         this.setState({
        //             errors: {
        //                 name : json.name,
        //                 image : json.photo
        //             }
        //         });
        //     })
    }

    render() {
        let { name, image, description, quantity } = this.state;
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
                                                value={name}
                                                onChange={this.handleChange}
                                                className="form-control"
                                            />
                                            {<span className='error'>{errors.name}</span>}
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-12">Product image</label>
                                            <span className="col-md-6">
                                                {previewUrl !== ''
                                                    ? <img height="100" width="100" src={previewUrl} alt={image} />
                                                    : <img height="100" width="100" src={baseUrl + '/images/' + image} alt={image} />
                                                }
                                                <p>
                                                    {previewUrl !== ''
                                                        ? previewFileName
                                                        : image
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
                                                value={description}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Product quantity</label>
                                            <input
                                                type="number"
                                                name="quantity"
                                                placeholder="Product quantity"
                                                value={quantity}
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
        product :state.products
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchProduct : (id) => {
            dispatch(action.actRequestEditData(id));
        },
        onEditData : (formData,id) => {
            dispatch(action.actRequestUpdateData(formData,id))
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(EditProduct)
