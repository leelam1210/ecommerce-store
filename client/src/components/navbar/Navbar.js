import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getInforUser, logoutSuccess } from '../../actions/auth';
import Cart from '../../assets/icon/cart.svg';
import Close from '../../assets/icon/close.svg';
import Menu from '../../assets/icon/menu.svg';
import './navbar.css';

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.authData);
  const user = useSelector((state) => state.auth.userInfor);

  useEffect(() => {
    if (accessToken !== null) {
      setIsLogged(true);
      getInforUser(accessToken?.accesstoken)(dispatch).then((data) => {
        if (data.role === 1) setIsAdmin(true);
      });
    }
  }, [accessToken]);

  const logoutUser = async () => {
    dispatch(logoutSuccess());
    window.location.href = '/login';
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_product">Create Product</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  const styleMenu = {
    left: menu ? 0 : '-100%',
  };

  return (
    <header>
      <div className="menu" onClick={() => setMenu(!menu)}>
        <img src={Menu} alt="" width="30" />
      </div>

      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? 'Admin' : 'LVL Shop'}</Link>
        </h1>
      </div>

      <ul style={styleMenu}>
        <li>
          <Link to="/">{isAdmin ? 'Products' : 'Shop'}</Link>
        </li>

        {isAdmin && adminRouter()}

        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to="/login">Login ✥ Register</Link>
          </li>
        )}

        <li onClick={() => setMenu(!menu)}>
          <img src={Close} alt="" width="30" className="menu" />
        </li>
      </ul>

      {isAdmin ? (
        ''
      ) : (
        <div className="cart-icon">
          {accessToken === null ? (
            <span>0</span>
          ) : (
            <span>{user?.cart?.length}</span>
          )}
          <Link to="/cart">
            <img src={Cart} alt="" width="30" />
          </Link>
        </div>
      )}
    </header>
  );
}
