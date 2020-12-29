import axios from "axios";
import { APIURL, APIURL2 } from "./SettingAPI";
import { ServerStatusState } from "../serverStatus";
import { Dept } from "../interfacePc";

export async function getServerStatus() {
  // Generic 을 통해 응답 데이터의 타입을 설정 할 수 있습니다.

  const token = localStorage.getItem("jwt_token");
  const response = await axios.get<ServerStatusState>(
    `${APIURL}/core/status/`,
    {
      headers: {
        authorization: token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
  );

  const response2 = await axios.get<ServerStatusState>(
    `${APIURL2}/core/status/`,
    {
      headers: {
        authorization: token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
  );


  response.data.cpu2 = response2.data.cpu
  response.data.total_disk2 = response2.data.total_disk
  response.data.free_disk2 = response2.data.free_disk
  response.data.percent_disk2 = response2.data.percent_disk
  response.data.used_disk2 = response2.data.used_disk
  response.data.total_memory2 = response2.data.total_memory
  response.data.free_memory2 = response2.data.free_memory
  response.data.percent_memory2 = response2.data.percent_memory
  response.data.used_memory2 = response2.data.used_memory 

  return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}

export async function getDeptList() {
  const token = localStorage.getItem("jwt_token");
  const response = await axios.get<Dept[]>(`${APIURL}/emrif/dept/`, {
    headers: {
      authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  return response.data;
}
