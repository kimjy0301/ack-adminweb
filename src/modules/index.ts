import { combineReducers } from "redux";
import counter from "./counter";
import user, { userSaga } from "./user";
import github, { githubSaga } from "./github";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  counter,
  github,
  user
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([githubSaga(), userSaga()]);
}
