import React, { useState, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalPortal from "../../modal/ModalPortal";
import InterfacePcModal from "../../modal/InterfacePcModal";
import { InterfacePcState } from "../../../modules/interfacePc";
import { useDispatch } from "react-redux";
import { setfloortimer } from "../../../modules/user";
import Modal from "../../modal/Modal";
export type InterfacePcProps = {
  interfacePcState: InterfacePcState;
  size?: string;
};

function InterfacePc(props: InterfacePcProps) {
  const [isHover, setIsHover] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  const dispatch = useDispatch();

  const onMouseEnter = (event: React.MouseEvent) => {
    setIsHover(true);
  };
  const onMouseLeave = (event: React.MouseEvent) => {
    setIsHover(false);
  };

  const onClick = (e: React.MouseEvent) => {
    setViewModal(true);
    dispatch(setfloortimer(false));
  };
  const onClickCancel = (e: React.MouseEvent) => {
    setViewModal(false);
    // dispatch(setfloortimer(true));
  };
  return (
    <>
      <div className="m-5 cursor-pointer" onClick={onClick}>
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className={`${props.size ? props.size : " w-24 h-24 "}  ${
            props.interfacePcState.status === "SUCCESS"
              ? "bg-green-400 hover:bg-green-500"
              : "bg-gray-500 hover:bg-gray-600"
          }  interfacePcIcon button-scale`}
        >
          <FontAwesomeIcon
            icon="desktop"
            className="relative text-white -mt-3"
            size="3x"
          />
          <span className="absolute text-sm text-white bottom-0 mt-1 mb-2">
            {props.interfacePcState.equip.lab.name}
          </span>
          {props.interfacePcState.error_count > 0 && (
            <div className="absolute righttop-8 text-white rounded-full bg-red-600 shadow-lg py-1 px-2 text-center font-semibold errorIcon">
              <FontAwesomeIcon
                icon="bomb"
                className="mr-015 mb-005 animation-error"
              />
              {props.interfacePcState.error_count}
            </div>
          )}
        </div>
        <div
          className={`speech-bubble absolute flex flex-col -mx-2 mt-1 w-34 shadow-lg bg-white rounded p-5 mouseHover ${
            isHover ? "" : "hide"
          }`}
        >
          <div className="flex flex-col justify-center">
            <span>{props.interfacePcState.ip}</span>
            <span>{props.interfacePcState.equip.lab.dept.name}</span>
            <span>{props.interfacePcState.equip.lab.name}</span>
            <span>{props.interfacePcState.equip.lab.call_number}</span>
            <span>{props.interfacePcState.equip.name}</span>
          </div>
        </div>
      </div>
      {viewModal && (
        <ModalPortal>
          <Modal onClickCancel={onClickCancel}>
            <InterfacePcModal
              interfacePcState={props.interfacePcState}
            ></InterfacePcModal>
          </Modal>
        </ModalPortal>
      )}
    </>
  );
}

export default memo(InterfacePc);
