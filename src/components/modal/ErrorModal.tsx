import React, { useEffect, useRef } from "react";
import { InterfacePcState } from "../../modules/interfacePc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        className="bg-white shadow-lg p-5 half-size rounded flex flex-col justify-center items-center relative"
      >
        에러!!!
        <button
          onClick={onClickCancel}
          className="absolute right-3px top-0  focus:outline-none"
        >
          <FontAwesomeIcon
            icon="window-close"
            className="text-red-500 hover:text-red-600 transition-colors duration-150"
            size="2x"
          />
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
