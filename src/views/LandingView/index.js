import * as Colors from '~/components/lib/colors';
import * as Grid from '~/compute/grid';
import Basic from '~/components/connectors/Basic';
import Building from '~/components/Building';
import Connector from '~/components/Connector';
import Controls from '~/components/Controls';
import Intersection from '~/components/Intersection';
import Park from '~/components/Park';
import Pavement from '~/components/Pavement';
import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import Road from '~/components/connectors/Road';
import Water from '~/components/Water';
import WaterWay from '~/components/connectors/WaterWay';
import WoodedArea from '~/components/WoodedArea';
import { Canvas } from 'react-three-fiber'
import { useDispatch, useSelector } from 'react-redux'

const GridSize = 20;

const Renderers = {
  Block: {
    Building,
    Intersection,
    Water,
    Park,
    Pavement,
    WoodedArea,
  },
  Connector: {
    Basic,
    Road,
    WaterWay,
  },
  Intersection: {
    Intersection
  }
};

const Land = (props) => (
  <mesh
    receiveShadow
    position={[0, 0.995, 0]}
    rotation-x={-Math.PI / 2}>
    <circleBufferGeometry attach='geometry' args={[500, 32]} />
    <meshToonMaterial attach='material' color={Colors.PARK} />
  </mesh>
);

const City = (props) => {
  const grid = Grid.generate(GridSize);
  const nodes = grid.reduce((z, r) => z.concat(r), []);
  return (
    <group position-y={-1}>
      <Land />
      {nodes.map((node, i) => {
        const Component = Renderers[node.type][node.component];
        return <Component key={i} {...node} />
      })}
    </group>
  );
};

const LandingView = (props) => {
  return (
    <Canvas
      shadowMap
      camera={{ position: [8, 12, 18] }}
      style={{width: '100vw', height: '100vh'}}>
      <ambientLight intensity={0.6} />
      <spotLight
        intensity={0.6}
        position={[20, 50, 100]}
        angle={2}
        penumbra={1}
        castShadow
      />
      <Controls />
      <City />
    </Canvas>
  );
};

export default LandingView;
