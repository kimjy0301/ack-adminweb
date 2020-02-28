import React, { useEffect, useRef } from "react";
import { InterfacePcProps } from "../equip/InterfacePc";
import { InterfacePcState } from "../../modules/interfacePc";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../../modules";

export type InterfacePcModalType = {
  onClickCancel: (event: React.MouseEvent) => void;
  props: InterfacePcProps;
};

const InterfacePcModal = ({ onClickCancel, props }: InterfacePcModalType) => {
  const onClickDiv = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const divRef = useRef(null);

  const interfacePcState: InterfacePcState | undefined = useSelector(
    (state: RootState) =>
      state.interfacePcList.results.find(
        (pcState: InterfacePcState) => pcState.id === props.id
      ),
    shallowEqual
  );

  useEffect(() => {
    const div: any = divRef.current;
    if (div !== undefined) {
      div.classList.add("opacity-100");
    }
  }, [divRef]);

  return (
    <div
      ref={divRef}
      className="bg-modal w-full h-full flex items-center justify-center fixed h-screen w-screen left-0 top-0"
      onClick={onClickCancel}
    >
      <div
        onClick={onClickDiv}
        className="bg-white shadow-lg p-5 half-size rounded flex flex-col justify-center items-center"
      >
        <span className="mt-1 text-gray-700 text-xl font-medium ">
          {interfacePcState?.ip}
        </span>
        <span className="mt-1 text-gray-700 text-xl font-medium ">
          {interfacePcState?.equip.name}
        </span>
        <span className="mt-1 text-gray-700 text-xl font-medium ">
          {interfacePcState?.equip.lab.name}
        </span>
        <span className="mt-1 text-gray-700 text-xl font-medium ">
          {interfacePcState?.equip.lab.dept.name}
        </span>{" "}
        <button
          onClick={onClickCancel}
          className="broder rounded shadow-lg px-5 py-3 focus:outline-none mt-2 "
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default InterfacePcModal;
