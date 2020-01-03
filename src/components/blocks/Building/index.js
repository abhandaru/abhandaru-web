import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import * as Grid from '~/compute/grid';
import * as Colors from '~/components/lib/colors';

const FloorHeight = 1;

const Crest = (props) => {
  const { height } = props;
  const size = Grid.BlockWidth * 0.9;
  return (
    <group position-y={height / 2}>
      <mesh
        position-y={0.15}
        castShadow
        receiveShadow>
        <boxBufferGeometry attach='geometry' args={[Grid.BlockWidth, 0.1, Grid.BlockWidth]} />
        <meshToonMaterial attach='material' color={Colors.BUILDING} />
      </mesh>
      <mesh
        castShadow
        receiveShadow>
        <boxBufferGeometry attach='geometry' args={[size, 0.3, size]} />
        <meshToonMaterial attach='material' color={Colors.BUILDING} />
      </mesh>
    </group>
  );
};

const Spire = (props) => {
  const { height } = props;
  const lenSpire = Grid.BlockWidth * 0.75;
  const sizeBase = Grid.BlockWidth * 0.15;
  const offsetY = height / 2;
  return (
    <group position-y={offsetY}>
      <mesh
        position-y={lenSpire / 2}
        castShadow
        receiveShadow>
        <cylinderBufferGeometry attach='geometry' args={[0.05, 0.05, lenSpire]} />
        <meshToonMaterial attach='material' color={Colors.BUILDING} />
      </mesh>
      <mesh
        position-y={0.05}
        castShadow
        receiveShadow>
        <cylinderBufferGeometry attach='geometry' args={[sizeBase, sizeBase, 0.1, 16]} />
        <meshToonMaterial attach='material' color={Colors.BUILDING} />
      </mesh>
    </group>
  );
};

const Dome = (props) => {
  const { height } = props;
  const baseRadius = (Grid.BlockWidth * 0.9) / 2;
  const domeRadius = (Grid.BlockWidth * 0.8) / 2;
  return (
    <group position-y={height / 2}>
      <mesh
        position-y={-0.1}
        castShadow
        receiveShadow>
        <sphereBufferGeometry attach='geometry' args={[domeRadius, 16, 12]} />
        <meshToonMaterial attach='material' color={Colors.BUILDING} />
      </mesh>
      <mesh
        position-y={0.05}
        castShadow
        receiveShadow>
        <cylinderBufferGeometry attach='geometry' args={[baseRadius, baseRadius, 0.1, 16]} />
        <meshToonMaterial attach='material' color={Colors.BUILDING} />
      </mesh>
    </group>
  );
};

const Building = (props) => {
  // const ref = useRef()
  const { grid, floors, row, col, roofing } = props;
  const height = 1 + floors * FloorHeight;
  const x = Grid.blockPosition(row);
  const y = height / 2;
  const z = Grid.blockPosition(col);

  const crest = roofing === 'crest' ? <Crest height={height} /> : null;
  const dome = roofing === 'dome' ? <Dome height={height} /> : null;
  const spire = roofing === 'spire' ? <Spire height={height} /> : null;

  return (
    <mesh
      castShadow
      receiveShadow
      position={[x, y, z]}>
      <boxBufferGeometry attach='geometry' args={[Grid.BlockWidth, height, Grid.BlockWidth]} />
      <meshToonMaterial attach='material' color={Colors.BUILDING} />
      {crest}
      {dome}
      {spire}
    </mesh>
  )
};

export default Building;
