import { combineReducers } from "redux";
import { LOGLIN, LOGOUT, SEARCH_PRODUCT_BY_CATEGORY, SEARCH_USER_BY_ROLE, TOKEN } from "../action/constant";
import { Action, state, stateSearch } from "../assets/@type/RootConstant";
const initstateReducer: state = {
  User: {
    id: "",
    token: "",
  },
};
const initstateSearch: stateSearch = {
  Search: {
    user: { role: [], search: "" },
    product: { category: [], search: "" },
  },
};

const reducer = (state: state = initstateReducer, action: Action) => {
  // | any
  switch (action.type) {
    case LOGLIN: {
      return { ...state, User: { ...state.User, token: action.payload.token } };
    }
    case "data": {
      return { ...state, User: { ...state.User, data: action.payload } };
    }
    case TOKEN: {
      return { ...state, User: { ...state.User, ...action.payload } };
    }
    case LOGOUT: {
      // console.log("hihi");
      localStorage.removeItem("token");

      return { ...state, User: { ...state.User, token: "" } };
    }
    default:
      return state;
  }
};
const search = (state: stateSearch = initstateSearch, action: Action | any) => {
  switch (action.type) {
    case SEARCH_USER_BY_ROLE: {
      // console.log("asd", action.payload);
      // console.log({ ...state, user: action.payload });
      return {
        ...state,
        Search: {
          product: state.Search.product,
          user: action.payload,
        },
      };
    }
    case SEARCH_PRODUCT_BY_CATEGORY: {
      // console.log("asd", action.payload);
      // console.log({ ...state, user: action.payload });
      return {
        ...state,
        Search: {
          product: action.payload,
          user: state.Search.user,
        },
      };
    }
    default:
      return state;
  }
};
const rootReduce = combineReducers({
  hoby: reducer,
  search: search,
});
export default rootReduce;
