import { getLoginAsync, LOGIN } from "./actions";
import { put, takeEvery, call } from "redux-saga/effects";
import { UserState } from "./types";
import { typeLoginResponse, getUserToken } from "../../api/loginAPI";

function* loginSaga(action: ReturnType<typeof getLoginAsync.request>) {
  try {
    const userProfile: typeLoginResponse = yield call(
      getUserToken,
      action.payload
    );

    const state: UserState = {
      isLogin: true,
      isLoading: false,
      token: `xjwt ${userProfile.token}`,
      id: userProfile.id,
      error: undefined,
      errorMsg: undefined
    };

    yield put(getLoginAsync.success(state));
  } catch (e) {
    console.log(e);
    yield put(getLoginAsync.failure(e));
  }
}

export function* userSaga() {
  yield takeEvery(LOGIN, loginSaga);
}
