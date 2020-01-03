import * as Colors from '~/components/lib/colors';
import * as Grid from '~/compute/grid';
import Basic from '~/components/connectors/Basic';
import Building from '~/components/blocks/Building';
import Intersection from '~/components/Intersection';
import Park from '~/components/blocks/Park';
import Pavement from '~/components/blocks/Pavement';
import React from 'react'
import Road from '~/components/connectors/Road';
import Water from '~/components/blocks/Water';
import WaterWay from '~/components/connectors/WaterWay';
import WoodedArea from '~/components/blocks/WoodedArea';

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
  const { seed, size } = props;
  const grid = Grid.generate(seed, size);
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

export default City;
