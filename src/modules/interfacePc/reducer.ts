import { createReducer } from "typesafe-actions";
import { InterfacePcList, InterfacePcAction, InterfacePcState } from "./types";
import {
  INTERFACEPCLIST,
  INTERFACEPCLIST_ERROR,
  INTERFACEPCLIST_SUCCESS,
  INTERFACEPC_SET,
  INTERFACEPC_POSITION,
  INTERFACEPC_POSITION_SUCCESS,
  INTERFACEPC_POSITION_ERROR
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
    }),
    [INTERFACEPC_SET]: (state, action) => {
      state.results.map((value: InterfacePcState) => {
        if (value.id === action.payload.id) {
          value.position_left = action.payload.position_left;
          value.position_top = action.payload.position_top;
        }
        return value;
      });

      return { ...state };
    },
    [INTERFACEPC_POSITION]: (state, action) => ({
      ...state,
      isLoading: true
    }),
    [INTERFACEPC_POSITION_SUCCESS]: (state, action) => ({
      ...state,
      isLoading: false
    }),
    [INTERFACEPC_POSITION_ERROR]: state => ({
      ...state,
      isLoading: false
    })
  }
);

export default interfacePcReducer;
