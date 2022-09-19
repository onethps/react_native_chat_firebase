import { InteractionManager, Platform, TextInput } from 'react-native';
import { useEffect, useRef } from 'react';

export default function useAutoFocusInput(autoFocus = Platform.OS === 'android') {
  const ref = useRef<TextInput>(null);

  useEffect(() => {
    const handle = InteractionManager.runAfterInteractions(() => {
      if (ref.current && autoFocus) {
        ref.current.focus();
      }
    });

    return handle.cancel;
  }, [autoFocus]);

  return {
    ref,
    // this is used as prop on the component; it is therefore the negated value
    // of whether or not this hook will handle the auto-focusing
    autoFocus: !autoFocus,
  };
}
