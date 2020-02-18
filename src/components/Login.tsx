import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules";
import { login } from "../modules/user";
import { useHistory, useLocation } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();

  const isLogin = useSelector((state: RootState) => state.user.isLogin);

  const history = useHistory();
  const location = useLocation();

  const locationstate: any = location.state || { from: { pathname: "/" } };

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    dispatch(login());
    history.replace(locationstate.from);
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <button
          onClick={onClick}
          className="w-32 h-16 bg-white hover:bg-gray-400 duration-300 ease-linear focus:outline-none transition-colors shadow"
        >
          {isLogin ? "Logout" : "Login"}
        </button>
      </div>
    </>
  );
};

export default Login;
