import React, {useState, useEffect, useRef, FC} from 'react';
import fullKeyboardDefinition from '../../utils/test-keyboard-definition.json';
import basicKeyToByte from '../../utils/key-to-byte/default';
import {Pane} from './pane';
import styled from 'styled-components';
import {PROTOCOL_GAMMA, KeyboardValue} from '../../utils/keyboard-api';
import {TestKeyboard, TestKeyState} from '../test-keyboard';
import {
  ControlRow,
  Label,
  Detail,
  OverflowCell,
  FlexCell,
  Grid1Col,
} from './grid';
import {AccentSlider} from '../inputs/accent-slider';
import {AccentButton} from '../inputs/accent-button';
import {useDispatch} from 'react-redux';
import {useAppSelector} from 'src/store/hooks';
import {getSelectedConnectedDevice} from 'src/store/devicesSlice';
import {
  getSelectedDefinition,
  getSelectedKeyDefinitions,
} from 'src/store/definitionsSlice';
import {
  getIsTestMatrixEnabled,
  setTestMatrixEnabled,
} from 'src/store/settingsSlice';
import {useSize} from 'src/utils/use-size';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 12px;
`;

const TestPane = styled(Pane)`
  display: flex;
  height: 100%;
  max-width: 100vw;
  flex-direction: column;
