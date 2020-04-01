import React, { useEffect } from "react";
import Main from "./components/main/Main";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./lib/PrivateRoute";
import Equip from "./components/interfacePc/InterfacePcPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./modules";
import { logout, UserState, setuser } from "./modules/user";
import ScrollTop from "./lib/ScrollTop.jsx";
import List3D from "./components/3dList/List3D";
import Statistics from "./components/stats/Statistics";
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
          <div
            id="nav"
            className="flex justify-between fixed top-0 h-16 bg-teal-500 nav-bar border-b border-gray-100 w-full shadow-md px-10 "
          >
            <div className="ml-10">
              <Link
                type="button"
                to="/"
                className="focus:outline-none w-auto mx-2 h-16 text-white text-xl  p-3 text-center border-b-4 border-transparent hover:border-gray-200 duration-150 transition-all "
              >
                서버 현황
              </Link>
              <Link
                type="button"
                to="/interfacepc"
                className="focus:outline-none w-auto mx-2 h-16 text-white text-xl  p-3 text-center border-b-4 border-transparent hover:border-gray-200 duration-150 transition-all "
              >
                인터페이스 PC
              </Link>
              <Link
                type="button"
                to="/3dlist"
                className="focus:outline-none w-auto mx-2 h-16 text-white text-xl  p-3 text-center border-b-4 border-transparent hover:border-gray-200 duration-150 transition-all "
              >
                3D List
              </Link>
              <Link
                type="button"
                to="/stat"
                className="focus:outline-none w-auto mx-2 h-16 text-white text-xl  p-3 text-center border-b-4 border-transparent hover:border-gray-200 duration-150 transition-all "
              >
                통계
              </Link>
            </div>
            <div className="mr-10">
              {isLogin && (
                <button
                  className="focus:outline-none w-auto mx-2 h-16 text-white text-xl  p-3 text-center border-b-4 border-transparent hover:border-gray-200 duration-150 transition-all flex-end "
                  onClick={onClick}
                >
                  로그아웃
                </button>
              )}
            </div>
          </div>
        </div>
        <div id="content" className="mt-16">
          <ScrollTop>
            <Switch>
              <Route exact path="/">
                <Main></Main>
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/3dlist">
                <List3D />
              </Route>
              <Route path="/stat">
                <Statistics />
              </Route>
              <PrivateRoute path="/interfacepc">
                <Equip />
              </PrivateRoute>
            </Switch>
          </ScrollTop>
        </div>
      </Router>
    </>
  );
};

export default App;
