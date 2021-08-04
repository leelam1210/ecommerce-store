import React, {useEffect, useState} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Cart from './components/cart/Cart';
import Category from './components/categories/Categories';
import CreateProduct from './components/createProduct/CreateProduct';
import DetailProduct from './components/detailProduct/DetailProduct';
import OrderDetails from './components/history/OrderDetails';
import OrderHistory from './components/history/OrderHistory';
import Navbar from './components/navbar/Navbar';
import Products from './components/products/Products';
import NotFound from './components/utils/not_found/NotFound';
import  {useSelector} from 'react-redux';


export default function App() {

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  
  const userInfor = useSelector((state) => state.auth.userInfor);

  useEffect(() => {
    if(userInfor !== null){
      setIsLogged(true);
      if(userInfor?.role === 1){
        setIsAdmin(true);
      }
    }
  }, [userInfor]);

  return (
      <BrowserRouter>
        <div className = "App">
            <Navbar/>
            <Switch>
                <Route path = '/' exact component = {Products}/>
                <Route path = '/detail/:id' exact component = {DetailProduct}/>
                <Route path = '/create_product' exact component = {isAdmin ? CreateProduct : NotFound}/>
                <Route path = '/edit_product/:slug' exact component = {isAdmin ? CreateProduct : NotFound}/>

                <Route path = '/login' exact component = {Login}/>
                <Route path = '/register' exact component = {Register}/>

                <Route path = '/category' exact component = {isAdmin ? Category : NotFound}/>

                <Route path = '/cart' exact component = {Cart}/>

                <Route path = '/history' exact component= {isLogged ? OrderHistory : NotFound}/>
                <Route path = '/history/:id' exact component = {isLogged ? OrderDetails : NotFound}/>

                <Route patch = '*' exact component = {NotFound}/>
            </Switch>
        </div>
      </BrowserRouter>
  );
}
