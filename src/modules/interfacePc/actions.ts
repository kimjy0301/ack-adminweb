import { createAsyncAction } from "typesafe-actions";
import { AxiosError } from "axios";
import { InterfacePcList } from "./types";

// 액션 type 선언
export const INTERFACEPCLIST = "interfacepc/INTERFACEPCLIST";
export const INTERFACEPCLIST_SUCCESS = "interfacepc/SUCCESS";
export const INTERFACEPCLIST_ERROR = "interfacepc/ERROR";

// 액션 생성함수를 선언합니다
export const getInterfacePcListAsync = createAsyncAction(
  INTERFACEPCLIST,
  INTERFACEPCLIST_SUCCESS,
  INTERFACEPCLIST_ERROR
)<undefined, InterfacePcList, AxiosError>();
