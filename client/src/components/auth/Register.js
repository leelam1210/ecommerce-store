import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './login.css';
import { register } from '../../actions/auth';
import { useDispatch } from 'react-redux';
export default function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    register(
      user,
      history
    )(dispatch)
      .then((data) => {
        setLoading(false);
        alert('Register success!!!');
      })
      .catch((data) => {
        setLoading(false);
      });
  };

  return (
    <div className="login-page">
      <form onSubmit={registerSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          name="name"
          required
          placeholder="Name"
          value={user.name}
          onChange={onChangeInput}
        />

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
          <button type="submit">{loading ? 'Loading...' : 'Register'}</button>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
