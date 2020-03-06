import { createAsyncAction, createAction } from "typesafe-actions";
import { AxiosError } from "axios";
import { InterfacePcList, InterfacePcState } from "./types";
import { InterfacePcPosition } from "../api/InterfacePcAPI";

// 액션 type 선언
export const INTERFACEPCLIST = "interfacepc/INTERFACEPCLIST";
export const INTERFACEPCLIST_SUCCESS = "interfacepc/SUCCESS";
export const INTERFACEPCLIST_ERROR = "interfacepc/ERROR";
export const INTERFACEPC_SET = "interfacepc/SET";
export const INTERFACEPC_POSITION = "interpacepc/INTERFACEPC_POSITION";
export const INTERFACEPC_POSITION_SUCCESS =
  "interfacepc/INTERFACEPC_POSITION/SUCCESS";
export const INTERFACEPC_POSITION_ERROR =
  "interfacepc/INTERFACEPC_POSITION/ERROR";

export const interfacepc_set = createAction(INTERFACEPC_SET)<
  InterfacePcState
>();

// 액션 생성함수를 선언합니다
export const getInterfacePcListAsync = createAsyncAction(
  INTERFACEPCLIST,
  INTERFACEPCLIST_SUCCESS,
  INTERFACEPCLIST_ERROR
)<undefined, InterfacePcList, AxiosError>();

export const setInterfacePcPositionAsync = createAsyncAction(
  INTERFACEPC_POSITION,
  INTERFACEPC_POSITION_SUCCESS,
  INTERFACEPC_POSITION_ERROR
)<InterfacePcPosition, InterfacePcState, AxiosError>();
