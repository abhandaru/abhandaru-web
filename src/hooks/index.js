import * as React from 'react';

export const useTimer = (period, callback) => {
  const ref = React.useRef()
  React.useEffect(() => {
    ref.current = setInterval(callback, period);
    return () => ref.current && clearInterval(ref.current);
  }, []);
};
