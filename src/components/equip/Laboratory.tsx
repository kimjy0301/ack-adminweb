import React, { useRef } from "react";
import InterfacePcSm from "./InterfacePcSm";
import { InterfacePcState } from "../../modules/interfacePc";

export type LabType = {
  bgImg: string;
  interfacePcState: InterfacePcState;
};

function Laboratory(props: LabType) {
  const divRef: React.RefObject<HTMLDivElement> | null | undefined = useRef(
    null
  );
  return (
    <>
      <div className="flex flex-col rounded shadow-lg m-5">
        <div className="bg-teal-400 px-3 py-2 text-xl text-white text-center">
          검사실
        </div>
        <div ref={divRef} className="px-5 border shadow-lg border-gray-300 ">
          <div
            className="bg-center relative"
            style={{
              backgroundImage: `url(${props.bgImg})`,
              backgroundRepeat: "no-repeat",
              height: "30rem",
              width: "30rem",
              backgroundSize: "contain"
            }}
          >
            <InterfacePcSm
              interfacePcState={props.interfacePcState}
            ></InterfacePcSm>
          </div>
        </div>
      </div>
    </>
  );
}

export default Laboratory;
