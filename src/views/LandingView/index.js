import * as React from 'react';
import classnames from 'classnames';
import City from '~/components/City';
import Controls from '~/components/Controls';
import styles from './styles.css';
import { Canvas } from 'react-three-fiber';
import { seedNext } from '~/state/actions';
import { useDelay, useTimer } from '~/hooks';
import { useDispatch, useSelector } from 'react-redux';

const RefreshPeriod = 30000;
const FadeInDelay = 2500;

const LandingView = (props) => {
  const dispatch = useDispatch();
  const size = useSelector(_ => _.landing.size);
  const seed = useSelector(_ => _.landing.seed);
  const [opaque, setOpaque] = React.useState(false);

  useTimer(RefreshPeriod, () => dispatch(seedNext(Math.random())));
  useDelay(FadeInDelay, () => setOpaque(true));

  const className = classnames(styles.root, opaque && styles.opaque);

  return (
    <div className={className}>
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
    </div>
  );
};

export default LandingView;
