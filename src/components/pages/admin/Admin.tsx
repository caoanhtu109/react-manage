import React, { useState } from "react";
import "antd/dist/antd.css";
import "./admin.scss";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  MenuOutlined,
  UsergroupAddOutlined,
  AccountBookOutlined,
  HomeOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { rootState } from "../../../assets/@type/RootConstant";

const { Header, Sider, Content } = Layout;

const Admin = () => {
  // const a = "[1, 2, 3]";
  // const b = JSON.parse(a);
  // console.log(a);
  // console.log(b);

  const location = useLocation().pathname.substring(7, useLocation().pathname.length) || "Home";
  // console.log(location);
  const navigate = useNavigate();
  // const [key, setkey] = useState<string>("");
  const checkLogin = useSelector<rootState>(state => state.hoby.User.token);
  React.useEffect(() => {
    if (checkLogin === "") navigate("/login");
  });
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div id="Admin">
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo"></div>

          <Menu
            onClick={e => {
              navigate(e.key);
            }}
            theme="light"
            mode="inline"
            // defaultSelectedKeys={["Category"]}
            selectedKeys={[location != "" ? location : "Home"]}
            items={[
              {
                key: "Home",
                icon: <HomeOutlined />,
                label: "Home",
              },
              {
                key: "categories",
                icon: <MenuOutlined />,
                label: "Categoris",
              },
              {
                key: "roles",
                icon: <UsergroupAddOutlined />,
                label: "Roles",
              },
              // {
              //   key: "User",
              //   icon: <UserOutlined />,
              //   label: "User",
              // },
              {
                key: "products",
                icon: <AccountBookOutlined />,
                label: "Products",
              },
              {
                key: "users",
                icon: <UserOutlined />,
                label: "Users",
              },
              {
                key: "orders",
                icon: <OrderedListOutlined />,
                label: "Orders",
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            })}
            <a style={{ textTransform: "capitalize", userSelect: "none", pointerEvents: "none" }}>{`Admin / ${location
              .split("/")
              .join(" / ")}`}</a>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              // overflow: "visible",
              margin: "24px 16px",
              padding: 24,
              minHeight: "fit-content",
            }}
          >
            {/* <Image
                            width={200}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        /> */}
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Admin;
