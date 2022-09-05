import React from "react";
import "antd/dist/antd.css";
import "./login.scss";
import axios, { AxiosError } from "axios";
import { message } from "antd";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { handleLogin } from "../../../action/action";
import { useDispatch, useSelector } from "react-redux";
import { API_LOGIN, FormValuesLogin, rootState } from "../../../assets/@type/RootConstant";
import { FormLogin } from "./form/FormLogin";

export default function Login() {
  const log = localStorage.getItem("token");
  // console.log(useSelector<any>(state => state));
  const checkLogin = useSelector<rootState>(state => state.hoby.User.token);
  const disphatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  React.useEffect(() => {
    if (log && log !== "") navigate("/");
  }, [checkLogin]);
  const onFinish = async (values: FormValuesLogin) => {
    try {
      const response = await axios.post(API_LOGIN, {
        email: values.email,
        password: values.password,
      });
      console.log(response);
      disphatch(handleLogin({ token: response.data.access_token }));
      localStorage.setItem("token", response.data.access_token);
      message.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      const err = error as AxiosError;
      const arr = err.response?.data as { message: string; statusCode: 409 };
      message.error(arr.message);
    }
  };
  return <div>{checkLogin === "" ? <FormLogin onFinish={onFinish} /> : <div>Not Found</div>}</div>;

  // if (checkLogin === "") {
  //   return <FormLogin onFinish={onFinish} />;
  // } else {
  //   return <div>Not Found</div>;
  // }
}
