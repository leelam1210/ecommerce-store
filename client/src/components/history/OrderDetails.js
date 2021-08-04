import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './history.css';
import { getHistory } from '../../actions/auth';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getPayment } from '../../actions/payment';

export default function OrderDetails() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [history, setHistory] = useState([]);

  const params = useParams();

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.authData, shallowEqual);
  const user = useSelector((state) => state.auth.userInfor);

  useEffect(() => {
    if (user.role === 1) {
      getPayment(accessToken?.accesstoken)(dispatch)
        .then((data) => {
          setHistory(data);
        })
        .catch((err) => {});
    } else {
      getHistory(accessToken?.accesstoken)(dispatch)
        .then((data) => {
          setHistory(data);
        })
        .then((err) => {});
    }
  }, [accessToken]);

  useEffect(() => {
    if (params.id) {
      history?.forEach((item) => {
        if (item._id === params.id) setOrderDetails(item);
      });
    }
  }, [history, params.id]);

  if (orderDetails.length === 0) return null;

  return (
    <div className="history-page">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Country Code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderDetails.address.recipient_name}</td>
            <td>
              {orderDetails.address.line1 + ' - ' + orderDetails.address.city}
            </td>
            <td>{orderDetails.address.postal_code}</td>
            <td>{orderDetails.address.country_code}</td>
          </tr>
        </tbody>
      </table>

      <table style={{ margin: '30px 0px' }}>
        <thead>
          <tr>
            <th></th>
            <th>Products</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.cart.map((item) => (
            <tr key={item._id}>
              <td>
                <img src={item.images.url} alt="" />
              </td>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>$ {item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
