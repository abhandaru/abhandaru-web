import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import * as Grid from '~/compute/grid';
import * as Colors from '~/components/lib/colors';
import * as Interaction from '~/compute/interaction';

const colorForAdjecents = (blocks) => {
  const components = blocks.map(_ => _ ? _.component : 'None');
  const rep = components.join('-');
  if (isRotation('Water-Water-WoodedArea-Pavement', rep)) return Colors.WOODED_AREA;
  else if (isRotation('Pavement-WoodedArea-WoodedArea-Park', rep)) return Colors.WOODED_AREA;
  else if (isRotation('Pavement-Water-Park-WoodedArea', rep)) return Colors.PAVEMENT;
  else if (isRotation('Pavement-Water-WoodedArea-Park', rep)) return Colors.PARK;
  else if (isRotation('Water-WoodedArea-WoodedArea-Park', rep)) return Colors.PAVEMENT;
  else if (isRotation('Water-Park-Pavement-Park', rep)) return Colors.PAVEMENT;
  else if (isRotation('Park-Water-WoodedArea-Water', rep)) return Colors.PAVEMENT;
  else if (isRotation('WoodedArea-Water-WoodedArea-Pavement', rep)) return Colors.WOODED_AREA;
  else if (isRotation('WoodedArea-Water-WoodedArea-Park', rep)) return Colors.PAVEMENT;
  else if (isRotation('Park-Park-Pavement-Water', rep)) return Colors.PAVEMENT;
  else {
    const repCanonical = components.sort().join('-');
    switch (repCanonical) {
      case 'Park-Park-Park-Park': return Colors.PARK;
      case 'Park-Park-Park-Pavement': return Colors.PARK;
      case 'Park-Park-Park-Water': return Colors.PAVEMENT;
      case 'Park-Park-Park-WoodedArea': return Colors.PARK;
      case 'Park-Park-Pavement-WoodedArea': return Colors.PARK;
      case 'Park-Park-Water-Water': return Colors.PAVEMENT;
      case 'Park-Park-Water-WoodedArea': return Colors.PAVEMENT;
      case 'Park-Park-WoodedArea-WoodedArea': return Colors.PARK;
      case 'Park-Pavement-Pavement-Water': return Colors.PAVEMENT;
      case 'Park-Water-Water-Water': return Colors.PAVEMENT;
      case 'Park-Water-Water-WoodedArea': return Colors.PAVEMENT;
      case 'Park-WoodedArea-WoodedArea-WoodedArea': return Colors.PARK;
      case 'Pavement-Pavement-Water-Water': return Colors.PAVEMENT;
      case 'Pavement-Pavement-Water-WoodedArea': return Colors.WOODED_AREA;
      case 'Pavement-Water-Water-Water': return Colors.PAVEMENT;
      case 'Pavement-Water-Water-WoodedArea': return Colors.PAVEMENT;
      case 'Pavement-Water-WoodedArea-WoodedArea': return Colors.WOODED_AREA;
      case 'Pavement-WoodedArea-WoodedArea-WoodedArea': return Colors.WOODED_AREA;
      case 'Water-Water-Water-Water': return Colors.WATER;
      case 'Water-Water-Water-WoodedArea': return Colors.PAVEMENT;
      case 'Water-Water-WoodedArea-WoodedArea': return Colors.PAVEMENT;
      case 'Water-WoodedArea-WoodedArea-WoodedArea': return Colors.PAVEMENT;
      case 'WoodedArea-WoodedArea-WoodedArea-WoodedArea': return Colors.WOODED_AREA;
      default:
        if (components.includes('Building')) return Colors.ROAD;
        if (components.includes('Construction')) return Colors.ROAD;
        if (components.includes('None')) {
          const remaining = components.filter(_ => _ != 'None');
          switch (remaining.sort().join('-')) {
            case 'Water': return Colors.WATER;
            case 'Park': return Colors.PARK;
            case 'Pavement': return Colors.PAVEMENT;
            case 'WoodedArea': return Colors.WOODED_AREA;
            default:
              const connector = Interaction.selectConnector2(remaining);
              switch (connector.component) {
                case 'Road': return Colors.ROAD;
                case 'WaterWay': return Colors.WATER;
                case 'Basic': return connector.color;
                default: return Colors.DEBUG;
              }
          }
        }
        else return 'yellow';
    }
  }
};

const isRotation = (test, rep) => {
  if (test.length < rep.length) return false;
  if (`${test}-${test}`.includes(rep)) return true;
  // Chirality should not affect result.
  const rev = test.split('-').reverse().join('-');
  return `${rev}-${rev}`.includes(rep);
};


const Intersection = (props) => {
  const { grid, row, col, position } = props;
  const x = Grid.blockPosition(row);
  const y = 0.5;
  const z = Grid.blockPosition(col);

  const neighbors = Grid.blocksAdjacent(grid, props);
  const color = colorForAdjecents(neighbors);

  return (
    <>
      <mesh
        receiveShadow
        position={[x, y, z]}>
        <boxBufferGeometry attach='geometry' args={[Grid.ConnectorWidth, 1, Grid.ConnectorWidth]} />
        <meshToonMaterial attach='material' color={color} />
      </mesh>
    </>
  );
};

export default Intersection;
