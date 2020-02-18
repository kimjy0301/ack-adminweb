import { createAction } from "typesafe-actions";

// 액션 type 선언
export const INCREASE = "counter/INCREASE";
export const DECREASE = "counter/DECREASE";
export const INCREASE_BY = "counter/INCREASE_BY";

// 액션 생성함수를 선언합니다
export const increase = createAction(INCREASE)();
export const decrease = createAction(DECREASE)();
export const increaseBy = createAction(INCREASE_BY)<number>(); // payload 타입을 Generics 로 설정해주세요.

// 액션 객체 타입 준비
export const actions = { increase, decrease, increaseBy }; // 모든 액션 생성함수들을 actions 객체에 넣습니다
