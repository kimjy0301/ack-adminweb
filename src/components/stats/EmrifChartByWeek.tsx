import React, { useEffect, useState } from "react";
import { EmrifCount, getEmrifCountByWeek } from "../../modules/api/StatsAPI";
import weekCount from "../../lib/weekCount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { addError } from "../../modules/error";

function EmrifChartByWeek() {
  const [weekData, setWeekData] = useState<EmrifCount>();
  const [lastWeekData, setLastWeekData] = useState<EmrifCount>();
  const today = new Date();
  const nowYear = today.getFullYear();
  const dispatch = useDispatch();
  const week = weekCount(today);
  useEffect(() => {
    getEmrifCountByWeek(nowYear, week)
      .then(response => {
        setWeekData(response);
      })
      .catch(reason => {
        dispatch(addError({ errorMsg: reason.message }));
      });
  }, [nowYear, week, dispatch]);
  useEffect(() => {
    getEmrifCountByWeek(nowYear, week - 1)
      .then(response => {
        setLastWeekData(response);
      })
      .catch(reason => {
        dispatch(addError({ errorMsg: reason.message }));
      });
  }, [nowYear, week, dispatch]);

  let diff_send_count = 0;
  let diff_error_count = 0;
  if (weekData && lastWeekData) {
    diff_send_count = weekData?.send_count - lastWeekData?.send_count;
    diff_error_count = weekData?.error_count - lastWeekData?.error_count;
  }
  return (
    <>
      <div className="flex flex-col flex-wrap justify-center bg-white p-3 rounded-md shadow-lg my-5 text-2xl relative p-5 w-56">
        <div className="my-3 text-center">이번주 전송건수</div>
        <div className="flex flex-col items-center">
          <div className="w-32">
            <span>
              <FontAwesomeIcon
                icon="check-circle"
                className="text-green-600 mr-5"
                size="2x"
              />
            </span>
            <span className="text-4xl">{weekData?.send_count}</span>
          </div>
          <div className="w-32">
            <span>
              <FontAwesomeIcon
                icon="times-circle"
                className="text-red-600 mr-5"
                size="2x"
              />
            </span>
            <span className="text-4xl">{weekData?.error_count}</span>
          </div>
        </div>
        <div className="border-b w-full mx-auto mt-5 mb-2"></div>
        <div className="flex flex-col items-center justify-center">
          <span className="text-xl">지난주 대비</span>
          <span
            className={`${
              diff_send_count >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {diff_send_count}
          </span>
          <span
            className={`${
              diff_error_count >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {diff_error_count}
          </span>
        </div>
      </div>
    </>
  );
}

export default EmrifChartByWeek;
