import React from "react";
import ErrorBox from "./error/ErrorBox";
import { useSelector } from "react-redux";
import { ErrorState } from "../../modules/error";
import { RootState } from "../../modules";

const ErrorModal = () => {
  const errorList: ErrorState[] = useSelector(
    (state: RootState) => state.error.errorList
  );

  return (
    <>
      <div className="fixed bottom-0 flex flex-col-reverse right-4rem z-50">
        {errorList.map((value, i) => (
          <ErrorBox key={i}>{value.errorMsg}</ErrorBox>
        ))}
      </div>
    </>
  );
};

export default ErrorModal;
