import React, { useEffect } from "react";
import { BeatLoader } from "react-spinners";
import * as modul3d from "../../static/js/3dModule";
const List3D = () => {
  const isLoading: boolean = false;

  useEffect(() => {
    modul3d.init();
  }, []);

  return (
    <>
      <div className="flex flex-wrap border bg-white justify-center relative min-h-28">
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
            <div className="fixed w-screen h-screen relative" id="div3d">
              <div
                className="absolute z-30 text-white"
                style={{ top: "100px", left: "10px" }}
              >
                <button id="testBtn">오르빗토글</button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default List3D;
