import * as Colors from '~/components/lib/colors';
import * as Grid from '~/compute/grid';
import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';

const Park = (props) => {
  const { grid, row, col, } = props;
  const x = Grid.blockPosition(row);
  const y = 0.5;
  const z = Grid.blockPosition(col);
  return (
    <mesh
      receiveShadow
      position={[x, y, z]}>
      <boxBufferGeometry attach='geometry' args={[Grid.BlockWidth, 1, Grid.BlockWidth]} />
      <meshToonMaterial attach='material' color={Colors.PARK} />
    </mesh>
  );
};

export default Park;
