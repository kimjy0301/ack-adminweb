import axios from "axios";
import { APIURL } from "./SettingAPI";
import { ServerStatusState } from "../serverStatus";

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
  return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}
