import axios from "axios";
import { APIURL } from "./SettingAPI";

export async function getEmrifCountByYear(year: number) {
  const url = `${APIURL}/core/stats/emrifyear/?year=${year}`;

  const token = localStorage.getItem("jwt_token");
  const response = await axios.get<EmrifCount[]>(url, {
    headers: {
      authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  return response.data;
}

export async function getEmrifCountByWeek(year: number, week: number) {
  const url = `${APIURL}/core/stats/emrifweek/?year=${year}&week=${week}`;
  const token = localStorage.getItem("jwt_token");
  const response = await axios.get<EmrifCount>(url, {
    headers: {
      authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  return response.data;
}

export async function getEmrifCountByDept(
  year: number,
  month: number,
  deptList: string[]
) {
  let paramStr = "";

  for (let index = 0; index < deptList.length; index++) {
    if (index < deptList.length - 1) {
      paramStr += deptList[index] + ",";
    } else {
      paramStr += deptList[index];
    }
  }

  const url = `${APIURL}/core/stats/emrifdept/?year=${year}&month=${month}&dept=${paramStr}`;

  const token = localStorage.getItem("jwt_token");
  const response = await axios.get<EmrifCount[]>(url, {
    headers: {
      authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  return response.data;
}

export type EmrifCount = {
  month?: number;
  dept?: string;
  send_count: number;
  error_count: number;
};
