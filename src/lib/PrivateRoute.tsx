import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../modules";

type RouteType = {
  children: any;
  path: string;
};

function PrivateRoute({ children, ...rest }: RouteType) {
  //const isLogin = true;
  const isLogin = useSelector((state: RootState) => state.user.isLogin);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
