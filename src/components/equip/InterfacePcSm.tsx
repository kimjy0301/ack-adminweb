import React, { useState, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalPortal from "../modal/ModalPortal";
import InterfacePcModal from "../modal/InterfacePcModal";
import {
  InterfacePcState,
  setInterfacePcPositionAsync
} from "../../modules/interfacePc";
import { useDispatch } from "react-redux";
import { setfloortimer } from "../../modules/user";
import { InterfacePcPosition } from "../../modules/api/InterfacePcAPI";

export type InterfacePcProps = {
  interfacePcState: InterfacePcState;
};

function InterfacePcSm(props: InterfacePcProps) {
  let oldX: number = 0;
  let oldY: number = 0;
  let newX: number = 0;
  let newY: number = 0;

  const [isHover, setIsHover] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const left = props.interfacePcState.position_left;
  const top = props.interfacePcState.position_top;

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
    dispatch(setfloortimer(true));
  };
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.effectAllowed = "move";
    oldX = event.screenX;
    oldY = event.screenY;
  };

  const onDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    newX = event.screenX;
    newY = event.screenY;

    if (event.dataTransfer.dropEffect === "move") {
      const interfacePcPosition: InterfacePcPosition = {
        id: props.interfacePcState.id,
        position_left: left + newX - oldX,
        position_top: top + newY - oldY
      };
      dispatch(setInterfacePcPositionAsync.request(interfacePcPosition));
    }
  };

  return (
    <>
      <div
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        id="interfacePcSm"
        className="absolute"
        style={{ left: left, top: top }}
      >
        <div className="cursor-pointer" onClick={onClick}>
          <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={` w-16 h-16  ${
              props.interfacePcState.status === "SUCCESS"
                ? "bg-green-400 hover:bg-green-500"
                : "bg-gray-500 hover:bg-gray-600"
            }  interfacePcIcon`}
          >
            <FontAwesomeIcon
              icon="desktop"
              className="relative text-white"
              size="2x"
            />
            {props.interfacePcState.error_count > 0 && (
              <div className="absolute z-30 interfacePcSm-rl text-white text-xs rounded-full bg-red-600 shadow-lg py-1 px-2 text-center font-semibold errorIcon">
                <FontAwesomeIcon
                  icon="bomb"
                  className="mr-015 mb-005 animation-error"
                  size="xs"
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
            <InterfacePcModal
              onClickCancel={onClickCancel}
              interfacePcState={props.interfacePcState}
            ></InterfacePcModal>
          </ModalPortal>
        )}
      </div>
    </>
  );
}

export default memo(InterfacePcSm);
