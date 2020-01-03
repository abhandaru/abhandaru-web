import * as Colors from '~/components/lib/colors';
import * as Grid from '~/compute/grid';
import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import Tree from '~/components/accents/Tree';

const Height = 1;

const WoodedArea = (props) => {
  const { grid, row, col, trees } = props;
  const x = Grid.blockPosition(row);
  const y = Height / 2;
  const z = Grid.blockPosition(col);
  const treeMeshes = trees.map((tree, i) => <Tree key={i} {...tree} />);
  return (
    <mesh
      receiveShadow
      position={[x, y, z]}>
      <boxBufferGeometry attach='geometry' args={[Grid.BlockWidth, Height, Grid.BlockWidth]} />
      <meshToonMaterial attach='material' color={Colors.WOODED_AREA} />
      {treeMeshes}
    </mesh>
  );
};

export default WoodedArea;
