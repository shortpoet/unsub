import { SnackbarAction, SnackbarContentCallback } from 'notistack';

export interface SnackbarMsg {
  text: string;
  action: SnackbarAction;
  preventDuplicate: boolean;
  persist: boolean;
  variant: 'default' | 'error' | 'success' | 'warning' | 'info';
  content?: SnackbarContentCallback;
}
