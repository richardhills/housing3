import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Map, View, Feature, source, layer, geom} from 'ol-react';

import onNavigation from './actions/navigation';
import * as manipulation from './actions/manipulation';

export default class Layout extends React.Component {
  roadFeatures() {
    return this.props.features.filter((feature) => {
      return feature.get('type') == "road";
    });
  }

  render() {
    console.log(this.roadFeatures().toJS());
    return (
      <div>
        <Map 
        	view=<View
        	  resolution={this.props.view.get('resolution')}
            center={this.props.view.get('center').toJS()}
          />
          actions={this.props.actions}
        >
          <layer.Tile>
            <source.MapQuest layer="osm">
            </source.MapQuest>
          </layer.Tile>
          <layer.Vector>
            <source.Vector
              actions={this.props.actions}
            >
              { this.roadFeatures().map( (road, index) => {
                return (
                  <Feature style={{stroke: {color: [0, 0, 0, 1]}}} key={index} id={index}>
                    <geom.LineString>
                      {road.get('path').toJS()}
                    </geom.LineString>
                  </Feature>
                );
              })}
            </source.Vector>
          </layer.Vector>
        </Map>
      </div>
    );
  }
}

/* <Feature style={{fill: {color: [0, 255, 255, 1]}}}>
                <geom.Polygon>
                  {[[0, 0], [0, 2000000], [2000000, 2000000], [2000000, 0]]}
                </geom.Polygon>
              </Feature> */

function onModify(modifyEvent) {
  return modifyEvent.features.getArray().map( (feature) => {
    return manipulation.modifyRoad(
      feature.getId(),
      feature.getGeometry().getCoordinates()
    );
  });
}

export default connect((state) => {
  return {
    view: state.view,
    features: state.features
  };
}, (dispatch) => {
  return {
    actions: {
      onNavigation: bindActionCreators(onNavigation, dispatch),
      onNewFeature: (newFeature) => {
        dispatch(manipulation.addNewRoad(
          newFeature.getGeometry().getCoordinates()
        ));
      },
      onModifyEnd: (modifyEvent) => {
        onModify(modifyEvent).forEach( (result) => {
          dispatch(result);
        });
      }
    }
  }
})(Layout);
