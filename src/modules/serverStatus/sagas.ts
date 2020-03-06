import { getServerStateAsync, SERVERSTATUS } from "./actions";
import { put, takeEvery, call, delay } from "redux-saga/effects";
import { ServerStatusState } from "./types";
import { getServerStatus } from "../api/StatusAPI";

function* getServerStateSaga() {
  try {
    yield delay(1000);
    const serverStatus: ServerStatusState = yield call(getServerStatus);
    yield put(getServerStateAsync.success(serverStatus));
  } catch (e) {
    yield put(getServerStateAsync.failure(e));
  }
}

export function* serverStateSaga() {
  yield takeEvery(SERVERSTATUS, getServerStateSaga);
}
