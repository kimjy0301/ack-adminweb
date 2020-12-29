import React, { useState, useEffect } from "react";
import {
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ModalPortal from "../../modal/ModalPortal";
import DeptSettingModal from "../../modal/DeptSettingModal";
import { Dept } from "../../../modules/interfacePc";
import { getDeptList } from "../../../modules/api/StatusAPI";
import { getEmrifCountByDept, EmrifCount } from "../../../modules/api/StatsAPI";
import Modal from "../../modal/Modal";
import { useDispatch } from "react-redux";
import { addError } from "../../../modules/error";

import { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";

function EmrifChartByDept() {
  registerLocale("ko", ko);
  const [startDate, setStartDate] = useState(new Date());
  const [viewModal, setViewModal] = useState(false);
  const [deptList, setDeptList] = useState<string[]>([]);
  const [data, setData] = useState<EmrifCount[]>();
  const dispatch = useDispatch();

  useEffect(() => {
    getDeptList()
      .then((response) => {
        let tempList: string[] = [];
        response.map((value: Dept) => tempList.push(value.name));
        setDeptList(tempList);
      })
      .catch((reason) => {
        dispatch(addError({ errorMsg: reason.message }));
      });
  }, [dispatch]);

  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setViewModal(true);
  };

  useEffect(() => {
    getEmrifCountByDept(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      deptList
    ).then((response) => {
      setData(response);
    });
  }, [deptList, startDate]);

  return (
    <>
      <div className="bg-white p-3 w-4/5 rounded-md shadow-lg my-5">
        <div className="flex justify-between">
          <div>
            <ReactDatePicker
              locale="ko"
              className="text-xl w-40 text-center focus:outline-none focus:border-teal-400 border shadow rounded"
              selected={startDate}
              onChange={(date) => {
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
              className="hidden bg-teal-400 text-white px-3 py-1 rounded shadow text-2xl focus:outline-none button-scale"
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
            <Bar dataKey="send_count" name="전송성공" fill="#2c5282" />
            <Bar dataKey="error_count" name="에러건수" fill="#9b2c2c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {viewModal && (
        <ModalPortal>
          <Modal onClickCancel={() => setViewModal(false)}>
            <DeptSettingModal deptList={deptList}></DeptSettingModal>
          </Modal>
        </ModalPortal>
      )}
    </>
  );
}

export default EmrifChartByDept;
