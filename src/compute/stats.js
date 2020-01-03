export const Random = (seed) => {
  let internalSeed = seed;

  const uniform = () => {
    const x = Math.sin(internalSeed++) * 10000;
    return x - Math.floor(x);
  };

  const gaussian = () => {
    let u = 0;
    let v = 0;
    // Converting [0,1) to (0,1)
    while (u === 0) u = uniform();
    while (v === 0) v = uniform();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  };

  const bool = () => uniform() < 0.5;

  return { uniform, gaussian, bool };
};
