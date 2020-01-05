import * as Colors from '~/components/lib/colors';
import * as Grid from '~/compute/grid';
import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';

const Construction = (props) => {
  const { grid, row, col, progress } = props;
  const height = Grid.BlockWidth + progress;
  const x = Grid.blockPosition(row);
  const y = height / 2;
  const z = Grid.blockPosition(col);
  return (
    <mesh
      receiveShadow
      position={[x, y, z]}>
      <boxBufferGeometry attach='geometry' args={[Grid.BlockWidth, height, Grid.BlockWidth]} />
      <meshToonMaterial attach='material' color={Colors.PAVEMENT} />
    </mesh>
  );
};

export default Construction;
