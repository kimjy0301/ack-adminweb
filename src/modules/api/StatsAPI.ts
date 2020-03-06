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

export type EmrifCount = {
  month?: number;
  send_count: number;
  error_count: number;
};
