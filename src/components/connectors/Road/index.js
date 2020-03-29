import * as Colors from '~/components/lib/colors';
import * as Grid from '~/compute/grid';
import Basic from '~/components/connectors/Basic';
import React from 'react';

const LightHeight = 0.2;
const LightCount = 6;
const LightSpacing = Grid.BlockWidth / LightCount;

const Road = (props) => {
  const { row, col, orientation } = props;

  // const lights = Array(LightCount).fill(null).map((_, i) => {
  //   const offset = (LightSpacing / 2 + i * LightSpacing) - Grid.BlockWidth / 2;
  //   const [x, z] = orientation === 'horizontal' ? [0, offset] : [offset, 0];
  //   return (
  //     <mesh
  //       key={i}
  //       position={[x, LightHeight + 0.5, z]}>
  //       <sphereBufferGeometry attach='geometry' args={[0.03]} />
  //       <meshBasicMaterial attach='material' color='white' />
  //     </mesh>
  //   );
  // });

  return (
    <Basic
      row={row}
      col={col}
      orientation={orientation}
      color={Colors.ROAD}>
    </Basic>
  );
};

export default Road;
