const Padding = 2;
const MinSpan = 1;
const MaxSpan = 3;
const Frequency = 0.1;

/**
 * Until we do something like curved bridges (awesome), we can just do row and
 * column-wise longest run computations.
 *
 * TODO (adu): There is probably a better way to represent the transpose
 * computation. The perf. here is about optimal though so we will leave
 * it for now.
*/
export const genPatch = (rand, grid) => {
  const isWaterWay = _ => _.type === 'Connector' && _.component === 'WaterWay';
  const candidates = [];
  const patch = [];

  // Do the row-wise runs.
  for (let i = Padding; i < grid.length - 1; i += 2) {
    let run = [];
    for (let j = 1; j < grid[0].length - 1; j += 2) {
      const node = grid[i][j];
      if (isWaterWay(node)) {
        run.push(node);
      } else if (run.length) {
        candidates.push(run);
        run = [];
      }
    }
  }

  // Now the column-wise runs.
  for (let j = 0; j < grid[0].length - 1; j += 2) {
    let run = [];
    for (let i = 1; i < grid.length - 1; i += 2) {
      const node = grid[i][j];
      if (isWaterWay(node)) {
        run.push(node);
      } else if (run.length) {
        candidates.push(run);
        run = [];
      }
    }
  }

  candidates.forEach(run => {
    const spanOk = MinSpan <= run.length && run.length <= MaxSpan
    const canBuild = spanOk && rand.uniform() < 0.1;
    if (canBuild) {
      run.forEach((node, i) => {
        const bridge = { index: i, length: run.length };
        const next = ({ ...node, component: 'Bridge', bridge });
        patch.push(next);
      });
    }
  });

  console.log(patch);

  return patch;
};
