import React from "react";
import "antd/dist/antd.css";
import "./register.scss";
import axios, { AxiosError } from "axios";
import { message } from "antd";
import { API_REGISTER, FormValuesRegister } from "../../../assets/@type/RootConstant";
import { FormRegister } from "./form/FormRegister";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const onFinish = async (values: FormValuesRegister) => {
    console.log({
      lastname: values.lastname,
      firstname: values.firstname,
      // phone: values.phone,
      // address: values.address,
      email: values.email,
      password: values.password,
    });
    try {
      const response = await axios.post(API_REGISTER, {
        lastname: values.lastname,
        firstname: values.firstname,
        // phone: values.phone,
        // address: values.address,
        email: values.email,
        password: values.password,
      });
      // console.log(response);
      message.success(response.data.message);
      navigate("/login");
    } catch (error) {
      const err = error as AxiosError;
      const arr = err.response?.data as { message: string; statusCode: 409 };
      message.error(arr.message);
    }
  };
  return <FormRegister onFinish={onFinish}></FormRegister>;
}
