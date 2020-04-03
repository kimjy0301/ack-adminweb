import { createAction } from "typesafe-actions";
import { ErrorState } from "./types";

// 액션 type 선언
export const ADD_ERROR = "error/ADD";
export const REMOVE_ERROR = "error/REMOVE";
export const CLEAR_ERROR = "error/CLEAR";

// 액션 생성함수를 선언합니다
export const addError = createAction(ADD_ERROR)<ErrorState>();
export const removeError = createAction(REMOVE_ERROR)<ErrorState>();
export const clearError = createAction(CLEAR_ERROR)(); // payload 타입을 Generics 로 설정해주세요.

// 액션 객체 타입 준비
export const actions = { addError, removeError, clearError }; // 모든 액션 생성함수들을 actions 객체에 넣습니다
