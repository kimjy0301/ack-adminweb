import { createAsyncAction } from "typesafe-actions";
import { AxiosError } from "axios";
import { ServerStatusState } from "./types";

// 액션 type 선언
export const SERVERSTATUS = "status/SERVERSTATUS";
export const SERVERSTATUS_SUCCESS = "status/SUCCESS";
export const SERVERSTATUS_ERROR = "status/ERROR";

// 액션 생성함수를 선언합니다
export const getServerStateAsync = createAsyncAction(
  SERVERSTATUS,
  SERVERSTATUS_SUCCESS,
  SERVERSTATUS_ERROR
)<undefined, ServerStatusState, AxiosError>();
