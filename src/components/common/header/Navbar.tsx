import React from "react";
import "./Header.scss";
import "antd/dist/antd.css";

import { Link, Outlet } from "react-router-dom";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { handleLogout } from "../../../action/action";

import { Dropdowncustom } from "../dropdown/Dropdown";
import { rootState } from "../../../assets/@type/RootConstant";
// import { state } from "../../../assets/@type/RootConstant";

function NavbarHeader() {
  // console.log(useSelector<any>(state => state.hoby.User.token));
  const checkLogin = useSelector<rootState>(state => state.hoby.User.token);

  const dispatch = useDispatch();
  // const [checkLogin, setCheckLogin] = useState<boolean>(false);
  const Logout = () => {
    dispatch(handleLogout({ token: "" }));
  };
  return (
    <div style={{ height: "100%" }}>
      <div className="Header">
        <div className="Header-navleft">
          {/* <Link to="/"> */}
          <Button style={{ userSelect: "none", pointerEvents: "none" }} type="text">
            3siD
          </Button>
          {/* </Link> */}
          <Link to="/category">
            <Button type="text"></Button>
          </Link>
        </div>
        <div className="Header-navright">
          {checkLogin !== "" ? (
            // <Link to="/">
            //   <Button onClick={Logout} type="text">
            //     Logout
            //   </Button>
            // </Link>
            <Dropdowncustom array={["Logout", "Admin"]} click={Logout}></Dropdowncustom>
          ) : (
            <Link to="/login">
              <Button type="text">Login</Button>
            </Link>
          )}
        </div>
      </div>

      <Outlet></Outlet>
    </div>
  );
}

export default NavbarHeader;
