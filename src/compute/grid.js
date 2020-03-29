import * as Stats from './stats';
import * as Interaction from './interaction';
import * as Briges from './Bridges';

export const BlockWidth = 1;
export const ConnectorWidth = 0.3;
export const BlockWeights = [
  [0, 'Pavement'],
  [0, 'Construction'],
  [0.5, 'Water'],
  [2, 'Park'],
  [5, 'WoodedArea'],
  [5, 'Building'],
];
export const BlockWeightsTotal = BlockWeights.reduce((z, w) => w[0] + z, 0)
export const BlockWeightsNormalized = BlockWeights.map(w => [w[0] / BlockWeightsTotal, w[1]]);

// List these out instead of a loop to preserve clockwise ordering.
export const NeighborDeltas = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
];

// Maybe swap with different implementations later.
// Some sort of markov model might also make sense, would have to see if the
// results look natural.
export const generate = (seed, size) => {
  const grid = Array(size * 2 + 1).fill(null).map(_ => Array(size * 2 + 1));
  const rand = Stats.Random(seed);
  for (let i = 1; i < grid.length - 1; i += 2) {
    for (let j = 1; j < grid[0].length - 1; j += 2) {
      const row = i - size;
      const col = j - size;
      grid[i - 1][j - 1] = genIntersection(grid, row - 1, col - 1, 'top-left');
      grid[i - 1][j] = genConnector(grid, row - 1, col, 'horizontal');
      grid[i - 1][j + 1] = genIntersection(grid, row - 1, col + 1, 'top-right');
      grid[i][j - 1] = genConnector(grid, row, col - 1, 'vertical');
      grid[i][j] = genBlock(rand, grid, row, col);
      grid[i][j + 1] = genConnector(grid, row, col + 1, 'vertical');
      grid[i + 1][j - 1] = genIntersection(grid, row + 1, col - 1, 'bottom-left');
      grid[i + 1][j] = genConnector(grid, row + 1, col, 'horizontal');
      grid[i + 1][j + 1] = genIntersection(grid, row + 1, col + 1, 'bottom-right');
    }
  }

  // Post-processing and other patch work.
  const patchGenerators = [];
  const riverCount = Math.max(0, Math.round(2 * Math.log10(size)) - 1);
  for (let i = 0; i < riverCount; i++) {
    patchGenerators.push(genRiverPatch);
  }
  patchGenerators.push(genConnectorPatch);
  patchGenerators.push(Briges.genPatch);

  // Apply patches in order.
  return patchGenerators.reduce((g, gen) => patch(rand, g, gen), grid);
};

const patch = (rand, grid, generator) => {
  const patch = generator(rand, grid);
  patch.forEach(next => {
    const { row, col } = next;
    const gridRow = zeroIndexed(grid.length, row);
    const gridCol = zeroIndexed(grid[0].length, col);
    if (gridRow >= 0 && gridRow < grid.length && gridCol >= 0 && gridCol < grid[0].length) {
      grid[gridRow][gridCol] = next;
    }
  });
  return grid;
};

const genRiverPatch = (rand, grid) => {
  const range = Math.floor(grid[0].length / 2);
  const len = Math.floor(grid.length / 2);

  const start = Math.round(rand.gaussian() / 6 * range);
  const river = [[start, start + 1]];
  for (let i = 1; i < len ; i++) {
    const threshold = rand.uniform();
    const dir = threshold < 0.3 ? -1 : (threshold < 0.7 ? 0 : 1);
    const prev = river[i - 1][0];
    const next = prev + dir;
    river.push([next, next + 1]);
  }

  const patch = [];
  for (let i = 0; i < river.length; i++) {
    for (let j = 0; j < river[i].length; j++) {
      const row = 2*i - len + 1;
      const col = 2*river[i][j] + ((range + 1) % 2);
      patch.push(genWater(rand, grid, row, col));
    }
  }
  return patch;
};

const genConnectorPatch = (rand, grid) => {
  const nodes = grid.flat();
  const patch = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.type === 'Connector') {
      const neighbors = blocksAdjacent(grid, node);
      const neighborComponents = neighbors.map(_ => _ ? _.component : 'None');
      const connector = Interaction.selectConnector2(neighborComponents);
      patch.push({ ...node, ...connector });
    }
  }
  return patch;
};

