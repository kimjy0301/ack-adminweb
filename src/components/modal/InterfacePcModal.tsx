import React, { Fragment, useEffect, useState } from "react";
import {
  InterfacePcState,
  InterfaceError,
  getInterfacePcListAsync,
} from "../../modules/interfacePc";
import { useDispatch } from "react-redux";
import {
  getInterfacePcError,
  putInterfacePcError,
} from "../../modules/api/InterfacePcAPI";
import { addError } from "../../modules/error";
import { BeatLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type InterfacePcModalType = {
  interfacePcState: InterfacePcState | undefined;
};

const InterfacePcModal = ({ interfacePcState }: InterfacePcModalType) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorList, setErrorList] = useState<InterfaceError[]>();

  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    getInterfacePcError(interfacePcState?.id)
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

  const [refreshFlag, setRefreshFlag] = useState(false);

  if (refreshFlag) {
    dispatch(getInterfacePcListAsync.request());
  }

  return (
    <>
      <div className="-ml-5 pr-3" style={{ width: "60rem" }}>
        <div className="flex " style={{ width: "56rem" }}>
          <div className="w-full flex items-center justify-end mt-2 text-gray-700 text-xl font-medium ml-2">
            <span>IP :</span>
            <span className="ml-2 border p-3 shadow-md w-64">
              {interfacePcState?.ip}
            </span>
          </div>
          <div className="w-full flex items-center justify-end mt-2 text-gray-700 text-xl font-medium">
            <span>장비명 :</span>
            <span
              className="ml-2 border p-3 shadow-md"
              style={{ width: "20rem" }}
            >
              {interfacePcState?.equip.name}
            </span>
          </div>
        </div>
        <div className="flex " style={{ width: "56rem" }}>
          <div className="w-full flex items-center justify-end mt-2 text-gray-700 text-xl font-medium ml-2">
            <span>부서명 :</span>
            <span className="ml-2 border p-3 shadow-md w-64">
              {interfacePcState?.equip.lab.dept.name}
            </span>
          </div>
          <div className="w-full flex items-center justify-end mt-2 text-gray-700 text-xl font-medium">
            <span>검사실명 :</span>
            <span
              className="ml-2 border p-3 shadow-md"
              style={{ width: "20rem" }}
            >
              {interfacePcState?.equip.lab.name}
            </span>
          </div>
        </div>
        <div className="flex " style={{ width: "56rem" }}>
          <div className="w-full flex items-center justify-end mt-2 text-gray-700 text-xl font-medium ml-2">
            <span>담당자명 :</span>
            <span className="ml-2 border p-3 shadow-md w-64">
              {interfacePcState?.employee_name}
            </span>
          </div>
          <div className="w-full flex items-center justify-end mt-2 text-gray-700 text-xl font-medium">
            <span>담당자번호 :</span>
            <span
              className="ml-2 border p-3 shadow-md"
              style={{ width: "20rem" }}
            >
              {interfacePcState?.employee_call}
            </span>
          </div>
        </div>

        <div className="flex " style={{ width: "56rem" }}>
          <div className="w-full flex items-center justify-end mt-2 text-gray-700 text-xl font-medium ml-2">
            <span>부서번호 :</span>
            <span className="ml-2 border p-3 shadow-md w-64">
              {interfacePcState?.equip.lab.call_number}
            </span>
          </div>
          <div className="w-full flex items-center justify-end mt-2 text-gray-700 text-xl font-medium">
            <span>장비OS :</span>
            <span
              className="ml-2 border p-3 shadow-md"
              style={{ width: "20rem" }}
            >
              {interfacePcState?.equip.equip_os}
            </span>
          </div>
        </div>
      </div>
      <span className="self-end mt-2 mr-2 text-gray-700 text-lg font-medium">
        Error Count = {errorList?.length}
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
        <>
          {errorList?.length !== undefined && errorList?.length > 0 && (
            <div className="overflow-y-scroll" style={{ height: "20rem" }}>
              <table className="border m-2 border-collapse ">
                <thead>
                  <tr>
                    <th>제목</th>
                    <th>내용</th>
                    <th>상태</th>
                    <th>생성시간</th>
                    <th>에러처리</th>
                  </tr>
                </thead>
                <tbody>
                  {errorList?.map((value: InterfaceError, id) => {
                    return (
                      <Fragment key={id}>
                        <tr>
                          <td>{value.title}</td>
                          <td className="w-48">{value.content}</td>
                          <td>
                            {value.state_flag === "O" ? "처리완료" : "미처리"}
                          </td>
                          <td>{value.created}</td>
                          <td className="text-center">
                            {value.state_flag === "L" ? (
                              <>
                                <button
                                  onClick={() =>
                                    putInterfacePcError(value.id, "O")
                                      .then((response) => {
                                        setIsLoading(true);
                                        getInterfacePcError(
                                          interfacePcState?.id
                                        )
                                          .then((response) => {
                                            setIsLoading(false);
                                            const interfaceError: InterfaceError[] =
                                              response.results;
                                            setErrorList(interfaceError);
                                          })
                                          .catch((response) => {
                                            setIsLoading(false);
                                            dispatch(
                                              addError({
                                                errorMsg: response.message,
                                              })
                                            );
                                          });
                                      })
                                      .then(() => setRefreshFlag(true))
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon="check"
                                    className="text-green-600 hover:text-green-700"
                                    size="2x"
                                  />
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() =>
                                  putInterfacePcError(value.id, "L").then(
                                    (response) => {
                                      setIsLoading(true);
                                      getInterfacePcError(interfacePcState?.id)
                                        .then((response) => {
                                          setIsLoading(false);
                                          const interfaceError: InterfaceError[] =
                                            response.results;
                                          setErrorList(interfaceError);
                                        })
                                        .catch((response) => {
                                          setIsLoading(false);
                                          dispatch(
                                            addError({
                                              errorMsg: response.message,
                                            })
                                          );
                                        });
                                    }
                                  )
                                }
                              >
                                Uncheck
                              </button>
                            )}
                          </td>
                        </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default InterfacePcModal;
