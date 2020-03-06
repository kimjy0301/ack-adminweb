import React, { useEffect, useState } from "react";
import { EmrifCount, getEmrifCountByWeek } from "../../modules/api/StatsAPI";
import weekCount from "../../lib/weekCount";

function EmrifChartByWeek() {
  const [data, setdata] = useState<EmrifCount>();

  const today = new Date();
  const nowYear = today.getFullYear();

  const week = weekCount(today);
  useEffect(() => {
    getEmrifCountByWeek(nowYear, week)
      .then(response => {
        setdata(response);
      })
      .catch(response => {});
  }, [nowYear, week]);

  return (
    <>
      <div className="flex flex-wrap w-full justify-center">
        <div className="bg-white p-3 w-1/2 rounded-md shadow-lg mt-10 mx-40">
          {data?.send_count}
          {data?.error_count}
        </div>
      </div>
    </>
  );
}

export default EmrifChartByWeek;
