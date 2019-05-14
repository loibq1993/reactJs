import { React, rt, bs, FontAwesomeIcon} from '../../import'
import * as action from "../../actions/action.js";
import {connect} from 'react-redux';
import callApi from '../../callApi'

const baseUrl = 'http://laravel.cc';

class IndexProduct extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            products : []
        }
    }

    componentDidMount() {
        this.props.fetchAllProducts();
    }

    handleEdit = (id) => {
        callApi(`product/`+id,'get',null)
            .then( (res) => {
                this.props.history.push('/product/'+id+'/edit');
            })
    };

    handleDelete = (id) => {
        if(confirm('Are you sure?')){//eslint-disable-line
            this.props.onDeleteData(id);
        }
    };

    render() {
        let products = this.props.products;
        var _this = this;
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
                            {products.map(function(product,index){
                                    return (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{product.name}</td>
                                            <td><img width="100" height="100" src={baseUrl + '/images/' + product.photo} alt={product.photo}/></td>
                                            <td>{product.description}</td>
                                            <td>{product.quantity}</td>
                                            <td>
                                                <rt.Link className="btn btn-primary" to={'/product/'+product.id}>View</rt.Link>
                                                <bs.Button
                                                    onClick={_this.handleEdit.bind(this, product.id)} //error while using this. have to change to _this
                                                    className="btn btn-warning"
                                                >
                                                    Edit
                                                </bs.Button>
                                                <bs.Button
                                                    onClick={_this.handleDelete.bind(this, product.id)} //error while using this. have to change to _this
                                                    className="btn btn-danger"
                                                >
                                                    Delete
                                                </bs.Button>
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

const mapStateToProps = state => {
    return {
        products :state.products
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllProducts : () => {
            dispatch(action.actRequestFetchData());
        },
        onDeleteData : (id) => {
            dispatch(action.actRequestDeleteData(id));
        }
    }
};



export default connect(mapStateToProps,mapDispatchToProps)(IndexProduct)
