import type {KeyboardAPI} from '../keyboard-api';
import {getVersionedKeycodeDict} from '../keycode-dict';
import {MacroAPI, validateMacroExpression} from './macro-api';
import {MacroAPIV11, validateMacroExpressionV11} from './macro-api.v11';

export const getMacroAPI = (protocol: number, keyboardApi: KeyboardAPI) => {
  const keycodeDict = getVersionedKeycodeDict(protocol);
  return protocol >= 11
    ? new MacroAPIV11(keyboardApi, keycodeDict)
    : new MacroAPI(keyboardApi, keycodeDict);
};

export const getMacroValidator = (protocol: number) =>
  protocol >= 11 ? validateMacroExpressionV11 : validateMacroExpression;

export const isDelaySupported = (protocol: number) => protocol >= 11;
