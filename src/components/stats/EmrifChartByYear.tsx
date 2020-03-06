import React, { useEffect, useState } from "react";
import {
  LineChart,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer
} from "recharts";
import { getEmrifCountByYear, EmrifCount } from "../../modules/api/StatsAPI";

function EmrifChartByYear() {
  const [data, setdata] = useState<EmrifCount[]>();
  const [year, setYear] = useState(2020);
  const [error, setError] = useState();

  useEffect(() => {
    getEmrifCountByYear(year)
      .then(response => {
        setdata(response);
      })
      .catch(response => {
        setError(response);
      });
  }, [year]);

  const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(+event.target.value.replace("년", ""));
  };

  const today = new Date();
  const nowYear = today.getFullYear();
  const startYear = 2017;
  let yearList: number[] = [];
  for (let index = startYear; index < nowYear + 1; index++) {
    yearList.unshift(index);
  }

  return (
    <>
      <div className="flex flex-wrap w-full justify-center">
        <div className="bg-white p-3 w-1/2 rounded-md shadow-lg mt-10 mx-40">
          {error && <span>에러어어</span>}
          <select
            className="focus:outline-none focus:border-teal-400 border px-3 py-1 text-xl text-gray-700"
            onChange={onSelect}
          >
            {yearList.map((value, i) => (
              <option key={i}>{value}년</option>
            ))}
          </select>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={data}
              margin={{ top: 30, right: 30, left: 20, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="send_count"
                name="전송성공"
                stroke="#8884d8"
              />
              <Line
                type="monotone"
                dataKey="error_count"
                name="전송실패"
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default EmrifChartByYear;
