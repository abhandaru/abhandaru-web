import * as Colors from '~/components/lib/colors';
import * as Grid from '~/compute/grid';
import React from 'react';

let cc = 0;

const Basic = (props) => {
  const { row, col, orientation, height, material, color, children } = props;
  const colorOverride = color != null ? color : Colors.DEBUG;
  const heightOverride = height != null ? height : 1;
  const materialOverride = material != null ?
    material : <meshToonMaterial attach='material' color={colorOverride} />;

  const x = Grid.connectorPosition(row);
  const y = heightOverride / 2;
  const z = Grid.connectorPosition(col);

  const horizontal = orientation === 'horizontal';
  const args = horizontal ?
    [Grid.ConnectorWidth, heightOverride, Grid.BlockWidth] :
    [Grid.BlockWidth, heightOverride, Grid.ConnectorWidth];

  return (
    <mesh
      receiveShadow
      position={[x, y, z]}>
      <boxBufferGeometry attach='geometry' args={args} />
      {materialOverride}
      {children}
    </mesh>
  );
};

export default Basic;
