import {axios, React, rt, bs, FontAwesomeIcon} from '../../import.js'
const baseUrl = 'http://laravel.cc';

class IndexProduct extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            products:[]
        };
    }
    componentDidMount() {
        axios.get(baseUrl + '/product')
            .then(response => {
                const products = response.data;
            this.setState({ products });
                console.log(products);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render() {
        return (
            <main className="py-4">
                <div className="container">
                    <div className="col-md-12">
                        <bs.Table striped bordered hover>
                            <thead>
                                <tr>
                                    <td>STT</td>
                                    <td>Tên sản phẩm</td>
                                    <td>Ảnh sản phẩm</td>
                                    <td>Miêu tả</td>
                                    <td>Số lượng</td>
                                    <td>
                                        <rt.Link to={'/product/create'} className="btn btn-primary">
                                            <FontAwesomeIcon icon="plus" />
                                        </rt.Link>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.products.map(function(product,index){
                                        return (
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{product.name}</td>
                                                <td><img width="100" height="100" src={baseUrl + '/images/' + product.photo} alt={product.photo}/></td>
                                                <td>{product.description}</td>
                                                <td>{product.quantity}</td>
                                                <td>
                                                    <rt.Link className="btn btn-primary" to={'/product/'+product.id}>View</rt.Link>
                                                    <rt.Link className="btn btn-warning" to={'/product/edit/'+product.id}>edit</rt.Link>
                                                    <rt.Link className="btn btn-danger" to={'/product/delete/'+product.id}>Delete</rt.Link>
                                                </td>
                                            </tr>
                                        )
                                    }
                                )}
                            </tbody>
                        </bs.Table>
                    </div>
                </div>
            </main>
        )
    }
}

export default IndexProduct;
