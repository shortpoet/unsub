import { CLOSE_SIDEBAR, OPEN_SIDEBAR, LOGIN, LOGOUT, MESSAGE } from './Event';
// import { Action } from 'redux';
// import { Dispatcher } from 'flux';
import { Dispatcher } from '@aux4/dispatcher.js';
import { storeCredentials, removeCredentials } from '../api/SecurityApi';
import { SnackbarMsg } from '../types/SnackbarMsg';

export function openSidebar() {
  Dispatcher.dispatch(OPEN_SIDEBAR);
}

export function closeSidebar() {
  Dispatcher.dispatch(CLOSE_SIDEBAR);
}

export function login(session: any) {
  storeCredentials(session);
  Dispatcher.dispatch(LOGIN, session.user);
}

export function logout() {
  removeCredentials();
  Dispatcher.dispatch(LOGOUT);
}

export function displaySnackbarMessage(message: SnackbarMsg) {
  Dispatcher.dispatch(MESSAGE, message);
}
