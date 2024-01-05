import {createListenerMiddleware} from '@reduxjs/toolkit';
import {
  extractMessageFromKeyboardAPIError,
  logAppError,
  logKeyboardAPIError,
} from './errorsSlice';
import {formatNumberAsHex} from 'src/utils/format';
import {DeviceInfo} from 'src/types/types';

export const errorsListenerMiddleware = createListenerMiddleware();

errorsListenerMiddleware.startListening({
  actionCreator: logAppError,
  effect: async ({payload: {message, deviceInfo}}, listenerApi) => {
    console.log(message, deviceInfo);
  },
});

errorsListenerMiddleware.startListening({
  actionCreator: logKeyboardAPIError,
  effect: async ({payload}, listenerApi) => {
    console.log(
      extractMessageFromKeyboardAPIError(payload),
      payload.deviceInfo,
    );
  },
});
