import * as Colors from '~/components/lib/colors';
import * as Grid from '~/compute/grid';
import * as React from 'react';
import { useFrame } from 'react-three-fiber';

const SpotDistance = 120;
const DaylightPeriod = 30; // Seconds
const AmbientIntensityMax = 0.6;
const AmbientIntensityMin = 0.05;
const SpotIntensityMax = 1;
const SpotIntensityMin = 0.0;

const getIntensity = (min, max, t) => {
  const range = AmbientIntensityMax - AmbientIntensityMin;
  const intensity = AmbientIntensityMin + (range / 2) * (1 + Math.cos(2 * Math.PI * t / DaylightPeriod));
  return intensity;
};

const getArcPosition = (t) => {
  const { sin, cos, PI } = Math;
  const theta = 2 * PI * t / (DaylightPeriod / 2);
  return [sin(theta) * SpotDistance, cos(theta) * SpotDistance];
};

const Sky = (props) => {
  const [ambientIntensity, setAmbientIntensity] = React.useState(AmbientIntensityMax);
  const [spotIntensity, setSpotIntensity] = React.useState(SpotIntensityMax);
  const [[spotY, spotZ], setPosition] = React.useState([0, SpotDistance]);

  useFrame(frame => {
    const t = frame.clock.getElapsedTime();
    const nextAmbient = getIntensity(AmbientIntensityMin, AmbientIntensityMax, t);
    const nextSpot = getIntensity(SpotIntensityMin, SpotIntensityMax, t);
    // const nextPosition = getArcPosition(t);
    setAmbientIntensity(nextAmbient);
    setSpotIntensity(nextAmbient);
    // setPosition(nextPosition);
  });

  return (
    <>
      <ambientLight intensity={ambientIntensity} />
      <spotLight
        intensity={spotIntensity}
        position-x={20}
        position-y={spotY}
        position-z={spotZ}
        angle={2}
        penumbra={1}
        castShadow
      />
    </>
  );
};

export default Sky;
