import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BeatLoader } from "react-spinners";

type MemoryType = {
  isLoading: boolean;
  free_memory: number;
  percent_memory: number;
  total_memory: number;
  used_memory: number;

  free_memory2: number;
  percent_memory2: number;
  total_memory2: number;
  used_memory2: number;
};

function Memory(props: MemoryType) {
  return (
    <div className="bg-white rounded-md shadow-lg mt-3 w-1/4">
      <div className="flex justify-between">
        <div className="w-20 h-20 bg-indigo-400 relative top-30 left-20 flex justify-center items-center shadow-lg rounded ">
          <FontAwesomeIcon icon="memory" className="text-white" size="2x" />
        </div>
        <div className="mr-8 flex flex-col justify-center">
          <span className="text-xl font-medium text-gray-600 self-end">
            Memory 사용량
          </span>

          <div className="flex justify-between items-center">
            <span className="text-md font-medium text-white rounded px-1 bg-green-400 block self-start mr-1">
              IF1
            </span>
            <span className="text-md font-medium text-gray-600 block self-end">
              {props.isLoading ? (
                <BeatLoader
                  loading={props.isLoading}
                  color={"#38b2ac"}
                ></BeatLoader>
              ) : (
                `${props.used_memory}/${props.total_memory}GB/${props.percent_memory}%`
              )}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-md font-medium text-white rounded px-1 bg-orange-400 block self-start mr-1">
              IF2
            </span>
            <span className="text-md font-medium text-gray-600 block self-end">
              {props.isLoading ? (
                <BeatLoader
                  loading={props.isLoading}
                  color={"#38b2ac"}
                ></BeatLoader>
              ) : (
                `${props.used_memory2}/${props.total_memory2}GB/${props.percent_memory2}%`
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="border-b w-5/6 mx-auto mb-3"></div>
      <div className="h-10 bg-white px-5">
        {props.percent_memory >= 70 || props.percent_memory2 >= 70 ? (
          <div>
            <FontAwesomeIcon
              icon="exclamation-circle"
              className="text-red-600"
              size="1x"
            />
            <span className="text-gray-600 text-sm ml-1">
              Memory점유율 위험
            </span>
          </div>
        ) : props.percent_memory >= 40 || props.percent_memory2 >= 40 ? (
          <div>
            <FontAwesomeIcon
              icon="exclamation-circle"
              className="text-yellow-400"
              size="1x"
            />
            <span className="text-gray-600 text-sm ml-1">
              Memory점유율 경고
            </span>
          </div>
        ) : (
          (props.percent_memory <= 40 || props.percent_memory2 <= 40) && (
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
              <span className="text-gray-600 text-sm ml-1">
                Memory점유율 양호
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Memory;
