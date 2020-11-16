import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";
import { Redirect } from "react-router-dom";
import ServerStatus from "./status/ServerStatus";
import EmrifChartByYear from "./stats/EmrifChartByYear";
import EmrifChartByWeek from "./stats/EmrifChartByWeek";
import EmrifChartByDept from "./stats/EmrifChartByDept";
const Main = () => {
  const isLogin = useSelector((state: RootState) => state.user.isLogin);

  const divRef = useRef(null);

  useEffect(() => {
    const div: any = divRef.current;
    if (div !== undefined) {
      if (isLogin) {
        setTimeout(() => {
          div.classList.add("opacity-100");
        }, 500);
      }
    }
  }, [isLogin]);

  return (
    <>
      {isLogin ? (
        <div
          ref={divRef}
          className="opacity-0 transition-opacity duration-700 flex items-center justify-center py-5 h-full flex-col"
        >
          <div className="flex w-80rem justify-between my-3">
            <ServerStatus></ServerStatus>
          </div>
          <div className="flex w-80rem justify-between my-3">
            <EmrifChartByDept></EmrifChartByDept>
            <EmrifChartByWeek></EmrifChartByWeek>
          </div>
          <div className="flex w-80rem justify-around my-3">
            <EmrifChartByYear></EmrifChartByYear>
          </div>
        </div>
      ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          ></Redirect>
        )}
    </>
  );
};

export default Main;
