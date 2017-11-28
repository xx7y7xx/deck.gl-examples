import React, { Component } from "react";

import MapGL from "react-map-gl";
import DeckGL, { HexagonLayer } from "deck.gl";

import { MAPBOX_TOKEN } from "./token";
import { getFakeData } from "./fakeData";

const log = (...arg) => console.log("xx", ...arg);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.68491493626794,
        longitude: -122.48385202696696,
        zoom: 10.82315351790499,
        bearing: 0,
        pitch: 30,
        width: 1000,
        height: 1000
      }
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this._resize.bind(this));
    this._resize();
  }

  _resize() {
    this._onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  _onViewportChange(viewport) {
    this.setState({ viewport: { ...this.state.viewport, ...viewport } });
  }

  render() {
    const { viewport } = this.state;
    log("fake data", getFakeData());
    const layer = new HexagonLayer({
      id: "hexagon-layer",
      data: getFakeData(),
      getPosition: d => d.COORDINATES,
      pickable: true,
      extruded: true,
      radius: 100,
      elevationScale: 9
    });

    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._onViewportChange.bind(this)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <DeckGL {...viewport} layers={[layer]} />
      </MapGL>
    );
  }
}

export default App;
