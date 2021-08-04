import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, getInforUser } from '../../actions/auth';
import { postPayment } from '../../actions/payment';
import './cart.css';
import PaypalButton from './PaypalButton';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth.userInfor?.cart);
  const accessToken = useSelector((state) => state.auth.authData);

  // useEffect(() => {
  //     getInforUser(accessToken?.accesstoken)(dispatch);
  // }, [data]);
  // console.log('log cart scree');

  useEffect(() => {
    setCart(data);
  }, []);

  useEffect(() => {
    const getTotal = () => {
      const total = cart?.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(total);
    };
    getTotal();
  }, [cart]);

  const onAddCart = async (cart) => {
    addCart(
      { cart: cart },
      accessToken?.accesstoken
    )(dispatch).then((data) =>
      getInforUser(accessToken?.accesstoken)(dispatch)
    );
  };

  const onIncrement = async (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });
    // clone cart để set lại giá trị cho mảng cart để cập nhật UI mới
    setCart([...cart]);
    // lấy giá trị của cart sau khi loop để update lên server
    onAddCart(cart);
  };

  const onDecrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });
    setCart([...cart]);
    onAddCart(cart);
  };

  const onRemoveProduct = (id) => {
    if (window.confirm('Do you want to delete this product?')) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });

      setCart([...cart]);
      onAddCart(cart);
    }
  };

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;
    postPayment(cart, paymentID, address, accessToken?.accesstoken)(dispatch);
    setCart([]);
    onAddCart([]);
    alert('You have successfully placed an order.');
  };

  if (cart?.length === 0 || accessToken === null)
    return (
      <h2 style={{ textAlign: 'center', fontSize: '5rem' }}>Cart Empty</h2>
    );

  return (
    <div>
      {cart?.map((product) => (
        <div className="detail cart" key={product._id}>
          <img src={product?.images?.url} alt="" />

          <div className="box-detail">
            <h2>{product.title}</h2>

            <h3>$ {product.price * product.quantity}</h3>
            <p>{product.description}</p>
            <p>{product.content}</p>

            <div className="amount">
              <button onClick={() => onDecrement(product._id)}> - </button>
              <span>{product.quantity}</span>
              <button onClick={() => onIncrement(product._id)}> + </button>
            </div>

            <div
              className="delete"
              onClick={() => onRemoveProduct(product._id)}
            >
              X
            </div>
          </div>
        </div>
      ))}

      <div className="total">
        <h3>Total: $ {total}</h3>
        <PaypalButton total={total} tranSuccess={tranSuccess} />
      </div>
    </div>
  );
}
