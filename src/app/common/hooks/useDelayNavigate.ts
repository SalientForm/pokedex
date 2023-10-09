import { useCallback, useEffect, useRef, useState } from 'react';
import { unstable_useBlocker as useBlocker } from 'react-router';

export function useDelayNavigate(delay = 500, urlBase: string) {
  const [status, setStatus] = useState<'idle' | 'pending' | 'complete'>('idle');
  const exitTimeoutId = useRef<NodeJS.Timeout | undefined>();
  const blocker = useBlocker(({ nextLocation }) => {
    // !exitTimeoutId.current "once timeout has started, do not block any subsequent navigations"
    // TODO: is it possible to simply retarget subsequent navigations?
    return nextLocation && nextLocation.pathname.indexOf(urlBase) === -1 && !exitTimeoutId.current;
  });

  const startTimeout = useCallback(() => {
    if (!exitTimeoutId.current && blocker.state === 'blocked') {
      setStatus('pending');
      exitTimeoutId.current = setTimeout(() => {
        if (blocker.state === 'blocked' && blocker.proceed) {
          blocker.proceed();
        }
        // reset is required to prevent multiple instances of blocker
        if (blocker.reset) {
          blocker.reset();
        }

        setStatus('complete');
      }, delay);
    }
  }, [blocker, delay]);

  useEffect(() => {
    startTimeout();
    return () => {
      if (exitTimeoutId.current) {
        clearTimeout(exitTimeoutId.current);
      }
    };
  }, [blocker, startTimeout, urlBase]);

  return [status];
}
