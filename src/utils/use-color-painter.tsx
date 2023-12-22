import {ThreeEvent} from '@react-three/fiber';
import {VIAKey} from '@the-via/reader';
import {useCallback, useEffect, useState} from 'react';
import {
  getSelectedConnectedDevice,
  getSelectedKeyboardAPI,
} from 'src/store/devicesSlice';
import {useAppSelector} from 'src/store/hooks';
import {getSelectedCustomMenuData} from 'src/store/menusSlice';
import {getHSVFrom256} from './color-math';

export const useColorPainter = (
  keys: VIAKey[],
  selectedPaletteColor: [number, number],
) => {
  const selectedDevice = useAppSelector(getSelectedConnectedDevice);
  const api = useAppSelector(getSelectedKeyboardAPI);
  const customMenuData = useAppSelector(getSelectedCustomMenuData) || {
    __perKeyRGB: [],
  };
  const [keyColors, setKeyColors] = useState<number[][]>([]);

  useEffect(() => {
    const perKeyRGB = (customMenuData as any).__perKeyRGB ?? [];
    const ledIndices = keys.find((k) => 'li' in k)
      ? keys.map((k) => k.li ?? -1)
      : [];
    const storeKeyColors = ledIndices.map((i: number) => {
      const color = perKeyRGB[i ?? -1];
      if (color) {
        return getHSVFrom256(color);
      }
      return undefined;
    });
    setKeyColors(storeKeyColors as any);
  }, [customMenuData.__perKeyRGB && customMenuData.__perKeyRGB.length, keys]);

  const onKeycapPointerHandler = useCallback(
    (evt: ThreeEvent<MouseEvent> | React.MouseEvent, idx: number) => {
      if (evt.buttons === 1 && api) {
        const hue = Math.round((selectedPaletteColor[0] * 255) / 360);
        const sat = Math.round(selectedPaletteColor[1] * 255);
        const ledIndex = keys[idx].li;
        if (ledIndex !== undefined) {
          api.setPerKeyRGBMatrix(ledIndex, hue, sat);
          api.commitCustomMenu(0);
          setKeyColors((colors) => {
            colors[idx] = selectedPaletteColor;
            return [...colors];
          });
        }
      }
    },
    [setKeyColors, selectedPaletteColor, keys, selectedDevice],
  );

  return {
    keyColors,
    onKeycapPointerDown: onKeycapPointerHandler,
    onKeycapPointerOver: onKeycapPointerHandler,
  };
};
