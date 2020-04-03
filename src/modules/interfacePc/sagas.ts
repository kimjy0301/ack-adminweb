import {
  getInterfacePcListAsync,
  INTERFACEPCLIST,
  INTERFACEPC_POSITION,
  setInterfacePcPositionAsync,
  interfacepc_set
} from "./actions";
import { put, takeEvery, call, delay, takeLatest } from "redux-saga/effects";
import { InterfacePcList, InterfacePcState } from "./types";
import {
  getInterfacePcList,
  setInterfacePcPosition
} from "../api/InterfacePcAPI";
import { addError } from "../error";

function* getInterfacePcListSaga() {
  try {
    const interfacePcList: InterfacePcList = yield call(getInterfacePcList);
    yield put(getInterfacePcListAsync.success(interfacePcList));
  } catch (e) {
    yield put(addError({ errorMsg: e.message }));
    yield put(getInterfacePcListAsync.failure(e));
  }
}

function* setInterfacePcPositionSaga(
  action: ReturnType<typeof setInterfacePcPositionAsync.request>
) {
  try {
    const interfacePcState: InterfacePcState = yield call(
      setInterfacePcPosition,
      action.payload
    );

    yield delay(100);
    yield put(interfacepc_set(interfacePcState));

    yield put(setInterfacePcPositionAsync.success(interfacePcState));
  } catch (e) {
    yield put(setInterfacePcPositionAsync.failure(e));
  }
}

export function* interfacePcListSaga() {
  yield takeLatest(INTERFACEPCLIST, getInterfacePcListSaga);
  yield takeEvery(INTERFACEPC_POSITION, setInterfacePcPositionSaga);
}
