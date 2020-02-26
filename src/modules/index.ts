import { combineReducers } from "redux";
import counter from "./counter";
import user, { userSaga } from "./user";
import github, { githubSaga } from "./github";
import serverStatus, { serverStateSaga } from "./serverStatus";
import { all } from "redux-saga/effects";
import interfacePcList, { interfacePcListSaga } from "./interfacePc";

const rootReducer = combineReducers({
  counter,
  github,
  user,
  serverStatus,
  interfacePcList
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([
    githubSaga(),
    userSaga(),
    serverStateSaga(),
    interfacePcListSaga()
  ]);
}
