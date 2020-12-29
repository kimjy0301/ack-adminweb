import React, { useState, useEffect, useRef } from "react";
import AllPc from "./equip/AllPc";
import {
  Link,
  useRouteMatch,
  Switch,
  Route,
  useLocation,
  useHistory,
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
  InterfacePcState,
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
  distinctList.map((value) => urlList.push(`/interfacepc/floor/${value}/`));

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
                          <GridPcList></GridPcList>
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
