import {useEffect, useState} from 'react';
import {TestKeyState} from 'src/types/types';
import {getIndexByEvent} from './key-event';

type TestKeys = {[code: number]: TestKeyState};
export const useGlobalKeys = (enableGlobalKeys: boolean) => {
  const startMatrixTest = !enableGlobalKeys;
  const selectedKeysState = useState<TestKeys>({});
  const [selectedKeys, setSelectedKeys] = selectedKeysState;
  // If pressed key is our target key then set to true
  function downHandler(evt: KeyboardEvent) {
    evt.preventDefault();
    if (
      !startMatrixTest &&
      !evt.repeat &&
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
      !startMatrixTest &&
      selectedKeys[getIndexByEvent(evt)] !== TestKeyState.KeyUp
    ) {
      setSelectedKeys((selectedKeys) => ({
        ...selectedKeys,
        [getIndexByEvent(evt)]: TestKeyState.KeyUp,
      }));
    }
  };

  useEffect(() => {
    if (enableGlobalKeys) {
      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);
    }
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [enableGlobalKeys]); // Empty array ensures that effect is only run on mount and unmount
  return selectedKeysState;
};
