import * as Colors from '~/components/lib/colors';
import * as Grid from '~/compute/grid';
import * as React from 'react';
import Beacon from '~/components/accents/Beacon';
import { useFrame } from 'react-three-fiber';

const Buoy = (props) => {
  const radius = Grid.BlockWidth * 0.15;
  const radiusTop = radius * 0.8;
  const signalHeight = 2 * radius - 0.025;
  const [x0, z0] = props.position;
  const ref = React.useRef();
  useFrame(frame => {
    const dt = frame.clock.getElapsedTime();
    const rot = Math.sin(dt) * 0.3;
    ref.current.rotation.x = rot;
    ref.current.rotation.y = rot;
    ref.current.rotation.z = rot;
  });
  return (
    <group
      ref={ref}
      position={[x0, 0.5, z0]}>
      <mesh
        castShadow
        receiveShadow>
        <sphereBufferGeometry attach='geometry' args={[radius, 16, 12]} />
        <meshToonMaterial attach='material' color={Colors.SIGNAL_ERR} />
      </mesh>
      <mesh
        position-y={radius}
        castShadow
        receiveShadow>
        <sphereBufferGeometry attach='geometry' args={[radius * 0.8, 16, 12]} />
        <meshToonMaterial attach='material' color={Colors.SIGNAL_WARN} />
      </mesh>
      <Beacon height={signalHeight} color={Colors.SIGNAL_ERR} />
    </group>
  );
};

export default Buoy;
