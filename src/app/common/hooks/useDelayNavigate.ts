import { useCallback, useEffect, useRef, useState } from 'react';
import { unstable_Blocker as Blocker, unstable_useBlocker as useBlocker } from 'react-router';

export function useDelayNavigate(delay = 500, onStartTimeout: () => void, urlBase: string) {
  const [status, setStatus] = useState<'idle' | 'pending' | 'complete'>('idle');
  const exitTimeoutId = useRef<NodeJS.Timeout | undefined>();
  const blocker = useBlocker(({ nextLocation }) => {
    return nextLocation && nextLocation.pathname.indexOf(urlBase) === -1;
  });

  const startTimeout = useCallback(
    (blocker: Blocker) => {
      if (!exitTimeoutId.current && blocker.state === 'blocked') {
        onStartTimeout();
        setStatus('pending');
        exitTimeoutId.current = setTimeout(() => {
          if (blocker.proceed) {
            blocker.proceed();
          }
          // reset is required to prevent multiple instances of blocker
          if (blocker.reset) {
            blocker.reset();
          }

          setStatus('complete');
        }, delay);
      }
    },
    [delay, onStartTimeout]
  );

  useEffect(() => {
    startTimeout(blocker);
  }, [blocker, startTimeout]);

  return [status];
}
