import { createReducer } from "typesafe-actions";
import { InterfacePcList, InterfacePcAction } from "./types";
import {
  INTERFACEPCLIST,
  INTERFACEPCLIST_ERROR,
  INTERFACEPCLIST_SUCCESS
} from "./actions";

// 초기상태를 선언합니다.
const initialState: InterfacePcList = {
  count: 0,
  next: "",
  results: [],
  isLoading: true
};

const interfacePcReducer = createReducer<InterfacePcList, InterfacePcAction>(
  initialState,
  {
    [INTERFACEPCLIST]: state => ({
      ...state,
      isLoading: true
    }),
    [INTERFACEPCLIST_ERROR]: state => ({
      ...state,
      isLoading: false
    }),
    [INTERFACEPCLIST_SUCCESS]: (state, action) => ({
      ...state,
      isLoading: false,
      count: action.payload.count,
      next: action.payload.next,
      previous: action.payload.previous,
      results: action.payload.results
    })
  }
);

export default interfacePcReducer;
