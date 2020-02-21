import React, { useEffect } from "react";

const Private = () => {
  useEffect(() => {
    console.log("render");
  }, []);

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-3/4 h-64 bg-white flex justify-center items-center">
          <span className="w-32 h-16 bg-white hover:bg-gray-400 duration-300 ease-linear focus:outline-none transition-colors shadow text-center items-center">
            장비관리로 만들 페이지
          </span>
        </div>
      </div>
    </>
  );
};

export default Private;
