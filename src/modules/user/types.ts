import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

// 이 리덕스 모듈에서 관리 할 상태의 타입을 선언합니다
export type UserState = {
  isLogin: boolean;
  isLoading: boolean;
  token: string;
  id: number;
  error: string | undefined;
  errorMsg: string | undefined;
  floorTimer: boolean;
};

export type LoginAction = ActionType<typeof actions>;
