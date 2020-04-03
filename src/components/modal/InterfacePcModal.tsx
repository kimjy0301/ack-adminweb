import React from "react";
import { InterfacePcState } from "../../modules/interfacePc";
export type InterfacePcModalType = {
  interfacePcState: InterfacePcState;
};

const InterfacePcModal = ({ interfacePcState }: InterfacePcModalType) => {
  return (
    <>
      <span className="mt-2 text-gray-700 text-xl font-medium border p-3 shadow-md">
        {interfacePcState?.ip}
      </span>
      <span className="mt-2 text-gray-700 text-xl font-medium border p-3 shadow-md">
        {interfacePcState?.equip.name}
      </span>
      <span className="mt-2 text-gray-700 text-xl font-medium border p-3 shadow-md">
        {interfacePcState?.equip.lab.name}
      </span>
      <span className="mt-2 text-gray-700 text-xl font-medium border p-3 shadow-md">
        {interfacePcState?.equip.lab.dept.name}
      </span>
      <span className="mt-2 text-gray-700 text-xl font-medium border p-3 shadow-md">
        Error Count = {interfacePcState?.error_count}
      </span>
    </>
  );
};

export default InterfacePcModal;
