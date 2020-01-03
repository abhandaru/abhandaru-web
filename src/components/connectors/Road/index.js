import * as Colors from '~/components/lib/colors';
import * as Grid from '~/compute/grid';
import Basic from '~/components/connectors/Basic';
import React from 'react';

let cc = 0;

const Road = (props) => {
  const { row, col, orientation } = props;
  return (
    <Basic
      row={row}
      col={col}
      orientation={orientation}
      color={Colors.ROAD}
    />
  );
};

export default Road;
