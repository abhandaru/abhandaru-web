import * as React from 'react';
import City from '~/components/City';
import Controls from '~/components/Controls';
import { Canvas } from 'react-three-fiber';
import { seedNext } from '~/state/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useTimer } from '~/hooks';

const RefreshPeriod = 30000;

const LandingView = (props) => {
  const dispatch = useDispatch();
  const size = useSelector(_ => _.landing.size);
  const seed = useSelector(_ => _.landing.seed);

  useTimer(RefreshPeriod, () => dispatch(seedNext(Math.random())));

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
