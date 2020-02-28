import { createReducer } from "typesafe-actions";
import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, SET_USER } from "./actions";
import { UserState, LoginAction } from "./types";

// 초기상태를 선언합니다.
const initialState: UserState = {
  isLogin: false,
  isLoading: false,
  token: "",
  id: 0,
  error: undefined,
  errorMsg: undefined
};

const userReducer = createReducer<UserState, LoginAction>(initialState, {
  [LOGIN]: state => ({
    ...state,
    isLogin: false,
    isLoading: true
  }),
  [LOGOUT]: state => ({
    ...state,
    isLogin: false,
    isLoading: false,
    id: 0,
    token: ""
  }),
  [LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    isLogin: true,
    isLoading: false,
    id: action.payload.id,
    token: action.payload.token,
    error: "",
    errorMsg: ""
  }),
  [LOGIN_ERROR]: (state, action) => ({
    ...state,
    isLogin: false,
    isLoading: false,
    error: action.payload.message,
    errorMsg: action.payload.response?.data
  }),
  [SET_USER]: (state, action) => (state = action.payload)
});

export default userReducer;
