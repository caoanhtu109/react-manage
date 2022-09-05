import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { submitRegister } from "../../../../assets/@type/typeF";

export const FormRegister = ({ onFinish }: { onFinish: submitRegister }) => {
  return (
    <div className="contaier">
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
        <h3>Register</h3>
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
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="firstname"
          rules={[
            {
              required: true,
              message: "Please input your first name!",
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="lastname"
          rules={[
            {
              required: false,
              message: "Please input your last name!",
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Last Name" />
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
        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error("The two passwords that you entered do not match!"));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Item>
        {/* <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: "Please input your Address!",
            },
          ]}
        >
          <Input prefix={<HomeOutlined className="site-form-item-icon" />} placeholder="Address" />
        </Form.Item> */}
        {/* <Form.Item
          name="phone"
          rules={[
            {
              pattern: new RegExp("^[0-9]{9,10}$"),
              required: true,
              message: "Please input your Phone!",
            },
          ]}
        >
          <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="Phone" />
        </Form.Item> */}

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
