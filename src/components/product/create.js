import {React,bs} from '../../import'

class CreateProduct extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            image:'',
            description:'',
            quantity:'',
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state)
    }
    render() {
        return (
            <main className="py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="card">
                                <div className="card-header">Create new product</div>
                                <div className="card-body">
                                    <bs.Form method="post" encType="multipart/form-data">
                                        <bs.Form.Group>
                                            <bs.FormLabel>Product Name</bs.FormLabel>
                                            <bs.FormControl
                                                type="text"
                                                name="name"
                                                placeholder="Product name"
                                                value={this.state.value}
                                                onChange={this.handleChange}
                                            />
                                        </bs.Form.Group>
                                        <bs.Form.Group>
                                            <bs.FormLabel>Product image</bs.FormLabel>
                                            <bs.FormControl
                                                type="file"
                                                name="image"
                                                value={this.state.value}
                                                onChange={this.handleChange}
                                            />
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
                                            />
                                        </bs.Form.Group>
                                        <bs.Form.Group>
                                            <bs.FormControl type="submit" />
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
