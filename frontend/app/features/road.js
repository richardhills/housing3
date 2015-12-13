import React from 'react';
import ol from 'openlayers';
import Feature from 'ol-react/feature';

export default class Road extends Feature {
}

Feature.propTypes = {
  style: React.PropTypes.object.isRequired,
  children: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(React.PropTypes.number)
  ).isRequired,
}

Feature.contextTypes = {
  source: React.PropTypes.instanceOf(ol.source.Source)
}
