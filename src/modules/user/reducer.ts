import { ActionType, createReducer } from "typesafe-actions";
import { LOGIN, actions } from "./actions";
import { UserState } from "./types";

// 초기상태를 선언합니다.
const initialState: UserState = {
  isLogin: false
};

export type UserAction = ActionType<typeof actions>; // ActionType 를 사용하여 모든 액션 객체들의 타입을 준비해줄 수 있습니다

// 리듀서를 만듭니다
// createReducer 는 리듀서를 쉽게 만들 수 있게 해주는 함수입니다.
// Generics로 리듀서에서 관리할 상태, 그리고 리듀서에서 처리 할 모든 액션 객체들의 타입을 넣어야합니다
const counter = createReducer<UserState, UserAction>(initialState, {
  [LOGIN]: state => ({ isLogin: !state.isLogin })
});

export default counter;
