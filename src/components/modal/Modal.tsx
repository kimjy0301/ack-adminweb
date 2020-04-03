import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type ModalType = {
  onClickCancel: (event: any) => void;
  children?: any;
};

const Modal = ({ onClickCancel, children }: ModalType) => {
  const onClickDiv = (event: any) => {
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
      onTouchStart={onClickCancel}
    >
      <div
        onClick={onClickDiv}
        onTouchStart={onClickDiv}
        className="bg-white shadow-lg px-5 py-10 modal rounded flex flex-col justify-center items-center relative z-40"
      >
        {children}
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

export default Modal;
