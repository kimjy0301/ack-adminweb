import { createAction } from "typesafe-actions";

// 액션 type 선언
export const LOGIN = "user/LOGIN";

// 액션 생성함수를 선언합니다
export const login = createAction(LOGIN)();

// 액션 객체 타입 준비
export const actions = { login }; // 모든 액션 생성함수들을 actions 객체에 넣습니다
