import { ActionType, createReducer } from "typesafe-actions";
import { INCREASE, DECREASE, INCREASE_BY, actions } from "./actions";
import { CounterState } from "./types";

// 초기상태를 선언합니다.
const initialState: CounterState = {
  count: 0
};

export type CounterAction = ActionType<typeof actions>; // ActionType 를 사용하여 모든 액션 객체들의 타입을 준비해줄 수 있습니다

// 리듀서를 만듭니다
// createReducer 는 리듀서를 쉽게 만들 수 있게 해주는 함수입니다.
// Generics로 리듀서에서 관리할 상태, 그리고 리듀서에서 처리 할 모든 액션 객체들의 타입을 넣어야합니다
const counter = createReducer<CounterState, CounterAction>(initialState, {
  [INCREASE]: state => ({ count: state.count + 1 }), // 액션을 참조 할 필요 없으면 파라미터로 state 만 받아와도 됩니다
  [DECREASE]: state => ({ count: state.count - 1 }),
  [INCREASE_BY]: (state, action) => ({ count: state.count + action.payload }) // 액션의 타입을 유추 할 수 있습니다.
});

export default counter;
