import { React } from '../../import';
import * as act from "../../actions/actionRequestProduct.js";
import {connect} from 'react-redux';
import history from '../../history'
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
            errors : {
                image : "",
                name : ""
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBack = this.handleBack.bind(this);
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
            let {product, errors} = nextProps;
            let errImg = '';
            let errName = '';
            if(nextProps.errors.length !==0){
                if(errors.image){
                    errImg  = errors.image;
                }
                if(errors.name){
                    errName = errors.name;
                }
            }
            this.setState({
                name: product.name,
                image: product.image,
                description: product.description,
                quantity : product.quantity,
                errors :{
                    image : errImg,
                    name : errName
                }
            })
        }
    }

    handleBack(){
        // this.props.history.push('/');
    }

    handleChange(e){
        const { name, value } = e.target;
        let reader = new FileReader();
        let imgErr = [];
        let nameErr = [];
        let file = '';
        let fileSizeMb = '';
        if( e.target.files ){
            file =  e.target.files[0];
            fileSizeMb = file.size/1024/1024;
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
                if(value.length <= 0){
                    nameErr.push('Tên sản phẩm không được để trống')
                }
                break;
            case 'image':
                //e.target.files[0].name
                if(!validImageTypes.includes(fileType))
                {
                    imgErr.push('Ảnh phải là định dạng jpeg, png, jpg, gif, svg');
                }
                if(fileSizeMb > 2)
                {
                    imgErr.push('Kích thước file phải nhỏ hơn 2MB')
                }
                break;
            default:
                break;
        }
        this.setState({
            [name] : value,
            errors: {
                image : imgErr,
                name : nameErr
            }
        });
    }

    handleSubmit(e){
        e.preventDefault();
        let {match} = this.props;
        var formData = new FormData();
        let id = match.params.id;
        formData.append('name',this.state.name);
        if(this.state.description){
            formData.append('description',this.state.description);
        }else{
            formData.append('description','');
        }
        if(this.state.quantity!== ""){
            formData.append('quantity',this.state.quantity);
        }else{
            formData.append('quantity',"0");
        }
        if(e.target.image.files.length > 0){
            formData.append('image',e.target.image.files[0]);
        }
        formData.append('id',id);
        formData.append('_method','PATCH');
        this.props.onUpdateData(formData,id);
        history.goBack()
        // console.log(this.props);
    }

    render() {
        let { name, image, description, quantity, errors } = this.state;
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
                                                value={name ? name : ''}
                                                onChange={this.handleChange}
                                                className="form-control"
                                            />
                                            {errors.name
                                                ? errors.name.map((name, key) => {
                                                     return <span className='error' key={key}>{name}</span>
                                                })
                                                : ''}
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
                                            {errors.image
                                                ? errors.image.map( (item, key) => {
                                                        return <span className="col-md-12 error" key={key}>{item}</span>;
                                                    })
                                                : ''}
                                        </div>
                                        <div className="form-group">
                                            <label>Product Description</label>
                                            <textarea
                                                className="form-control"
                                                name="description"
                                                placeholder="Product description"
                                                onChange={this.handleChange}
                                                value={description ? description : ''}
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
                                            <button className="btn btn-warning" onClick={this.handleBack}>Back</button>
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
        product :state.products,
        errors :state.errors
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchProduct : (id) => {
            dispatch(act.actRequestEditData(id));
        },
        onUpdateData : (formData,id) => {
            dispatch(act.actRequestUpdateData(formData,id))
        },
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(EditProduct)
