interface rootState {
  hoby: {
    User: {
      id: string;
      token: string;
    };
  };
  search: {
    Search: {
      user: {
        role: 0;
        search: string;
      };
      product: {
        category: number[];
        search: string;
      };
    };
  };
}
/////////////////////////////
type FormValuesLogin = {
  email: string;
  password: string;
};
type FormValuesRegister = {
  lastname: string;
  firstname: string;
  // phone: string;
  // address: string;
  email: string;
  password: string;
};

type RegistCommon = {
  name?: string;
  id?: number;
};
interface state {
  User: {
    // data: [] | undefined;
    id: string;
    token: string;
  };
}
interface stateSearch {
  Search: {
    user: {
      role: number[];
      search: string;
    };
    product: {
      category: number[];
      search: string;
    };
  };
}
interface Action {
  type: string;
  payload: {
    // id:string,
    token: string;
  };
}
interface btn {
  Text: string;
  class: string;
}
interface input {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}
interface fiel {
  name: string;
  title: string;
  value?: unknown;
  type?: string;
}
interface Category {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}
interface Role {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}
interface inputUser {
  id?: number;
  address: string;
  email: string;
  phone: string;
  roles: string[];
  lastname: string;
  firstname: string;
}
interface Product {
  category: Category[];
  created_at: string;
  description?: string;
  id: number;
  image: string;
  name: string;
  price: string;
  updated_at?: string;
}
interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  roles: { id: number; name: string }[];
  created_at: string;
  updated_at: string;
}
interface Order {
  key: number;
  iD: number;
  userid: number;
  username: string;
  totalprice: number;
  status: string;
  Created: string;
  Updated: string;
  Action: string;
}

const BADREQUEST = 400;
const SUCCESS = 200;
const API = "http://localhost:8000";
const API_LOGIN = `${API}/api/auth/login`;
const API_REGISTER = `${API}/api/auth/register`;
const API_PROFILE = `${API}/api/auth/profile`;
const API_CATEGORY = `${API}/api/categories`;
const API_PRODUCT = `${API}/api/products`;
const API_ROLE = `${API}/api/roles`;
const API_USER = `${API}/api/user`;
const API_ORDER = `${API}/api/orders`;

export type {
  FormValuesLogin,
  state,
  Action,
  btn,
  FormValuesRegister,
  RegistCommon,
  fiel,
  input,
  stateSearch,
  rootState,
  Category,
  Product,
  Role,
  User,
  inputUser,
  Order,
};
export {
  BADREQUEST,
  SUCCESS,
  API_LOGIN,
  API_REGISTER,
  API_PROFILE,
  API_CATEGORY,
  API_USER,
  API_PRODUCT,
  API_ROLE,
  API_ORDER,
};
