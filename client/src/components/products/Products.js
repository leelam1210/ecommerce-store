import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addCart, getInforUser } from '../../actions/auth';
import { destroyImage } from '../../actions/image';
import { deleteProducts, getProducts } from '../../actions/products';
import Loading from '../utils/loading/Loading';
import ProductItem from '../utils/productItem/ProductItem';
import Filters from './Filters';
import LoadMore from './LoadMore';
import './products.css';

export default function Products() {
  const [pages, setPages] = useState(1);

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [cart, setCart] = useState([]);

  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.products);
  const accessToken = useSelector((state) => state.auth.authData, shallowEqual);

  useEffect(() => {
    if (accessToken !== null) {
      getInforUser(accessToken?.accesstoken)(dispatch).then((data) => {
        if (data.role === 1) {
          setIsAdmin(true);
        }
      });
    }
  }, [accessToken]);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
  };

  const deleteProduct = async (id, public_id) => {
    destroyImage(public_id, accessToken.accesstoken)(dispatch);
    deleteProducts(
      id,
      accessToken.accesstoken
    )(dispatch).then((data) => {
      getProducts(pages, '', '', '')(dispatch);
      alert('Delete product success!!!');
    });
  };

  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isCheck;
    });
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    products.forEach((product) => {
      if (product.checked)
        deleteProducts(
          product._id,
          accessToken.accesstoken
        )(dispatch).then((data) => {
          getProducts(pages, '', '', '')(dispatch);
          alert('Delete all success!!!');
        });
    });
  };

  const onGetPage = (page) => {
    setPages(page);
  };

  const onAddCart = async (product) => {
    if (accessToken === null) {
      return alert('Please login to continue buying');
    }
    const check = cart.every((item) => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
      addCart(
        { cart: [...cart, { ...product, quantity: 1 }] },
        accessToken?.accesstoken
      )(dispatch).then((data) =>
        getInforUser(accessToken?.accesstoken)(dispatch)
      );
      alert('successfully added a product to the cart');
    } else {
      alert('This product has been added to cart.');
    }
  };

  //   if (loading)
  //     return (
  //       <div>
  //         <Loading />
  //       </div>
  //     );

  return (
    <>
      <Filters pages={pages} />

      {isAdmin && (
        <div className="delete-all">
          <span>Select all</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll} />
          <button onClick={deleteAll}>Delete ALL</button>
        </div>
      )}

      <div className="products">
        {products?.map((product) => {
          return (
            <ProductItem
              key={product?._id}
              product={product}
              isAdmin={isAdmin}
              deleteProduct={deleteProduct}
              handleCheck={handleCheck}
              onAddCart={onAddCart}
            />
          );
        })}
      </div>

      <LoadMore onGetPage={onGetPage} />
      {products?.length === 0 && <Loading />}
    </>
  );
}
