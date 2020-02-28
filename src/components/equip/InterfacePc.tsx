import React, { useState, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalPortal from "../modal/ModalPortal";
import InterfacePcModal from "../modal/InterfacePcModal";

export type InterfacePcProps = {
  id: number;
  ip: string;
  dept: string;
  lab: string;
  status: string;
  callnumber: string;
  error_count: number;
};

function InterfacePc(props: InterfacePcProps) {
  const [isHover, setIsHover] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  const onMouseEnter = (event: React.MouseEvent) => {
    setIsHover(true);
  };
  const onMouseLeave = (event: React.MouseEvent) => {
    setIsHover(false);
  };

  const onClick = (e: React.MouseEvent) => {
    setViewModal(true);
  };
  const onClickCancel = (e: React.MouseEvent) => {
    setViewModal(false);
  };
  return (
    <>
      <div className="m-5 cursor-pointer" onClick={onClick}>
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className={`w-24 h-24   ${
            props.status === "SUCCESS"
              ? "bg-green-400 hover:bg-green-500"
              : "bg-red-400 hover:bg-red-500"
          } shadow-lg rounded items-center flex justify-center transition-colors duration-200`}
        >
          <FontAwesomeIcon
            icon="desktop"
            className="relative text-white"
            size="3x"
          />
        </div>
        <div
          className={`speech-bubble absolute flex flex-col -mt-2 w-48 shadow-lg bg-white rounded p-5 mouseHover ${
            isHover ? "" : "hide"
          }`}
        >
          <div className="flex flex-col justify-center">
            <span>IP : {props.ip}</span>
            <span>{props.dept}</span>
            <span>{props.lab}</span>
            <span>{props.callnumber}</span>
            <span>Error count = {props.error_count}</span>
          </div>
        </div>
      </div>
      {viewModal && (
        <ModalPortal>
          <InterfacePcModal
            onClickCancel={onClickCancel}
            props={props}
          ></InterfacePcModal>
        </ModalPortal>
      )}
    </>
  );
}

export default memo(InterfacePc);
