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
import Floor from "./equip/Floor";
import ScrollTop from "../../lib/ScrollTop";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../modules";
import { setfloortimer } from "../../modules/user";
import {
  getInterfacePcListAsync,
  InterfacePcState
} from "../../modules/interfacePc";
import List3D from "../3dList/List3D";
import GridPcList from "./equip/GridPcList";

let urlList: string[] = [];

const InterfacePcPage = () => {
  let { path, url } = useRouteMatch();

  const [folded, setFolded] = useState(true);

  const enableTimeout = useSelector(
    (state: RootState) => state.user.floorTimer
  );

  const dispatch = useDispatch();
  const interfacePcStateList: InterfacePcState[] = useSelector(
    (state: RootState) => state.interfacePcList.results
  );

  const tempList: string[] = [];
  interfacePcStateList.map((value: InterfacePcState) =>
    tempList.push(value.equip.lab.floor)
  );
  // 층 리스트 추출
  const distinctList = tempList
    .filter((item, index) => tempList.indexOf(item) === index)
    .sort((a, b) => {
      if (a.match("지하")) {
        return -10;
      } else {
        const z: number = +a.replace("층", "");
        const y: number = +b.replace("층", "");

        if (z > y) {
          return 1;
        } else if (z < y) {
          return -1;
        }
        return 0;
      }
    });
  distinctList.map(value => urlList.push(`/interfacepc/floor/${value}/`));

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
    timer = setInterval(() => {
      dispatch(getInterfacePcListAsync.request());
    }, 60000000);
    return () => {
      clearInterval(timer);
    };
  }, [dispatch]);

  useEffect(() => {
    let timer: any;
    if (enableTimeout) {
      timer = setTimeout(() => {
        //history.push(pushPath);
      }, 10000);
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
        className="flex mt-20 w-full transition duration-700 opacity-0"
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
                "bg-teal-400 text-white shadow-xl"} transition duration-200 button-scale `}
              to={`${url}/allpc`}
            >
              전체리스트
            </Link>
            <Link
              type="button"
              className={`text-center mt-10 text-xl w-full py-2 hover:border border-0 self-center ${location.pathname.match(
                "gridpclist"
              ) &&
                "bg-teal-400 text-white shadow-xl"} transition duration-200 button-scale `}
              to={`${url}/gridpclist`}
            >
              DataGrid 리스트
            </Link>

            
            {/* {distinctList.map((value: string, i) => (
              <Link
                key={i}
                type="button"
                className={`text-center mt-6 text-xl w-full py-2 hover:border border-0 self-center ${location.pathname.match(
                  `floor/${value}`
                ) &&
                  "bg-teal-400 text-white shadow-xl"} transition duration-200 button-scale `}
                to={`${url}/floor/${value}`}
              >
                {value}
              </Link>
            ))} */}

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
                        <Route path={`${path}/gridpclist`}>
                          <GridPcList></GridPcList>
                        </Route>
                        <Route path={`${path}/3dlist`}>
                          <List3D></List3D>
                        </Route>
                        <Route path={`${path}/floor/:floorId`}>
                          <Floor></Floor>
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
