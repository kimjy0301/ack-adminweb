import React, { useEffect, useState } from "react";
import InterfacePc from "./equip/InterfacePc";
import { useDispatch, useSelector } from "react-redux";
import {
  getInterfacePcListAsync,
  InterfacePcState
} from "../modules/interfacePc";
import { RootState } from "../modules";
import { BeatLoader } from "react-spinners";

const Equip = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInterfacePcListAsync.request());
  }, [dispatch]);

  const interfacePcList: InterfacePcState[] = useSelector(
    (state: RootState) => state.interfacePcList.results
  );

  const isLoading: boolean = useSelector(
    (state: RootState) => state.interfacePcList.isLoading
  );

  const [deptInput, setDeptInput] = useState("");
  const onChangedeptInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeptInput(e.target.value);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <BeatLoader
            loading={isLoading}
            color={"#38b2ac"}
            size={50}
            key={9999}
          ></BeatLoader>
        </div>
      ) : (
        <div className="flex flex-wrap -mx-56 border bg-white mt-32 justify-center py-10 relative">
          <div className="-my-16 text-3xl absolute left-4rem bg-white border px-3 text-gray-700 rounded shadow-lg">
            전체PC리스트
          </div>
          <input
            type="text"
            placeholder="검사실"
            className="-my-16 text-xl absolute right-4rem bg-white border p-3 text-gray-700 rounded shadow-lg focus:border-teal-400 focus:outline-none"
            value={deptInput}
            onChange={onChangedeptInput}
          ></input>

          {deptInput === ""
            ? interfacePcList.map((interfacePc: InterfacePcState, i, array) => (
                <>
                  {i === 0 && (
                    <div className="-my-16 text-3xl absolute bg-white border px-3 text-gray-700 rounded shadow-lg">
                      {array.length} 대
                    </div>
                  )}
                  <InterfacePc
                    key={i}
                    dept={interfacePc.equip.lab.dept.name}
                    lab={interfacePc.equip.lab.name}
                    ip={interfacePc.ip}
                    status={interfacePc.status}
                    callnumber={interfacePc.equip.lab.call_number}
                    error_count={interfacePc.error_count}
                  ></InterfacePc>
                </>
              ))
            : interfacePcList
                .filter((interfacePc: InterfacePcState) =>
                  interfacePc.equip.lab.dept.name.match(deptInput)
                )
                .map((interfacePc: InterfacePcState, i, array) => (
                  <>
                    {i === 0 && (
                      <div className="-my-16 text-3xl absolute bg-white border px-3 text-gray-700 rounded shadow-lg">
                        {array.length} 대
                      </div>
                    )}
                    <InterfacePc
                      key={i}
                      dept={interfacePc.equip.lab.dept.name}
                      lab={interfacePc.equip.lab.name}
                      ip={interfacePc.ip}
                      status={interfacePc.status}
                      callnumber={interfacePc.equip.lab.call_number}
                      error_count={interfacePc.error_count}
                    ></InterfacePc>
                  </>
                ))}
        </div>
      )}
    </>
  );
};

export default Equip;
