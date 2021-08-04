import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './history.css';
import { getPayment } from '../../actions/payment';
import { getHistory } from '../../actions/auth';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

export default function OrderHistory() {
  const [history, setHistory] = useState([]);

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.authData, shallowEqual);
  const user = useSelector((state) => state.auth.userInfor);

  useEffect(() => {
    if (user.role === 1) {
      getPayment(accessToken?.accesstoken)(dispatch).then((data) => {
        setHistory(data);
      });
    } else {
      getHistory(accessToken?.accesstoken)(dispatch).then((data) => {
        setHistory(data);
      });
    }
  }, [accessToken]);

  return (
    <div className="history-page">
      <h2>History</h2>

      <h4>You have {history.length} ordered</h4>

      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Date of Purchased</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {history?.map((items) => (
            <tr key={items._id}>
              <td>{items.paymentID}</td>
              <td>{new Date(items.createdAt).toLocaleDateString()}</td>
              <td>
                <Link to={`/history/${items._id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
