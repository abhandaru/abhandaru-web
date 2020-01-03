import * as Colors from '~/components/lib/colors';
import * as Grid from '~/compute/grid';
import Buoy from '~/components/accents/Buoy';
import React from 'react';

const Water = (props) => {
  const { grid, row, col, buoy } = props;
  const x = Grid.blockPosition(row);
  const y = 0.5;
  const z = Grid.blockPosition(col);
  return (
    <mesh
      receiveShadow
      position={[x, y, z]}>
      <boxBufferGeometry attach='geometry' args={[Grid.BlockWidth, 1, Grid.BlockWidth]} />
      <meshToonMaterial attach='material' color={Colors.WATER} />
      {buoy ? <Buoy {...buoy} /> : null}
    </mesh>
  );
};

export default Water;
