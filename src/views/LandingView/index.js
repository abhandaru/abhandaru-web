import City from '~/components/City';
import Controls from '~/components/Controls';
import React from 'react';
import { Canvas } from 'react-three-fiber';
import { ReactReduxContext, Provider, useDispatch, useSelector } from 'react-redux';

const LandingView = (props) => {
  const size = useSelector(_ => _.landing.size);
  const seed = useSelector(_ => _.landing.seed);
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
      <City size={size} seed={seed} />
    </Canvas>
  );
};

export default LandingView;
