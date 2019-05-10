import { React, rt, bs, FontAwesomeIcon} from '../../import'
import * as action from "../../actions/action.js";
import {connect} from 'react-redux';
import callApi from '../../callApi'

const baseUrl = 'http://laravel.cc';

class IndexProduct extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            products:[]
        };

    }
    componentDidMount() {
       callApi('product','GET',null)
           .then( (res) => {
               this.setState({products :res.data});
               // this.props.fetchAllProducts(res.data);
           })

    }

    showProducts(){
        // var {products} = this.props;
        // console.log(products);
        let listProducts = this.state.products.map(
            (product,index) => {
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
        )
        return listProducts;

        // if(products.length > 0){
        //     products.map((product,index) => {
        //         return (
        //             <tr key={index}>
        //                 <td>{index+1}</td>
        //                 <td>{product.name}</td>
        //                 <td><img width="100" height="100" src={baseUrl + '/images/' + product.photo} alt={product.photo}/></td>
        //                 <td>{product.description}</td>
        //                 <td>{product.quantity}</td>
        //                 <td>
        //                     <rt.Link className="btn btn-primary" to={'/product/'+product.id}>View</rt.Link>
        //                     <rt.Link className="btn btn-warning" to={'/product/edit/'+product.id}>edit</rt.Link>
        //                     <rt.Link className="btn btn-danger" to={'/product/delete/'+product.id}>Delete</rt.Link>
        //                 </td>
        //             </tr>
        //         )
        //     })
        // }
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
                            {this.showProducts()}
                            {/*{this.state.products.map(function(product,index){*/}
                            {/*        return (*/}
                            {/*            <tr key={index}>*/}
                            {/*                <td>{index+1}</td>*/}
                            {/*                <td>{product.name}</td>*/}
                            {/*                <td><img width="100" height="100" src={baseUrl + '/images/' + product.photo} alt={product.photo}/></td>*/}
                            {/*                <td>{product.description}</td>*/}
                            {/*                <td>{product.quantity}</td>*/}
                            {/*                <td>*/}
                            {/*                    <rt.Link className="btn btn-primary" to={'/product/'+product.id}>View</rt.Link>*/}
                            {/*                    <rt.Link className="btn btn-warning" to={'/product/edit/'+product.id}>edit</rt.Link>*/}
                            {/*                    <rt.Link className="btn btn-danger" to={'/product/delete/'+product.id}>Delete</rt.Link>*/}
                            {/*                </td>*/}
                            {/*            </tr>*/}
                            {/*        )*/}
                            {/*    }*/}
                            {/*)}*/}
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
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllProducts : (products) => {
            dispatch(action.actFetchData(products));
        },
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(IndexProduct)
