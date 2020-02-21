import axios from "axios";
import { APIURL } from "./SettingAPI";

export async function getUserToken(loginRequest: typeLoginRequest) {
  // Generic 을 통해 응답 데이터의 타입을 설정 할 수 있습니다.

  const response = await axios.post<typeLoginResponse>(
    `${APIURL}/users/login/`,
    loginRequest
  );
  return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}

export type typeLoginRequest = {
  username: string;
  password: string;
};

export type typeLoginResponse = {
  token: string;
  id: number;
};
