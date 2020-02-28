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
          }  interfacePcIcon`}
        >
          <FontAwesomeIcon
            icon="desktop"
            className="relative text-white -mt-3"
            size="3x"
          />
          <span className="absolute text-sm text-white bottom-0 mt-1 mb-2">
            {props.lab}
          </span>
          {props.error_count > 0 && (
            <div className="absolute righttop-8 text-white rounded-full bg-red-600 shadow-lg py-1 px-2 text-center font-semibold errorIcon">
              <FontAwesomeIcon
                icon="bomb"
                className="mr-015 mb-005 animation-error"
              />
              {props.error_count}
            </div>
          )}
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
