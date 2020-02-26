import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BeatLoader } from "react-spinners";

type CpuType = {
  isLoading: boolean;
  cpu: number;
};

function CPU(props: CpuType) {
  return (
    <div className="bg-white rounded-md shadow-lg mt-10 w-20rem m-10">
      <div className="flex justify-between">
        <div className="w-20 h-20 bg-green-400 relative top-30 left-20 flex justify-center items-center shadow-lg rounded">
          <FontAwesomeIcon icon="microchip" className="text-white" size="2x" />
        </div>
        <div className="mr-8 flex flex-col justify-center">
          <span className="text-xl font-medium text-gray-600 self-end">
            CPU 점유율
          </span>
          <span className="text-3xl font-medium text-gray-600 self-end">
            {props.isLoading ? (
              <BeatLoader
                loading={props.isLoading}
                color={"#38b2ac"}
              ></BeatLoader>
            ) : (
              `${props.cpu}%`
            )}
          </span>
        </div>
      </div>
      <div className="border-b w-5/6 mx-auto mb-3"></div>
      <div className="h-10 bg-white px-5">
        {props.cpu >= 70 ? (
          <div>
            <FontAwesomeIcon
              icon="exclamation-circle"
              className="text-red-600"
              size="1x"
            />
            <span className="text-gray-600 text-sm ml-1">CPU점유율 위험</span>
          </div>
        ) : props.cpu >= 40 ? (
          <div>
            <FontAwesomeIcon
              icon="exclamation-circle"
              className="text-yellow-400"
              size="1x"
            />
            <span className="text-gray-600 text-sm ml-1">CPU점유율 경고</span>
          </div>
        ) : (
          props.cpu <= 40 && (
            <div>
              <span className="fa-layers fa-fw">
                <FontAwesomeIcon icon="circle" color="green" size="1x" />
                <FontAwesomeIcon
                  icon="thumbs-up"
                  className="text-white"
                  inverse
                  transform="shrink-7"
                />
              </span>
              <span className="text-gray-600 text-sm ml-1">CPU점유율 양호</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default CPU;