`;

export function getIndexByEvent(evt: KeyboardEvent): number {
  const code = evt.code;
  const byte =
    evtToKeyByte[code as keyof typeof evtToKeyByte] ||
    evtToKeyByte[evt.key as keyof typeof evtToKeyByte];
  if (byte) {
    return matrixKeycodes.indexOf(byte);
  }
  return -1;
}

export const matrixKeycodes = [
  // Row 0
  basicKeyToByte.KC_ESC,
  basicKeyToByte.KC_F1,
  basicKeyToByte.KC_F2,
  basicKeyToByte.KC_F3,
  basicKeyToByte.KC_F4,
  basicKeyToByte.KC_F5,
  basicKeyToByte.KC_F6,
  basicKeyToByte.KC_F7,
  basicKeyToByte.KC_F8,
  basicKeyToByte.KC_F9,
  basicKeyToByte.KC_F10,
  basicKeyToByte.KC_F11,
  basicKeyToByte.KC_F12,
  basicKeyToByte.KC_PSCR,
  basicKeyToByte.KC_SLCK,
  basicKeyToByte.KC_PAUS,
  basicKeyToByte.KC_SLEP,
  basicKeyToByte.KC_MUTE,
  basicKeyToByte.KC_VOLD,
  basicKeyToByte.KC_VOLU,
  // Row 1
  basicKeyToByte.KC_GRV,
  basicKeyToByte.KC_1,
  basicKeyToByte.KC_2,
  basicKeyToByte.KC_3,
  basicKeyToByte.KC_4,
  basicKeyToByte.KC_5,
  basicKeyToByte.KC_6,
  basicKeyToByte.KC_7,
  basicKeyToByte.KC_8,
  basicKeyToByte.KC_9,
  basicKeyToByte.KC_0,
  basicKeyToByte.KC_MINS,
  basicKeyToByte.KC_EQL,
  basicKeyToByte.KC_BSPC,
  basicKeyToByte.KC_INS,
  basicKeyToByte.KC_HOME,
  basicKeyToByte.KC_PGUP,
  basicKeyToByte.KC_NLCK,
  basicKeyToByte.KC_PSLS,
  basicKeyToByte.KC_PAST,
  basicKeyToByte.KC_PMNS,
  // Row 2
  basicKeyToByte.KC_TAB,
  basicKeyToByte.KC_Q,
  basicKeyToByte.KC_W,
  basicKeyToByte.KC_E,
  basicKeyToByte.KC_R,
  basicKeyToByte.KC_T,
  basicKeyToByte.KC_Y,
  basicKeyToByte.KC_U,
  basicKeyToByte.KC_I,
  basicKeyToByte.KC_O,
  basicKeyToByte.KC_P,
  basicKeyToByte.KC_LBRC,
  basicKeyToByte.KC_RBRC,
  basicKeyToByte.KC_BSLS,
  basicKeyToByte.KC_DEL,
  basicKeyToByte.KC_END,
  basicKeyToByte.KC_PGDN,
  basicKeyToByte.KC_P7,
  basicKeyToByte.KC_P8,
  basicKeyToByte.KC_P9,
  basicKeyToByte.KC_PPLS,
  // Row 3
  basicKeyToByte.KC_CAPS,
  basicKeyToByte.KC_A,
  basicKeyToByte.KC_S,
  basicKeyToByte.KC_D,
  basicKeyToByte.KC_F,
  basicKeyToByte.KC_G,
  basicKeyToByte.KC_H,
  basicKeyToByte.KC_J,
  basicKeyToByte.KC_K,
  basicKeyToByte.KC_L,
  basicKeyToByte.KC_SCLN,
  basicKeyToByte.KC_QUOT,
  basicKeyToByte.KC_ENT,
  basicKeyToByte.KC_P4,
  basicKeyToByte.KC_P5,
  basicKeyToByte.KC_P6,
  // Row 4
  basicKeyToByte.KC_LSFT,
  basicKeyToByte.KC_Z,
  basicKeyToByte.KC_X,
  basicKeyToByte.KC_C,
  basicKeyToByte.KC_V,
  basicKeyToByte.KC_B,
  basicKeyToByte.KC_N,
  basicKeyToByte.KC_M,
  basicKeyToByte.KC_COMM,
  basicKeyToByte.KC_DOT,
  basicKeyToByte.KC_SLSH,
  basicKeyToByte.KC_RSFT,
  basicKeyToByte.KC_UP,
  basicKeyToByte.KC_P1,
  basicKeyToByte.KC_P2,
  basicKeyToByte.KC_P3,
  basicKeyToByte.KC_PENT,
  // Row 5
  basicKeyToByte.KC_LCTL,
  basicKeyToByte.KC_LGUI,
  basicKeyToByte.KC_LALT,
  basicKeyToByte.KC_SPC,
  basicKeyToByte.KC_RALT,
  basicKeyToByte.KC_RGUI,
  basicKeyToByte.KC_MENU,
  basicKeyToByte.KC_RCTL,
  basicKeyToByte.KC_LEFT,
  basicKeyToByte.KC_DOWN,
  basicKeyToByte.KC_RGHT,
  basicKeyToByte.KC_P0,
  basicKeyToByte.KC_PDOT,
];

const evtToKeyByte = {
  Digit1: basicKeyToByte.KC_1,
  Digit2: basicKeyToByte.KC_2,
  Digit3: basicKeyToByte.KC_3,
  Digit4: basicKeyToByte.KC_4,
  Digit5: basicKeyToByte.KC_5,
  Digit6: basicKeyToByte.KC_6,
  Digit7: basicKeyToByte.KC_7,
  Digit8: basicKeyToByte.KC_8,
  Digit9: basicKeyToByte.KC_9,
  Digit0: basicKeyToByte.KC_0,
  KeyA: basicKeyToByte.KC_A,
  KeyB: basicKeyToByte.KC_B,
  KeyC: basicKeyToByte.KC_C,
  KeyD: basicKeyToByte.KC_D,
  KeyE: basicKeyToByte.KC_E,
  KeyF: basicKeyToByte.KC_F,
  KeyG: basicKeyToByte.KC_G,
  KeyH: basicKeyToByte.KC_H,
  KeyI: basicKeyToByte.KC_I,
  KeyJ: basicKeyToByte.KC_J,
  KeyK: basicKeyToByte.KC_K,
  KeyL: basicKeyToByte.KC_L,
  KeyM: basicKeyToByte.KC_M,
  KeyN: basicKeyToByte.KC_N,
  KeyO: basicKeyToByte.KC_O,
  KeyP: basicKeyToByte.KC_P,
  KeyQ: basicKeyToByte.KC_Q,
  KeyR: basicKeyToByte.KC_R,
  KeyS: basicKeyToByte.KC_S,
  KeyT: basicKeyToByte.KC_T,
  KeyU: basicKeyToByte.KC_U,
  KeyV: basicKeyToByte.KC_V,
  KeyW: basicKeyToByte.KC_W,
  KeyX: basicKeyToByte.KC_X,
  KeyY: basicKeyToByte.KC_Y,
  KeyZ: basicKeyToByte.KC_Z,
  Comma: basicKeyToByte.KC_COMM,
  Period: basicKeyToByte.KC_DOT,
  Semicolon: basicKeyToByte.KC_SCLN,
  Quote: basicKeyToByte.KC_QUOT,
  BracketLeft: basicKeyToByte.KC_LBRC,
  BracketRight: basicKeyToByte.KC_RBRC,
  Backspace: basicKeyToByte.KC_BSPC,
  Backquote: basicKeyToByte.KC_GRV,
  Slash: basicKeyToByte.KC_SLSH,
  Backslash: basicKeyToByte.KC_BSLS,
  Minus: basicKeyToByte.KC_MINS,
  Equal: basicKeyToByte.KC_EQL,
  IntlRo: basicKeyToByte.KC_RO,
  IntlYen: basicKeyToByte.KC_JYEN,
  AltLeft: basicKeyToByte.KC_LALT,
  AltRight: basicKeyToByte.KC_RALT,
  CapsLock: basicKeyToByte.KC_CAPS,
  ControlLeft: basicKeyToByte.KC_LCTL,
  ControlRight: basicKeyToByte.KC_RCTL,
  MetaLeft: basicKeyToByte.KC_LGUI,
  MetaRight: basicKeyToByte.KC_RGUI,
  OSLeft: basicKeyToByte.KC_LGUI,
  OSRight: basicKeyToByte.KC_RGUI,
  ShiftLeft: basicKeyToByte.KC_LSFT,
  ShiftRight: basicKeyToByte.KC_RSFT,
  ContextMenu: basicKeyToByte.KC_APP,
  Enter: basicKeyToByte.KC_ENT,
  Space: basicKeyToByte.KC_SPC,
  Tab: basicKeyToByte.KC_TAB,
  Delete: basicKeyToByte.KC_DEL,
  End: basicKeyToByte.KC_END,
  Help: basicKeyToByte.KC_HELP,
  Home: basicKeyToByte.KC_HOME,
  Insert: basicKeyToByte.KC_INS,
  PageDown: basicKeyToByte.KC_PGDN,
  PageUp: basicKeyToByte.KC_PGUP,
  ArrowDown: basicKeyToByte.KC_DOWN,
  ArrowLeft: basicKeyToByte.KC_LEFT,
  ArrowRight: basicKeyToByte.KC_RGHT,
  ArrowUp: basicKeyToByte.KC_UP,
  Escape: basicKeyToByte.KC_ESC,
  PrintScreen: basicKeyToByte.KC_PSCR,
  ScrollLock: basicKeyToByte.KC_SLCK,
  AudioVolumeUp: basicKeyToByte.KC_VOLU,
  AudioVolumeDown: basicKeyToByte.KC_VOLD,
  AudioVolumeMute: basicKeyToByte.KC_MUTE,
  Pause: basicKeyToByte.KC_PAUS,
  F1: basicKeyToByte.KC_F1,
  F2: basicKeyToByte.KC_F2,
  F3: basicKeyToByte.KC_F3,
  F4: basicKeyToByte.KC_F4,
  F5: basicKeyToByte.KC_F5,
  F6: basicKeyToByte.KC_F6,
  F7: basicKeyToByte.KC_F7,
  F8: basicKeyToByte.KC_F8,
  F9: basicKeyToByte.KC_F9,
  F10: basicKeyToByte.KC_F10,
  F11: basicKeyToByte.KC_F11,
  F12: basicKeyToByte.KC_F12,
  F13: basicKeyToByte.KC_F13,
  F14: basicKeyToByte.KC_F14,
  F15: basicKeyToByte.KC_F15,
  F16: basicKeyToByte.KC_F16,
  F17: basicKeyToByte.KC_F17,
  F18: basicKeyToByte.KC_F18,
  F19: basicKeyToByte.KC_F19,
  F20: basicKeyToByte.KC_F20,
  F21: basicKeyToByte.KC_F21,
  F22: basicKeyToByte.KC_F22,
  F23: basicKeyToByte.KC_F23,
  F24: basicKeyToByte.KC_F24,
  NumLock: basicKeyToByte.KC_NLCK,
  Numpad0: basicKeyToByte.KC_P0,
  Numpad1: basicKeyToByte.KC_P1,
  Numpad2: basicKeyToByte.KC_P2,
  Numpad3: basicKeyToByte.KC_P3,
  Numpad4: basicKeyToByte.KC_P4,
  Numpad5: basicKeyToByte.KC_P5,
  Numpad6: basicKeyToByte.KC_P6,
  Numpad7: basicKeyToByte.KC_P7,
  Numpad8: basicKeyToByte.KC_P8,
  Numpad9: basicKeyToByte.KC_P9,
  NumpadAdd: basicKeyToByte.KC_PPLS,
  NumpadComma: basicKeyToByte.KC_COMM,
  NumpadDecimal: basicKeyToByte.KC_PDOT,
  NumpadDivide: basicKeyToByte.KC_PSLS,
  NumpadEnter: basicKeyToByte.KC_PENT,
  NumpadEqual: basicKeyToByte.KC_PEQL,
  NumpadMultiply: basicKeyToByte.KC_PAST,
  NumpadSubtract: basicKeyToByte.KC_PMNS,
};

let startTest = false;

const invertTestKeyState = (s: TestKeyState) =>
  s === TestKeyState.KeyDown ? TestKeyState.KeyUp : TestKeyState.KeyDown;

export const Test: FC = () => {
  const dispatch = useDispatch();
  const selectedDevice = useAppSelector(getSelectedConnectedDevice);
  const selectedDefinition = useAppSelector(getSelectedDefinition);
  const keyDefinitions = useAppSelector(getSelectedKeyDefinitions);
  const isTestMatrixEnabled = useAppSelector(getIsTestMatrixEnabled);

  const [selectedKeys, setSelectedKeys] = useState(
    {} as {[key: string]: TestKeyState},
  );

  let flat = [] as number[];

  // If pressed key is our target key then set to true
  function downHandler(evt: KeyboardEvent) {
    evt.preventDefault();
    if (
      !startTest &&
      selectedKeys[getIndexByEvent(evt) ?? -1] !== TestKeyState.KeyDown
    ) {
      setSelectedKeys((selectedKeys) => ({
        ...selectedKeys,
        [getIndexByEvent(evt)]: TestKeyState.KeyDown,
      }));
    }
  }

  // If released key is our target key then set to false
  const upHandler = (evt: KeyboardEvent) => {
    evt.preventDefault();
    if (
      !startTest &&
      selectedKeys[getIndexByEvent(evt)] !== TestKeyState.KeyUp
    ) {
      setSelectedKeys((selectedKeys) => ({
        ...selectedKeys,
        [getIndexByEvent(evt)]: TestKeyState.KeyUp,
      }));
    }
  };

  const useMatrixTest = async () => {
    if (startTest && api && selectedDefinition) {
      const {cols, rows} = selectedDefinition.matrix;
      const bytesPerRow = Math.ceil(cols / 8);
      try {
        const newFlat = (await api.getKeyboardValue(
          KeyboardValue.SWITCH_MATRIX_STATE,
          bytesPerRow * rows,
        )) as number[];

        const keysChanges =
          0 !==
          newFlat.reduce<number>((prev, val, byteIdx) => {
            return (prev + val) ^ (flat[byteIdx] || 0);
          }, 0);
        if (!keysChanges) {
          await api.timeout(20);
          useMatrixTest();
          return;
        }
        setSelectedKeys((selectedKeys) => {
          const newPressedKeys = newFlat.reduce(
            (res, val, byteIdx) => {
              const xor = val ^ (flat[byteIdx] || 0);
              if (xor === 0) {
                return res;
              }
              const row = ~~(byteIdx / bytesPerRow);

              const colOffset = 8 * (bytesPerRow - 1 - (byteIdx % bytesPerRow));
              return Array(Math.max(0, Math.min(8, cols - colOffset)))
                .fill(0)
                .reduce((resres, _, idx) => {
                  const matrixIdx = cols * row + idx + colOffset;
                  resres[matrixIdx] =
                    ((xor >> idx) & 1) === 1
                      ? invertTestKeyState(resres[matrixIdx])
                      : resres[matrixIdx];
                  return resres;
                }, res);
            },
            Array.isArray(selectedKeys) && selectedKeys.length === rows * cols
              ? [...selectedKeys]
              : Array(rows * cols).fill(TestKeyState.Initial),
          );
          return newPressedKeys as any as {[key: string]: TestKeyState};
        });
        flat = newFlat;
        await api.timeout(20);
        useMatrixTest();
      } catch (e) {
        startTest = false;
        dispatch(setTestMatrixEnabled(false));
      }
    }
  };

  const onClickHandler = () => {
    flat = [];
    setSelectedKeys({});
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      startTest = false;
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
      dispatch(setTestMatrixEnabled(false));
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  const flexRef = useRef(null);
  const dimensions = useSize(flexRef);

  const hasTestMatrixDevice =
    selectedDevice && selectedDefinition && keyDefinitions;
  const canUseMatrixState =
    hasTestMatrixDevice && PROTOCOL_GAMMA <= selectedDevice.protocol;

  const api = selectedDevice && selectedDevice.api;
  const pressedKeys =
    !isTestMatrixEnabled || !keyDefinitions
      ? selectedKeys
      : keyDefinitions.map(
          ({row, col}: {row: number; col: number}) =>
            selectedDefinition &&
            selectedKeys[
              (row * selectedDefinition.matrix.cols +
                col) as keyof typeof selectedKeys
            ],
        );
  const testDefinition = isTestMatrixEnabled
    ? selectedDefinition
    : fullKeyboardDefinition;
  const testKeys = isTestMatrixEnabled
    ? keyDefinitions
    : fullKeyboardDefinition.layouts.keys;
  return (
    <TestPane>
      <Grid1Col>
        <FlexCell ref={flexRef}>
          <TestKeyboard
            definition={testDefinition}
            keys={testKeys}
            pressedKeys={pressedKeys}
            matrixKeycodes={isTestMatrixEnabled ? [] : matrixKeycodes}
            containerDimensions={dimensions}
          />
        </FlexCell>
        <OverflowCell>
          <Container>
            <ControlRow>
              <Label>Reset Keyboard</Label>
              <Detail>
                {/*<AccentButton onClick={onClickHandler}>Reset</AccentButton>*/}
              </Detail>
            </ControlRow>
            {canUseMatrixState && selectedDefinition ? (
              <ControlRow>
                <Label>Test Matrix</Label>
                <Detail>
                  <AccentSlider
                    isChecked={isTestMatrixEnabled}
                    onChange={(val) => {
                      startTest = val;

                      dispatch(setTestMatrixEnabled(val));

                      if (val) {
                        setSelectedKeys({});
                        useMatrixTest();
                      } else {
                        setSelectedKeys({});
                      }
                    }}
                  />
                </Detail>
              </ControlRow>
            ) : null}
          </Container>
        </OverflowCell>
      </Grid1Col>
    </TestPane>
  );
};
