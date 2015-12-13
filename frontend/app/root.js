import React from 'react';

import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import {Map, List} from 'immutable';

import Layout from './layout';
import navigationReducer from './reducers/navigation';
import featuresReducer from './reducers/features';

const reducer = combineReducers({
  view: navigationReducer,
  features: featuresReducer
});

const initialState = {
  view: Map({
    center: List([-1.2578, 51.7519]),
    resolution: 10000
  }),
  features: List([
    Map({
      type: "road",
      path: List([[0, 0], [100000, 0], [200000, 100000]])
    }),
    Map({
      type: "field",
      path: List([[0, 0], [-10000, 0], [-20000, -10000], [-20000, -20000]])
    })
  ]),
};

let middleware = [thunkMiddleware];

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
const store = createStoreWithMiddleware(reducer, initialState);

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Layout />
        </Provider>
      </div>
    );
  }
};

