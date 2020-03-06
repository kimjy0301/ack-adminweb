import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

// 이 리덕스 모듈에서 관리 할 상태의 타입을 선언합니다

export type Dept = {
  id: number;
  name: string;
};

export type Lab = {
  id: number;
  name: string;
  dept: Dept;
  call_number: string;
  bg_image: string;
  floor: string;
};

export type Equip = {
  id: number;
  lab: Lab;
  name: string;
  equip_company: string;
  equip_name: string;
  equip_number: string;
};

export type InterfacePcState = {
  id: number;
  ip: string;
  equip: Equip;
  status: string;
  error_count: number;
  position_left: number;
  position_top: number;
};

export type InterfacePcList = {
  count: number;
  next: string;
  previous?: any;
  results: InterfacePcState[];
  isLoading: boolean;
};

export type InterfacePcAction = ActionType<typeof actions>;
