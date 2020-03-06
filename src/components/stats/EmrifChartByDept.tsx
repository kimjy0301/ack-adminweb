import React, { useState, useEffect } from "react";
import {
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ModalPortal from "../modal/ModalPortal";
import DeptSettingModal from "../modal/DeptSettingModal";
import { Dept } from "../../modules/interfacePc";
import { getDeptList } from "../../modules/api/StatusAPI";
import { getEmrifCountByDept, EmrifCount } from "../../modules/api/StatsAPI";

function EmrifChartByDept() {
  const [startDate, setStartDate] = useState(new Date());
  const [viewModal, setViewModal] = useState(false);
  const [deptList, setDeptList] = useState<string[]>([]);
  const [data, setData] = useState<EmrifCount[]>();

  useEffect(() => {
    getDeptList().then(response => {
      let tempList: string[] = [];
      response.map((value: Dept) => tempList.push(value.name));
      setDeptList(tempList);
    });
  }, []);

  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setViewModal(true);
  };

  useEffect(() => {
    getEmrifCountByDept(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      deptList
    ).then(response => {
      setData(response);
    });
  }, [deptList, startDate]);

  return (
    <>
      <div className="bg-white p-3 w-4/5 rounded-md shadow-lg my-5">
        <div className="flex justify-between">
          <div>
            <ReactDatePicker
              className="text-2xl w-40 text-center focus:outline-none focus:border-teal-400 border shadow rounded"
              selected={startDate}
              onChange={date => {
                if (date) {
                  setStartDate(date);
                }
              }}
              dateFormat="yyyy년 MM월"
              showMonthYearPicker
              maxDate={new Date()}
            />
          </div>
          <div>
            <button
              onClick={onClick}
              className="bg-teal-400 text-white px-3 py-1 rounded shadow text-2xl focus:outline-none button-scale"
            >
              부서설정
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            margin={{ top: 30, right: 30, left: 20, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dept" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="send_count" name="전송성공" fill="#68d391" />
            <Bar dataKey="error_count" name="전송실패" fill="#fc8181" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {viewModal && (
        <ModalPortal>
          <DeptSettingModal
            deptList={deptList}
            onClickCancel={() => setViewModal(false)}
            onClickConfirm={() => console.log("object")}
          ></DeptSettingModal>
        </ModalPortal>
      )}
    </>
  );
}

export default EmrifChartByDept;