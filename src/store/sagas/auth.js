import { put, delay, call } from "redux-saga/effects";
import axios from "axios";
import * as actions from "../actions/index";

export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "expirationTime");
  yield call([localStorage, "removeItem"], "userId");
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.pass,
    returnSecureToken: true
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCxKPC9_gKmYFOBYv3DdvBkufR2z4QCAlE";
  if (!action.isSignup) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCxKPC9_gKmYFOBYv3DdvBkufR2z4QCAlE";
  }
  try {
    const res = yield axios.post(url, authData);

    const expirationTime = new Date(
      new Date().getTime() + res.data.expiresIn * 1000
    );
    yield call([localStorage, "setItem"], "token", res.data.idToken);
    yield call([localStorage, "setItem"], "expirationTime", expirationTime);
    yield call([localStorage, "setItem"], "userId", res.data.localId);
    yield put(actions.authSuccess(res.data.idToken, res.data.localId));
    yield put(actions.checkAuthTimeout(res.data.expiresIn));
  } catch (err) {
    yield put(actions.authFail(err.response.data.error));
  }
}

export function* authCheckSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationTime = yield new Date(
      localStorage.getItem("expirationTime")
    );
    if (expirationTime.getTime() <= new Date().getTime()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeout(
          (expirationTime.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}
