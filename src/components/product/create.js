import {React,bs} from '../../import'
import * as action from "../../actions/action";
import {connect} from "react-redux";

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
            errors: {
                name: '',
                image: ''
            },
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps && nextProps.errors){
            let {errors} = nextProps;
            let errImg = '';
            let errName = '';
            if(nextProps.errors.error.length !==0){
                if(errors.error.image){
                    errImg  = errors.error.image;
                }
                if(errors.error.name){
                    errName = errors.error.name;
                }
            }
            this.setState({
                errors :{
                    image : errImg,
                    name : errName
                }
            })
        }
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
        this.props.onCreateData(formData);
    }

    render() {
        let { image,errors } = this.state;
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
                                            {errors.name
                                                ? errors.name.map((name, key) => {
                                                    return <span className='error' key={key}>{name}</span>
                                                })
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
                                                ? errors.image.map( (item, key) => {
                                                    return <span className="col-md-12 error" key={key}>{item}</span>;
                                                })
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
            dispatch(action.actRequestCreateData(formData))
        },
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(CreateProduct)

