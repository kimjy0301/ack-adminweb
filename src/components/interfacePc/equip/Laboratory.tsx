import React from "react";
import InterfacePcSm from "./InterfacePcSm";
import { InterfacePcState } from "../../../modules/interfacePc";
import { RootState } from "../../../modules";
import { useSelector } from "react-redux";

export type LabType = {
  labname: string;
};

function Laboratory(props: LabType) {
  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const interfacePcStateList: InterfacePcState[] = useSelector(
    (state: RootState) => state.interfacePcList.results
  );

  const interfacePcListByLab = interfacePcStateList.filter(
    (value: InterfacePcState) => {
      if (value.equip.lab.name === props.labname) return true;
      else {
        return false;
      }
    }
  );

  return (
    <>
      <div
        className="flex flex-col rounded shadow-lg m-5"
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <div className="bg-teal-400 px-3 py-2 text-xl text-white text-center rounded-t">
          {props.labname}
        </div>
        <div className="px-5 border shadow-lg border-gray-300 ">
          <div
            className="bg-center relative"
            style={{
              backgroundImage: `url(${interfacePcListByLab[0].equip.lab.bg_image})`,
              backgroundRepeat: "no-repeat",
              height: "30rem",
              width: "30rem",
              backgroundSize: "contain"
            }}
          >
            {interfacePcListByLab.map((value: InterfacePcState, i) => (
              <InterfacePcSm key={i} interfacePcState={value}></InterfacePcSm>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Laboratory;
