import React, { useEffect, useRef } from "react";
import { InterfacePcState } from "../../modules/interfacePc";

export type InterfacePcModalType = {
  onClickCancel: (event: React.MouseEvent) => void;
  interfacePcState: InterfacePcState;
};

const ErrorModal = ({
  onClickCancel,
  interfacePcState
}: InterfacePcModalType) => {
  const onClickDiv = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const divRef = useRef(null);

  useEffect(() => {
    const div: any = divRef.current;
    if (div !== undefined) {
      div.classList.add("opacity-100");
    }
  }, [divRef]);

  return (
    <div
      ref={divRef}
      className="bg-modal w-full flex items-center justify-center fixed h-screen w-screen left-0 top-0"
      onClick={onClickCancel}
    >
      <div
        onClick={onClickDiv}
        className="bg-white shadow-lg p-5 half-size rounded flex flex-col justify-center items-center"
      >
        에러!!!
        <button
          onClick={onClickCancel}
          className="rounded shadow-md px-5  border py-3 focus:outline-none mt-2 hover:shadow-lg"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
