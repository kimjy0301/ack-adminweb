import React, { useEffect, useState } from "react";
import {
  InterfacePcState,
  getInterfacePcListAsync
} from "../../modules/interfacePc";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { BeatLoader } from "react-spinners";
import InterfacePc from "./InterfacePc";

const filterCondition = (interfacePc: InterfacePcState, param: string) => {
  if (
    interfacePc.equip.lab.dept.name.match(param) ||
    interfacePc.equip.lab.call_number.match(param) ||
    interfacePc.ip.match(param) ||
    interfacePc.equip.lab.name.match(param)
  ) {
    return true;
  }
};

const AllPc = () => {
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
      <div className="flex flex-wrap border bg-white justify-center pb-10 pt-20 relative min-h-28">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <BeatLoader
              loading={isLoading}
              color={"#38b2ac"}
              size={40}
              key={9999}
            ></BeatLoader>
          </div>
        ) : (
          <>
            <div className="-mt-16 text-2xl absolute left-4rem bg-white border px-3 text-gray-700 rounded shadow-lg">
              전체PC리스트
            </div>
            <input
              type="text"
              placeholder="IP,부서,검사실,전화번호"
              className="-mt-16 w-64 text-xl absolute right-4rem bg-white border py-3 px-5 text-gray-700 rounded shadow-lg focus:border-teal-400 focus:outline-none"
              value={deptInput}
              onChange={onChangedeptInput}
            ></input>
            {deptInput === ""
              ? interfacePcList.map(
                  (interfacePc: InterfacePcState, i, array) => (
                    <React.Fragment key={i}>
                      {i === 0 && (
                        <div className="-mt-16 text-2xl absolute bg-white border px-3 text-gray-700 rounded shadow-lg">
                          {array.length} 대
                        </div>
                      )}
                      <InterfacePc interfacePcState={interfacePc}></InterfacePc>
                    </React.Fragment>
                  )
                )
              : interfacePcList
                  .filter((interfacePc: InterfacePcState) =>
                    filterCondition(interfacePc, deptInput)
                  )
                  .map((interfacePc: InterfacePcState, i, array) => (
                    <React.Fragment key={i}>
                      {i === 0 && (
                        <div
                          key={i}
                          className="-my-16 text-2xl absolute bg-white border px-3 text-gray-700 rounded shadow-lg"
                        >
                          {array.length} 대
                        </div>
                      )}
                      <InterfacePc interfacePcState={interfacePc}></InterfacePc>
                    </React.Fragment>
                  ))}
          </>
        )}
      </div>
    </>
  );
};

export default AllPc;
