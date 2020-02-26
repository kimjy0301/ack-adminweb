import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

// 이 리덕스 모듈에서 관리 할 상태의 타입을 선언합니다
export type ServerStatusState = {
  total_disk: number;
  free_disk: number;
  percent_disk: number;
  used_disk: number;
  total_memory: number;
  free_memory: number;
  percent_memory: number;
  used_memory: number;
  cpu: number;
  isLoading: boolean;
};

export type ServerStatusAction = ActionType<typeof actions>;
