import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules";
import { getLoginAsync } from "../modules/user";
import { useHistory, useLocation } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isLogin, isLoading, error, errorMsg } = useSelector(
    (state: RootState) => state.user
  );
  const history = useHistory();
  const location = useLocation();
  const locationstate: any = location.state || { from: { pathname: "/" } };

  const idRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(getLoginAsync.request({ password, username }));
  };
  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (isLogin) {
      history.replace(locationstate.from);
    }
  }, [isLogin, history, locationstate.from]);

  return (
    <>
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
        <div className="flex items-center justify-center h-screen -mt-16">
          <form
            className="flex flex-col items-center bg-white p-10 rounded shadow-lg"
            onSubmit={onSubmit}
          >
            <input
              autoFocus
              className="my-3 border shadow-inner p-3 focus:outline-none focus:border-teal-400"
              type="text"
              placeholder="ID"
              value={username}
              onChange={onChangeUsername}
              ref={idRef}
            ></input>
            <input
              className="my-3 border shadow-inner p-3 focus:outline-none focus:border-teal-400"
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={onChangePassword}
              ref={passwordRef}
            ></input>
            {!errorMsg && (
              <span className="text-red-600 text-xs font-medium">{error}</span>
            )}
            {errorMsg && (
              <span className="text-red-600 text-xs font-medium">
                {errorMsg}
              </span>
            )}

            <button className="my-3 w-full h-16 bg-white hover:bg-teeal-300 duration-300 ease-linear focus:outline-none transition-colors shadow tracking-widest">
              {isLogin ? "LOGOUT" : "LOGIN"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
