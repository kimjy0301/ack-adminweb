import React, { Fragment } from "react";
import Main from "./components/Main";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./lib/PrivateRoute";
import Private from "./components/Private";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./modules";
import { logout } from "./modules/user";
import ScrollTop from "./lib/ScrollTop.jsx";
const App = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state: RootState) => state.user);
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <>
      <Router>
        <div className="w-full">
          <div className="flex justify-around fixed top-0 h-16 bg-teal-500 z-50 border-b border-gray-100 w-full shadow-md">
            <Link
              type="button"
              to="/"
              className="w-auto mx-2 h-16 text-white text-xl  p-3 text-center border-b-4 border-transparent hover:border-gray-200 duration-150 transition-all"
            >
              인터페이스 현황
            </Link>
            <Link
              type="button"
              to="/private"
              className="w-auto mx-2 h-16 text-white text-xl  p-3 text-center border-b-4 border-transparent hover:border-gray-200 duration-150 transition-all"
            >
              장비관리
            </Link>
            {isLogin && (
              <button
                className="w-auto mx-2 h-16 text-white text-xl  p-3 text-center border-b-4 border-transparent hover:border-gray-200 duration-150 transition-all flex-end"
                onClick={onClick}
              >
                로그아웃
              </button>
            )}
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
                  <Private />
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
