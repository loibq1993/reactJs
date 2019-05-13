import {React,bs} from '../../import'
import callApi from '../../callApi';

class CreateProduct extends React.Component {
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
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        const { name, value } = e.target;
        let errors = this.state.errors;
        let file = '';
        if( e.target.files ){
            file =  e.target.files[0];
        }
        const fileType = file['type'];
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
        // console.log(errors.name);
        switch (name) {
            case 'name':
                errors.name =
                    value.length <= 0
                        ? 'Tên sản phẩm không được để trống'
                        : '';
                break;
            case 'image':
                //e.target.files[0].name
                errors.image =
                    !validImageTypes.includes(fileType)
                        ? 'Ảnh phải là định dạng jpeg, png, jpg, gif, svg'
                        : '';
                break;
            default:
                break;
        }
        this.setState({
            [name] : value,
            // errors: errors
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
            formData.append('photo',e.target.image.files[0]);
        }
        callApi('product','POST',formData)
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
        let errors = this.state.errors;
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
                                            {<span className='error'>{errors.name}</span>}
                                        </bs.Form.Group>
                                        <bs.Form.Group>
                                            <bs.FormLabel>Product image</bs.FormLabel>
                                            <bs.FormControl
                                                type="file"
                                                name="image"
                                                value={this.state.value}
                                                onChange={this.handleChange}
                                            />
                                            {<span className='error'>{errors.image}</span>}
                                        </bs.Form.Group>
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

export default CreateProduct;
