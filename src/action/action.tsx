// import { state } from "../assets/@type/RootConstant";
import { LOGLIN, LOGOUT, SEARCH_PRODUCT_BY_CATEGORY, SEARCH_USER_BY_ROLE, TOKEN } from "./constant";
const handleLogin = (payload: { token: string }) => {
  return {
    type: LOGLIN,
    payload: payload,
  };
};

const handleLogout = (payload: { token: string } = { token: "" }) => {
  return {
    type: LOGOUT,
    payload: payload,
  };
};

const checktoken = (payload: { token: string }) => {
  return {
    type: TOKEN,
    payload: payload,
  };
};
// const handleData = (payload: any[]) => {
//   return {
//     type: "data",
//     payload: payload,
//   };
// };
//===========================================================Search==============================================//
const handleSearchUser = (payload: { role: number[]; search: string }) => {
  return {
    type: SEARCH_USER_BY_ROLE,
    payload: payload,
  };
};
const handleSearchProduct = (payload: { category: number[] | null; search: string }) => {
  return {
    type: SEARCH_PRODUCT_BY_CATEGORY,
    payload: payload,
  };
};

export { handleLogin, checktoken, handleLogout, handleSearchUser, handleSearchProduct };
