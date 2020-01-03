import * as Colors from '~/components/lib/colors';
import Basic from '~/components/connectors/Basic';
import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';

const WaterWay = (props) => {
  const { row, col, orientation } = props;
  return (
    <Basic
      row={row}
      col={col}
      orientation={orientation}
      color={Colors.WATER}
    />
  );
};

export default WaterWay;
