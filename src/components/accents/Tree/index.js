import * as Colors from '~/components/lib/colors';
import * as Grid from '~/compute/grid';
import React from 'react';

const Height = 1;

const Tree = (props) => {
  const { size, position } = props;
  const [x, z] = position;
  const y = Height / 2 + size;
  return (
    <mesh
      castShadow
      receiveShadow
      position={[x, y, z]}>
      <sphereBufferGeometry attach='geometry' args={[size, 20, 20]} />
      <meshToonMaterial attach='material' color={Colors.PINE_TREE} />
    </mesh>
  );
};

export default Tree;
