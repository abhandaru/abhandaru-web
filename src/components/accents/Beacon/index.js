import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import * as Colors from '~/components/lib/colors';
import * as Grid from '~/compute/grid';

const Beacon = (props) => {
  const { color, position, height, effectRadius } = props;
  const effectRadiusOverride = effectRadius != null ? effectRadius : 1;
  const heightOverride = height != null ? height : 0;
  const positionOverride = position != null ? position : [0, height, 0];
  const ref = useRef();
  // useFrame(frame => {
  //   const dt = frame.clock.getElapsedTime();
  //   const rot = Math.sin(dt) * 0.3;
  //   ref.current.rotation.x = rot;
  //   ref.current.rotation.y = rot;
  //   ref.current.rotation.z = rot;
  // });
  return (
    <group
      ref={ref}
      position={positionOverride}>
      <pointLight
        args={[color, 1]}
        distance={effectRadiusOverride}
        decay={2}
      />
      <mesh receiveShadow castShadow>
        <sphereBufferGeometry attach='geometry' args={[0.03]} />
        <meshToonMaterial attach='material' color={color} />
      </mesh>
    </group>
  );
};

export default Beacon;
