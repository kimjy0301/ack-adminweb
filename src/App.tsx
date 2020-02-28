import React, { Fragment, useEffect } from "react";
import Main from "./components/Main";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./lib/PrivateRoute";
import Equip from "./components/Equip";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./modules";
import { logout, UserState, setuser } from "./modules/user";
import ScrollTop from "./lib/ScrollTop.jsx";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let userinfo: UserState;
    const userinfoStr = localStorage.getItem("userinfo");
    if (userinfoStr !== null) {
      userinfo = JSON.parse(userinfoStr);
      dispatch(setuser(userinfo));
    }
  }, [dispatch]);

  const { isLogin } = useSelector((state: RootState) => state.user);

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <>
      <Router>
        <div className="w-full">
          <div className="flex justify-between fixed top-0 h-16 bg-teal-500 z-50 border-b border-gray-100 w-full shadow-md px-10">
            <div className="ml-10">
              <Link
                type="button"
                to="/"
                className="focus:outline-none w-auto mx-2 h-16 text-white text-xl  p-3 text-center border-b-4 border-transparent hover:border-gray-200 duration-150 transition-all"
              >
                서버 현황
              </Link>
              <Link
                type="button"
                to="/private"
                className="focus:outline-none w-auto mx-2 h-16 text-white text-xl  p-3 text-center border-b-4 border-transparent hover:border-gray-200 duration-150 transition-all"
              >
                인터페이스 PC
              </Link>
            </div>
            <div className="mr-10">
              {isLogin && (
                <button
                  className="focus:outline-none w-auto mx-2 h-16 text-white text-xl  p-3 text-center border-b-4 border-transparent hover:border-gray-200 duration-150 transition-all flex-end"
                  onClick={onClick}
                >
                  로그아웃
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-16">
          <Fragment>
            <ScrollTop>
              <Switch>
                <Route exact path="/">
                  <Main></Main>
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <PrivateRoute path="/private">
                  <Equip />
                </PrivateRoute>
              </Switch>
            </ScrollTop>
          </Fragment>
        </div>
      </Router>
    </>
  );
};

export default App;
