import { ActionType, createReducer } from "typesafe-actions";
import { actions, ADD_ERROR, REMOVE_ERROR, CLEAR_ERROR } from "./actions";
import { ErrorState, ErrorList } from "./types";

// 초기상태를 선언합니다.
const initialState: ErrorList = {
  errorList: []
};

export type ErrorAction = ActionType<typeof actions>;

const counter = createReducer<ErrorList, ErrorAction>(initialState, {
  [ADD_ERROR]: (state, action) => {
    return { ...state, errorList: state.errorList.concat(action.payload) };
  },
  [REMOVE_ERROR]: (state, action) => {
    state.errorList.filter((value: ErrorState) => {
      if (value === action.payload) {
        return false;
      } else {
        return true;
      }
    });
    return { ...state };
  },
  [CLEAR_ERROR]: (state, action) => {
    state.errorList = [];
    return { ...state };
  }
});

export default counter;
