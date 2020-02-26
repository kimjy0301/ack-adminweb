import React, { useState, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type InterfacePcProps = {
  ip: string;
  dept: string;
  lab: string;
  status: string;
  callnumber: string;
  error_count: number;
};

function InterfacePc(props: InterfacePcProps) {
  const [isHover, setIsHover] = useState(false);

  const onMouseEnter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsHover(true);
  };
  const onMouseLeave = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsHover(false);
  };

  return (
    <>
      <div className="m-5">
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className={`w-24 h-24   ${
            props.status === "SUCCESS" ? "bg-green-400" : "bg-red-400"
          } shadow-lg rounded items-center flex justify-center`}
        >
          <FontAwesomeIcon
            icon="desktop"
            className="relative text-white"
            size="3x"
          />
        </div>
        <div
          className={`speech-bubble absolute flex flex-col w-48 shadow-lg bg-white rounded p-5 mouseHover ${
            isHover ? "" : "hide"
          }`}
        >
          <div className="flex flex-col">
            <span>IP : {props.ip}</span>
            <span>{props.dept}</span>
            <span>{props.lab}</span>
            <span>{props.callnumber}</span>
            <span>Error count = {props.error_count}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(InterfacePc);
