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
                <AccentButton onClick={onClickHandler}>Reset</AccentButton>
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
