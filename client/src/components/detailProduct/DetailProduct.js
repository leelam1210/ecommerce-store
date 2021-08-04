import React, { useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import ProductItem from '../utils/productItem/ProductItem';
import {useSelector, useDispatch} from 'react-redux';
import './detailProduct.css';
import {addCart} from '../../actions/auth';

function DetailProduct() {
    const [detailProduct, setDetailProduct] = useState(null);

    const params = useParams();
    const dispatch = useDispatch();

    const listProduct = useSelector((state) => state.product.products);
    const accessToken = useSelector((state) => state.auth.authData);

    useEffect(() =>{
        if(params.id){

            listProduct.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    },[params.id, listProduct]);

    const onAddCart = () => {
        addCart({cart: {...detailProduct, quantity: 1}}, accessToken?.accesstoken)(dispatch);
    }

    if(detailProduct?.length === 0) return null;

    return (
        <>
            <div className="detail">
                <img src={detailProduct?.images.url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailProduct?.title}</h2>
                        <h6>#id: {detailProduct?.product_id}</h6>
                    </div>
                    <span>$ {detailProduct?.price}</span>
                    <p>{detailProduct?.description}</p>
                    <p>{detailProduct?.content}</p>
                    <p>Sold: {detailProduct?.sold}</p>
                    <Link to="/cart" className="cart"
                    onClick={() => onAddCart(detailProduct)}>
                        Buy Now
                    </Link>
                </div>
            </div>

            <div>
                <h2>Related products</h2>
                <div className="products">
                    {
                        listProduct.map(product => {
                            return product.category === detailProduct?.category 
                                ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailProduct
