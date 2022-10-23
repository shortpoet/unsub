import { useHandler } from '@aux4/use-handler';
import { MESSAGE } from '../event/Event';
import { SharedProps, SnackbarMessage, useSnackbar } from 'notistack';
import { SnackbarMsg } from '../types/SnackbarMsg';

export function SnackbarMessages() {
  const { enqueueSnackbar } = useSnackbar();

  useHandler(
    (eventType: any, message: SnackbarMsg) => {
      enqueueSnackbar(message.text, {
        action: message.action,
        persist: message.persist,
        preventDuplicate: message.preventDuplicate,
        variant: message.variant
      });
    },
    [MESSAGE]
  );
  return null;
}
