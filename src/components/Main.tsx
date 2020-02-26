import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules";
import { increase } from "../modules/counter";
import { Redirect } from "react-router-dom";
import {
  LineChart,
  Line,
  CartesianGrid,
  YAxis,
  Tooltip,
  Legend,
  XAxis,
  BarChart,
  Bar,
  AreaChart,
  Area
} from "recharts";
import ServerStatus from "./status/ServerStatus";
const Main = () => {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(increase());
  };

  const data = [
    { name: "1월", success: 400, fail: 531, amt: 3000 },
    { name: "2월", success: 501, fail: 135, amt: 3000 },
    { name: "3월", success: 1034, fail: 501, amt: 3000 },
    { name: "4월", success: 135, fail: 745, amt: 3000 },
    { name: "5월", success: 1237, fail: 900, amt: 3000 },
    { name: "6월", success: 1025, fail: 800, amt: 3000 },
    { name: "7월", success: 1120, fail: 50, amt: 3000 },
    { name: "8월", success: 370, fail: 40, amt: 3000 },
    { name: "9월", success: 415, fail: 800, amt: 3000 },
    { name: "10월", success: 907, fail: 30, amt: 3000 },
    { name: "11월", success: 500, fail: 100, amt: 3000 },
    { name: "12월", success: 100, fail: 50, amt: 3000 }
  ];

  const isLogin = useSelector((state: RootState) => state.user.isLogin);

  return (
    <>
      {isLogin ? (
        <div className="flex items-center justify-center py-5 h-full flex-col">
          <ServerStatus></ServerStatus>

          <div className="bg-white p-3 rounded-md shadow-lg mt-10">
            <LineChart
              width={730}
              height={250}
              data={data}
              margin={{ top: 30, right: 30, left: 20, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="linear"
                dataKey="success"
                name="전송성공"
                stroke="#8884d8"
              />
              <Line
                type="linear"
                dataKey="fail"
                name="전송실패"
                stroke="#82ca9d"
              />
            </LineChart>
          </div>

          <div className="bg-white p-3 rounded-md shadow-lg mt-10">
            <BarChart width={730} height={250} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="success" name="전송성공" fill="#8884d8" />
              <Bar dataKey="fail" name="전송실패" fill="#82ca9d" />
            </BarChart>
          </div>
          <div className="bg-white p-3 rounded-md shadow-lg mt-10">
            <AreaChart
              width={730}
              height={250}
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="success"
                name="전송성공"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
              <Area
                type="monotone"
                dataKey="fail"
                name="전송실패"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorPv)"
              />
            </AreaChart>
          </div>
          <div className="bg-white p-3 rounded-md shadow-lg mt-10">
            <button className="w-32 h-16 bg-white hover:bg-gray-400 duration-300 ease-linear focus:outline-none transition-colors shadow">
              MainPage
            </button>
            <button className="w-32 h-16 bg-white hover:bg-gray-400 duration-300 ease-linear focus:outline-none transition-colors shadow">
              {count}
            </button>
            <button
              onClick={onClick}
              className="w-32 h-16 bg-white hover:bg-gray-400 duration-300 ease-linear focus:outline-none transition-colors shadow"
            >
              Click
            </button>
          </div>
        </div>
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        ></Redirect>
      )}
    </>
  );
};

export default Main;
