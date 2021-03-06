import { getLoginAsync, LOGIN, LOGOUT } from "./actions";
import { put, takeEvery, call, select } from "redux-saga/effects";
import { LoginResponse, getUserToken } from "../api/loginAPI";
import { UserState } from "./types";

function* loginSaga(action: ReturnType<typeof getLoginAsync.request>) {
  try {
    const userProfile: LoginResponse = yield call(getUserToken, action.payload);

    const state: UserState = {
      isLogin: true,
      isLoading: false,
      token: `xjwt ${userProfile.token}`,
      id: userProfile.id,
      error: undefined,
      errorMsg: undefined,
      floorTimer: false
    };

    yield put(getLoginAsync.success(state));
    const selectState = yield select();
    localStorage.setItem("jwt_token", selectState.user.token);
    localStorage.setItem("userinfo", JSON.stringify(state));
  } catch (e) {
    console.log(e);
    yield put(getLoginAsync.failure(e));
  }
}
function* logoutSaga() {
  yield;
  localStorage.removeItem("jwt_token");
  yield;
  localStorage.removeItem("userinfo");
}

export function* userSaga() {
  yield takeEvery(LOGIN, loginSaga);
  yield takeEvery(LOGOUT, logoutSaga);
}
