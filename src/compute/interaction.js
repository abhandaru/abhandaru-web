import * as Colors from '~/components/lib/colors';

// Useful shortcuts
const Connector = (component, extraProps = {}) => {
  return {
    'type': 'Connector',
    component,
    ...extraProps
  };
};

const BasicConnector = (color) => Connector('Basic', { color });

// Determine interaction for any 2 blocks (component labels).
export const selectConnector2 = (components) => {
  const rep = components.sort().join('-');
  switch (rep) {
    case 'Building-Building': return Connector('Road');
    case 'Building-None': return Connector('Road');
    case 'Building-Park': return Connector('Road');
    case 'Building-Pavement': return Connector('Road');
    case 'Building-Water': return Connector('Road');
    case 'Building-WoodedArea': return Connector('Road');
    case 'None-None': return BasicConnector('yellow');
    case 'None-Park': return BasicConnector(Colors.PARK);
    case 'None-Pavement': return BasicConnector(Colors.ROAD);
    case 'None-Water': return Connector('WaterWay');
    case 'None-WoodedArea': return BasicConnector(Colors.WOODED_AREA);
    case 'Park-Park': return BasicConnector(Colors.PARK);
    case 'Park-Pavement': return BasicConnector(Colors.PARK);
    case 'Park-Water': return BasicConnector(Colors.PAVEMENT);
    case 'Park-WoodedArea': return BasicConnector(Colors.PARK);
    case 'Pavement-Pavement': return BasicConnector(Colors.ROAD);
    case 'Pavement-Water': return BasicConnector(Colors.PAVEMENT);
    case 'Pavement-WoodedArea': return BasicConnector(Colors.WOODED_AREA);
    case 'Water-Water': return Connector('WaterWay');
    case 'Water-WoodedArea': return BasicConnector(Colors.PAVEMENT);
    case 'WoodedArea-WoodedArea': return BasicConnector(Colors.WOODED_AREA);
    default: return BasicConnector('yellow');
  }
};

export const isRotation = (test, rep) => {
  if (test.length < rep.length) return false;
  if (`${test}-${test}`.includes(rep)) return true;
  // Chirality should not affect result.
  const rev = test.split('-').reverse().join('-');
  return `${rev}-${rev}`.includes(rep);
};
