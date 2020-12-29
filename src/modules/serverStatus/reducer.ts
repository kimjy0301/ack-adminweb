import { createReducer } from "typesafe-actions";
import {
  SERVERSTATUS,
  SERVERSTATUS_ERROR,
  SERVERSTATUS_SUCCESS
} from "./actions";
import { ServerStatusState, ServerStatusAction } from "./types";

// 초기상태를 선언합니다.
const initialState: ServerStatusState = {
  cpu: 0,
  free_disk: 0,
  free_memory: 0,
  percent_disk: 0,
  percent_memory: 0,
  total_disk: 0,
  total_memory: 0,
  used_disk: 0,
  used_memory: 0,
  total_disk2: 0,
  free_disk2: 0,
  percent_disk2: 0,
  used_disk2: 0,
  total_memory2: 0,
  free_memory2: 0,
  percent_memory2: 0,
  used_memory2: 0,
  cpu2: 0,
  isLoading: true
};

const serverStatusReducer = createReducer<
  ServerStatusState,
  ServerStatusAction
>(initialState, {
  [SERVERSTATUS]: state => ({
    ...state,
    isLoading: true
  }),
  [SERVERSTATUS_ERROR]: state => ({
    ...state,
    isLoading: false
  }),
  [SERVERSTATUS_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    cpu: action.payload.cpu,
    free_disk: action.payload.free_disk,
    free_memory: action.payload.free_memory,
    percent_disk: action.payload.percent_disk,
    percent_memory: action.payload.percent_memory,
    total_disk: action.payload.total_disk,
    total_memory: action.payload.total_memory,
    used_disk: action.payload.used_disk,
    used_memory: action.payload.used_memory,
    cpu2: action.payload.cpu2,
    total_disk2: action.payload.total_disk2,
    free_disk2: action.payload.free_disk2,
    percent_disk2: action.payload.percent_disk2,
    used_disk2: action.payload.used_disk2,
    total_memory2: action.payload.total_memory2,
    free_memory2: action.payload.free_memory2,
    percent_memory2: action.payload.percent_memory2,
    used_memory2: action.payload.used_memory2,
  })
});


export default serverStatusReducer;
