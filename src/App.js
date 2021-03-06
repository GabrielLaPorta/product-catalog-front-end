import React from 'react';
import './App.css';
import { useRoutes, BrowserRouter } from "react-router-dom";
import PrivateRoute from './components/private-route'
import NotFount from './components/not-found'

import { history } from './history'
import Login from './pages/login/login'
import Home from './pages/home/home'
import Products from './pages/admin/products/products';
import ProductFormWithNavigate from './pages/admin/products/product-form';

const MyRoutes = (props) => {
  let routes = useRoutes([
    { index: true, element: <Home {...props}/>},
    { path: "/login", element: <Login  {...props}/>},
    { path: "/home", element:<Home {...props}/>},
    { path: "/admin", element: <PrivateRoute {...props}/> , 
      children:[
        {path: "/admin/home", element:<Home {...props}/>},
        {path: "/admin/products", element:<Products {...props}/>},
        {path: "/admin/products/form", element:<ProductFormWithNavigate {...props}/>},
        {path: "/admin/products/form/:id", element:<ProductFormWithNavigate {...props}/>}
      ],
    },
    { path: "*", element: <NotFount /> },
  ]);
  return routes;
};

const App = (props) => {
    return (
      <main className="App">
        <BrowserRouter history={history} forceRefresh={true}>
          <MyRoutes {...props}/>
        </BrowserRouter>
      </main>
    )
}

export default App;