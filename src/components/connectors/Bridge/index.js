import * as Colors from '~/components/lib/colors';
import * as Grid from '~/compute/grid';
import Basic from '~/components/connectors/Basic';
import { ThreeBSP } from 'three-js-csg-es6'
import { BoxBufferGeometry, CylinderGeometry, Mesh, Euler } from 'three';
import React from 'react';

const BridgeHeight = 0.75;
const BridgeRadius = BridgeHeight;
const BridgeRadiusNeg = 0.9 * BridgeRadius;
const BridgeWidth = Grid.ConnectorWidth;
const BridgeLength = Grid.BlockWidth * 1.05;
const BridgeOffset = Grid.BlockWidth/2 - Math.sqrt(BridgeHeight * BridgeHeight - 0.25 * BridgeLength * BridgeLength);

const Bridge = (props) => {
  const { row, col, orientation } = props;
  const upperArch = new Mesh(new CylinderGeometry(BridgeRadius, BridgeRadius, BridgeWidth, 48, 1));
  const negArch = new Mesh(new CylinderGeometry(BridgeRadiusNeg, BridgeRadiusNeg, BridgeWidth, 48, 1));
  // const leftArch = negArch.clone().translateX(-0.5 * BridgeRadius);
  // const rightArch = negArch.clone().translateX(0.5 * BridgeRadius);
  const rotation = orientation === 'horizontal' ?
    new Euler(0, 0, Math.PI / 2, 'XYZ') :
    new Euler(Math.PI / 2, 0, 0, 'XYZ');

  // const

  const a = new ThreeBSP(upperArch);
  const b = new ThreeBSP(negArch);
  const geo = a.subtract(b).toGeometry();

  return (
    <Basic
      row={row}
      col={col}
      orientation={orientation}
      height={Grid.BlockWidth}
      color={Colors.WATER}>
      <mesh
        receiveShadow
        geometry={geo}
        rotation={rotation}
        position={[0, BridgeOffset, 0]}>
        <meshToonMaterial attach='material' color={Colors.SIGNAL_WARN} />
      </mesh>
    </Basic>
  );
};

export default Bridge;
