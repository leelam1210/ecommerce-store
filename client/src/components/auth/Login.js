import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../../actions/auth';
import './login.css';

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    // setUser(e.target.value);
  };

  const loginSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    login(
      user,
      history
    )(dispatch)
      .then((data) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert('Email or password wrong!!!');
      });
  };

  return (
    <div className="login-page">
      <form onSubmit={loginSubmit}>
        <h2>LOGIN</h2>
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={user.email}
          onChange={onChangeInput}
        />

        <input
          type="password"
          name="password"
          required
          autoComplete="on"
          placeholder="Password"
          value={user.password}
          onChange={onChangeInput}
        />

        <div className="row">
          <button type="submit">{loading ? 'Loading...' : 'Login'}</button>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}
