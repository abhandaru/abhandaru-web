import * as React from 'react';

export const useTimer = (period, callback) => {
  const ref = React.useRef()
  React.useEffect(() => {
    ref.current = setInterval(callback, period);
    return () => ref.current && clearInterval(ref.current);
  }, []);
};

export const useDelay = (delay, callback) => {
  const ref = React.useRef()
  React.useEffect(() => {
    ref.current = setTimeout(callback, delay);
    return () => ref.current && clearTimeout(ref.current);
  }, []);
};
