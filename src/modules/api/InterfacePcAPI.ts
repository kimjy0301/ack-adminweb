import axios from "axios";
import { APIURL } from "./SettingAPI";
import { InterfacePcList, InterfacePcState, InterfaceErrorList, InterfaceError } from "../interfacePc";

export async function getInterfacePcList() {
  // Generic 을 통해 응답 데이터의 타입을 설정 할 수 있습니다.

  const token = localStorage.getItem("jwt_token");
  const response = await axios.get<InterfacePcList>(`${APIURL}/emrif/pc/`, {
    headers: {
      authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}
export async function getInterfacePcListWithDate(
  startdate: string,
  enddate: string
) {
  const token = localStorage.getItem("jwt_token");
  const response = await axios.get<InterfacePcList>(
    `${APIURL}/emrif/pc/?startdate=${startdate}&enddate=${enddate}`,
    {
      headers: {
        authorization: token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
  );
  return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}


export async function getInterfacePcError(
  id: number | undefined,
) {
  const token = localStorage.getItem("jwt_token");
  const response = await axios.get<InterfaceErrorList>(
    `${APIURL}/emrif/error/search/?emrifpcid=${id}&state_flag=L`,
    {
      headers: {
        authorization: token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
  );
  return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}

export async function deleteAllInterfacePcError(
) {
  const token = localStorage.getItem("jwt_token");
  const response = await axios.post(
    `${APIURL}/emrif/error/deleteall/`,
    {
      headers: {
        authorization: token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
  );

  return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}
export async function putInterfacePcError(
  id: number | undefined,
  stateflag: string,
) {


  const data = { state_flag: stateflag };

  const token = localStorage.getItem("jwt_token");
  const response = await axios.put<InterfaceError>(
    `${APIURL}/emrif/error/${id}/`,
    data,
    {
      headers: {
        authorization: token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
  );
  return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}



export async function setInterfacePcPosition(putBody: InterfacePcPosition) {
  const token = localStorage.getItem("jwt_token");
  const response = await axios.put<InterfacePcState>(
    `${APIURL}/emrif/pc/${putBody.id}/`,
    putBody,
    {
      headers: {
        authorization: token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
  );

  return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}

export type InterfacePcPosition = {
  id: number;
  position_left: number;
  position_top: number;
};
