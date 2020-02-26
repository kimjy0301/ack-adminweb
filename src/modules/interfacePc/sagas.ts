import { getInterfacePcListAsync, INTERFACEPCLIST } from "./actions";
import { put, takeEvery, call } from "redux-saga/effects";
import { InterfacePcList } from "./types";
import { getInterfacePcList } from "../../api/InterfacePcAPI";

function* getInterfacePcListSaga() {
  try {
    const interfacePcList: InterfacePcList = yield call(getInterfacePcList);
    yield put(getInterfacePcListAsync.success(interfacePcList));
  } catch (e) {
    yield put(getInterfacePcListAsync.failure(e));
  }
}

export function* interfacePcListSaga() {
  yield takeEvery(INTERFACEPCLIST, getInterfacePcListSaga);
}
