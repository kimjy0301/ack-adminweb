import { createAsyncAction, createAction } from "typesafe-actions";
import { AxiosError } from "axios";
import { UserState } from "./types";
import { typeLoginRequest } from "../../api/loginAPI";

// 액션 type 선언
export const LOGIN = "user/LOGIN";
export const LOGOUT = "user/LOGOUT";
export const LOGIN_SUCCESS = "user/SUCCESS";
export const LOGIN_ERROR = "user/ERROR";
export const SET_USER = "set/USER";

// 액션 생성함수를 선언합니다
export const logout = createAction(LOGOUT)();
export const setuser = createAction(SET_USER)<UserState>();

// 액션 생성함수를 선언합니다
export const getLoginAsync = createAsyncAction(
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR
)<typeLoginRequest, UserState, AxiosError>();
