import * as Colors from '~/components/lib/colors';
import * as Grid from '~/compute/grid';
import Basic from '~/components/connectors/Basic';
import React from 'react';

const LightHeight = 0.2;
const LightCount = 1;
const LightSpacing = Grid.BlockWidth / LightCount;

const Road = (props) => {
  const { row, col, orientation } = props;

  // const lights = Array(LightCount).fill(null).map((_, i) => {
  //   const offset = LightSpacing / 2 + i * LightSpacing;
  //   const [x, z] = orientation === 'horizontal' ? [offset, 0] : [0, offset];
  //   return Math.random() < 0.5 ? (
  //     // null
  //     <pointLight
  //       key={i}
  //       position={[x, LightHeight, z]}
  //       args={[Colors.SIGNAL_WARN, 1]}
  //       distance={2 * LightHeight}
  //       decay={2}
  //     />
  //   ) : null;
  // });

  return (
    <Basic
      row={row}
      col={col}
      orientation={orientation}
      color={Colors.ROAD}>
      {/* {lights} */}
    </Basic>
  );
};

export default Road;
