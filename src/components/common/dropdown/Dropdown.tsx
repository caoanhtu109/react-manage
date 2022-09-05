import React from "react";
import { ADMIN, LOGOUT } from "../../../action/constant";
import "antd/dist/antd.css";
import { Menu, Dropdown, message } from "antd";
import { click } from "../../../assets/@type/typeF";
import "./dropdowncustom.scss";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
export const Dropdowncustom = ({ array, click }: { array: string[]; click: click }) => {
  const navigate = useNavigate();
  const onClick = ({ key }: { key: string }) => {
    switch (key) {
      case LOGOUT: {
        click();
        message.success("Successful logout !");
        break;
      }
      case ADMIN: {
        navigate("admin");
        break;
      }
      default:
        break;
    }
  };
  const menu = (
    <Menu onClick={onClick}>
      {array.map(e => (
        <Menu.Item key={e}>{e}</Menu.Item>
      ))}
    </Menu>
  );
  return (
    <div>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          <UserOutlined />
        </a>
      </Dropdown>
    </div>
  );
};
