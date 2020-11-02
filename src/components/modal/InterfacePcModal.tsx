import React, { Fragment, useEffect, useState } from "react";
import { InterfacePcState, InterfaceError } from "../../modules/interfacePc";
import { useDispatch } from "react-redux";
import { getInterfacePcError } from "../../modules/api/InterfacePcAPI";
import { addError } from "../../modules/error";
import { BeatLoader } from "react-spinners";
export type InterfacePcModalType = {
  interfacePcState: InterfacePcState | undefined;
};

const InterfacePcModal = ({ interfacePcState }: InterfacePcModalType) => {

  const [isLoading, setIsLoading] = useState(true);
  const [errorList, setErrorList] = useState<InterfaceError[]>();

  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    getInterfacePcError(
      interfacePcState?.id
    )
      .then((response) => {
        setIsLoading(false);
        const interfaceError: InterfaceError[] = response.results;
        setErrorList(interfaceError);

      })
      .catch((response) => {
        setIsLoading(false);
        dispatch(addError({ errorMsg: response.message }));
      });
  }, [dispatch, interfacePcState]);

  return (
    <>
      <div className="" style={{ width: "19rem" }}>
        <div className="w-full flex items-center justify-between mt-2 text-gray-700 text-xl font-medium">
          <span>IP :</span>
          <span className="ml-2 border p-3 shadow-md w-48">
            {interfacePcState?.ip}
          </span>
        </div>

        <div className="w-full flex items-center justify-between mt-2 text-gray-700 text-xl font-medium">
          <span>장비명 :</span>
          <span className="ml-2 border p-3 shadow-md w-48">
            {interfacePcState?.equip.name}
          </span>
        </div>

        <div className="w-full flex items-center justify-between mt-2 text-gray-700 text-xl font-medium">
          <span>검사실명 :</span>
          <span className="ml-2 border p-3 shadow-md w-48">
            {interfacePcState?.equip.lab.name}
          </span>
        </div>

        <div className="w-full flex items-center justify-between mt-2 text-gray-700 text-xl font-medium">
          <span>부서명 :</span>
          <span className="ml-2 border p-3 shadow-md w-48">
            {interfacePcState?.equip.lab.dept.name}
          </span>
        </div>
        <div className="w-full flex items-center justify-between mt-2 text-gray-700 text-xl font-medium">
          <span>전화번호 :</span>
          <span className="ml-2 border p-3 shadow-md w-48">
            {interfacePcState?.equip.lab.call_number}
          </span>
        </div>
      </div>
      <span className="mt-2 text-gray-700 text-xl font-medium border p-3 shadow-md">
        Error Count = {interfacePcState?.error_count}
      </span>

      {isLoading ? (
        <div className="flex justify-center items-center mt-32">
          <BeatLoader
            loading={isLoading}
            color={"#38b2ac"}
            size={40}
            key={9999}
          ></BeatLoader>
        </div>
      ) : (


          <table>
            <thead>
              <tr>
                <th>title</th>
                <th>content</th>
                <th>flag</th>
                <th>created</th>
                <th>check</th>
              </tr>
            </thead>
            <tbody>
              {errorList?.map((value: InterfaceError, id) => {
                return (
                  <Fragment key={id}>
                    <tr>
                      <td>{value.title}</td>
                      <td>{value.content}</td>
                      <td>{value.state_flag}</td>
                      <td>{value.created}</td>
                      <td><button>Check</button></td>

                    </tr>
                  </Fragment>
                )
              }
              )}
            </tbody>
          </table>
        )}
    </>
  );
};

export default InterfacePcModal;
