import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules";
import { increase } from "../modules/counter";
import { Redirect } from "react-router-dom";

const Main = () => {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(increase());
  };

  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  return (
    <>
      {isLogin ? (
        <div className="flex items-center justify-center h-screen">
          <button className="w-32 h-16 bg-white hover:bg-gray-400 duration-300 ease-linear focus:outline-none transition-colors shadow">
            Main {count}
          </button>
          <button className="w-32 h-16 bg-white hover:bg-gray-400 duration-300 ease-linear focus:outline-none transition-colors shadow">
            {count}
          </button>
          <button
            onClick={onClick}
            className="w-32 h-16 bg-white hover:bg-gray-400 duration-300 ease-linear focus:outline-none transition-colors shadow"
          >
            Click
          </button>
        </div>
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        ></Redirect>
      )}
    </>
  );
};

export default Main;
