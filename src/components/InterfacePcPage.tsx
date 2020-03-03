import React, { useState, useEffect, useRef } from "react";
import AllPc from "./equip/AllPc";
import {
  Link,
  useRouteMatch,
  Switch,
  Route,
  useLocation,
  useHistory
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Floor1 from "./equip/Floor1";
import ScrollTop from "../lib/ScrollTop";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules";
import { setfloortimer } from "../modules/user";
import Floor2 from "./equip/Floor2";

const urlList: string[] = [
  "/interfacepc/allpc",
  "/interfacepc/1stfloor",
  "/interfacepc/2ndfloor"
];

const InterfacePcPage = () => {
  let { path, url } = useRouteMatch();

  const [folded, setFolded] = useState(true);

  const enableTimeout = useSelector(
    (state: RootState) => state.user.floorTimer
  );
  const dispatch = useDispatch();

  const onClickFolded = () => {
    setFolded(!folded);
  };

  const location = useLocation();
  const history = useHistory();

  let pushPath: string = urlList[urlList.indexOf(location.pathname) + 1];
  if (pushPath === undefined) {
    pushPath = urlList[0];
  }

  const onClickClearTimeout = () => {
    dispatch(setfloortimer(!enableTimeout));
  };

  useEffect(() => {
    let timer: any;
    if (enableTimeout) {
      timer = setTimeout(() => {
        history.push(pushPath);
      }, 60000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [enableTimeout, history, pushPath]);

  const divRef = useRef(null);

  useEffect(() => {
    const div: any = divRef.current;
    if (div !== undefined) {
      setTimeout(() => {
        div.classList.add("opacity-100");
      }, 500);
    }
  }, []);

  return (
    <>
      <div
        ref={divRef}
        className="flex mt-20 w-full transition transition-all duration-700 opacity-0"
      >
        <CSSTransition in={folded} timeout={1} classNames="sidebar">
          <div
            className={`z-50 bg-white shadow-md h-full pb-10 flex flex-col text-gray-700 w-1/6 ${!folded &&
              "sidebar-exit-done"} overflow-hidden`}
          >
            <button
              onClick={onClickClearTimeout}
              className={`${
                enableTimeout ? "text-green-500" : "text-red-500"
              } text-center mt-10 text-xl w-40 self-center focus:outline-none transition-all duration-200 button-scale `}
            >
              <FontAwesomeIcon icon="history" className="" size="2x" />
            </button>
            <Link
              type="button"
              className={`text-center mt-10 text-xl w-full py-2 hover:border border-0 self-center ${location.pathname.match(
                "allpc"
              ) &&
                "bg-teal-400 text-white shadow-xl"} transition-all transition duration-200 button-scale `}
              to={`${url}/allpc`}
            >
              전체리스트
            </Link>

            <Link
              type="button"
              className={`text-center mt-10 text-xl w-full py-2 hover:border border-0 self-center ${location.pathname.match(
                "1stfloor"
              ) &&
                "bg-teal-400 text-white shadow-xl"} transition-all transition duration-200 button-scale `}
              to={`${url}/1stfloor`}
            >
              1층
            </Link>

            <Link
              type="button"
              className={`text-center mt-10 text-xl w-full py-2 hover:border border-0 self-center ${location.pathname.match(
                "2ndfloor"
              ) &&
                "bg-teal-400 text-white shadow-xl"} transition-all transition duration-200 button-scale `}
              to={`${url}/2ndfloor`}
            >
              2층
            </Link>
            <button
              onClick={onClickFolded}
              className={`text-gray-700 text-center mt-10 text-xl w-40 hover:border border-0 self-center focus:outline-none button-scale `}
            >
              접 기
            </button>
          </div>
        </CSSTransition>
        {!folded && (
          <>
            <button
              className="fixed z-50 left-10 text-teal-500 hover:text-teal-600 focus:outline-none button-scale "
              onClick={onClickFolded}
            >
              <FontAwesomeIcon icon="bars" className="" size="2x" />
            </button>
            <button
              onClick={onClickClearTimeout}
              className={`${
                enableTimeout ? "text-green-500" : "text-red-500"
              } mt-10 fixed z-50 left-10 focus:outline-none transition-all duration-200 button-scale `}
            >
              <FontAwesomeIcon icon="history" className="" size="2x" />
            </button>
          </>
        )}

        <div className="w-full mx-12 z-40">
          <Route
            render={({ location }) => {
              return (
                <TransitionGroup>
                  <CSSTransition
                    key={location.key}
                    timeout={100}
                    classNames="fade"
                  >
                    <ScrollTop>
                      <Switch>
                        <Route exact path={path}>
                          <AllPc></AllPc>
                        </Route>
                        <Route path={`${path}/allpc`}>
                          <AllPc></AllPc>
                        </Route>
                        <Route path={`${path}/1stfloor`}>
                          <Floor1></Floor1>
                        </Route>
                        <Route path={`${path}/2ndfloor`}>
                          <Floor2></Floor2>
                        </Route>
                      </Switch>
                    </ScrollTop>
                  </CSSTransition>
                </TransitionGroup>
              );
            }}
          ></Route>
        </div>
      </div>
    </>
  );
};

export default InterfacePcPage;