const genBlock = (rand, grid, row, col) => {
  let threshold = rand.uniform();
  for (let i = 0; i < BlockWeightsNormalized.length; i++) {
    const [probability, component] = BlockWeightsNormalized[i];
    const defaultProps = { 'type': 'Block', component, grid, row, col };
    if (threshold < probability) {
      if (component === 'Building') {
        const floors = Math.ceil(Math.abs(rand.gaussian()) * 1.5);
        const roofingThreshold = rand.uniform();
        let roofing;
        if (roofingThreshold < 0.6) roofing = 'none';
        else if (roofingThreshold < 0.8 && floors < 3) roofing = 'dome';
        else if (roofingThreshold < 1.0 && floors < 3) roofing = 'crest';
        else if (roofingThreshold < 0.8) roofing = 'spire';
        // else if (roofingThreshold < 0.8) roofing = 'crest';
        else roofing = 'crest';
        return { ...defaultProps, floors, roofing };
      } else if (component === 'Construction') {
        const progress = 0.4 + rand.uniform();
        return { ...defaultProps, progress};
      } else if (component === 'WoodedArea') {
        const trees = Array(Math.floor(rand.uniform() * 10)).fill(null).map(_ => genTree(rand))
        return { ...defaultProps, trees };
      } else if (component === 'Water') {
        return genWater(rand, grid, row, col);
      } else {
        return defaultProps;
      }
    }
    threshold -= probability;
  }
  return null;
};

const genIntersection = (grid, row, col, offset) => {
  const defaultProps = { grid, row, col, offset };
  return {
    ...defaultProps,
    'type': 'Intersection',
    component: 'Intersection'
  };
};

const genConnector = (grid, row, col, orientation) => {
  const defaultProps = { grid, row, col, orientation };
  return {
    ...defaultProps,
    'type': 'Connector',
    component: 'Basic'
  };
};

const genTree = (rand) => {
  const size = 0.1 + rand.uniform() * 0.3;
  const position = [(rand.uniform() - 0.5)* BlockWidth, (rand.uniform() - 0.5) * BlockWidth];
  return { position, size };
};

const genWater = (rand, grid, row, col) => {
  const hasBuoy = rand.uniform() < 0.05;
  const buoy = hasBuoy ? genBuoy(rand) : null;
  return { type: 'Block', component: 'Water', grid, row, col, buoy };
};

const genBuoy = (rand) => {
  const x = rand.gaussian() / 6 * BlockWidth;
  const z = rand.gaussian() / 6 * BlockWidth;
  const position = [x, z];
  return { position };
};

export const blockPosition = (i) => {
  return i / 2 * (BlockWidth + ConnectorWidth);
};

export const connectorPosition = (i) => {
  return i / 2 * (BlockWidth + ConnectorWidth);
};

// @deprecated Prefer `neighbors` function below.
// This has ~2 usages that can be satisfied using `neighbors` or `neighborsWithNulls` and some filtering.
export const blocksAdjacent = (grid, node) => {
  const { type, row, col } = node;
  const i = zeroIndexed(grid.length, row);
  const j = zeroIndexed(grid[0].length, col);
  if (type === 'Connector') {
    const horizontal = node.orientation === 'horizontal';
    const block1 = horizontal ? (grid[i - 1] || [])[j] : grid[i][j - 1];
    const block2 = horizontal ? (grid[i + 1] || [])[j] : grid[i][j + 1];
    return [block1, block2];
  } else if (type === 'Intersection') {
    return [
      (grid[i - 1] || [])[j - 1],
      (grid[i - 1] || [])[j + 1],
      (grid[i + 1] || [])[j + 1],
      (grid[i + 1] || [])[j - 1]
    ];
  } else {
    return [];
  }
};

const zeroIndexed = (size, i) => {
  return Math.floor(size / 2) + i;
};

export const neighborsWithNulls = (grid, node) => {
  const { type, row, col } = node;
  const i = zeroIndexed(grid.length, row);
  const j = zeroIndexed(grid[0].length, col);
  return NeighborDeltas.map(delta => {
    const [di, dj] = delta;
    const row = grid[i + di];
    return row && row[j + dj] || null;
  });
};

export const neighbors = (grid, node) => {
  neighborsWithNulls(grid, node).filter(Boolean)
};
