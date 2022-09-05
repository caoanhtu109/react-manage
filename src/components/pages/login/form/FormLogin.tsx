import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";

import { Link } from "react-router-dom";
import { submitLogin } from "../../../../assets/@type/typeF";

export const FormLogin = ({ onFinish }: { onFinish: submitLogin }) => {
  return (
    <div className="contaier">
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
        <h3>Login</h3>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
              type: "email",
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Form.Item valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to="../Register">register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};
