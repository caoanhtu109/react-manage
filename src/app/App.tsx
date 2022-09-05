import React from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Login from "../components/pages/login/Login";
import NavbarHeader from "../components/common/header/Navbar";
import { useDispatch } from "react-redux";
import { checktoken } from "../action/action";
import Register from "../components/pages/register/Register";
import Profile from "../components/pages/admin/Admin";
import { TOKEN } from "../action/constant";

import CategoryPage from "../components/pages/category/Category";
import Roles from "../components/pages/roles/Role";
import ProductPage from "../components/pages/product/Product";
import Users from "../components/pages/users/Users";
import Home from "../components/pages/home/Home";
import Orders from "../components/pages/orders/Order";
import OrderDetail from "../components/pages/orders/order-detail/Order-detail";
import EditrOder from "../components/pages/orders/edit/EditOrder";
import OrderCreate from "../components/pages/orders/create/CreateOrder";

function App() {
  const dispatch = useDispatch();
  const token: string = localStorage.getItem(TOKEN) || "";
  if (token !== "") {
    dispatch(checktoken({ token: token }));
  }
  return (
    <Routes>
      <Route path="/" element={<NavbarHeader />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="admin" element={<Profile />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="categories" element={<CategoryPage />} />
          <Route path="roles" element={<Roles />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/detail/:id" element={<OrderDetail />} />
          <Route path="orders/create" element={<OrderCreate />} />
          <Route path="orders/edit/:id" element={<EditrOder />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
