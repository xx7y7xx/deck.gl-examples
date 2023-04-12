import React from 'react';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import { DataFilterExtension } from '@deck.gl/extensions';

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: 103.80177,
  latitude: 1.273607,
  zoom: 14,
  pitch: 0,
  bearing: 0,
};

// DeckGL react component
export default function App() {
  const layer = new ScatterplotLayer({
    id: 'scatterplot-layer',
    data: [
      [103.80177, 1.273607, 1000000.12],
      [103.80177, 1.270617, 1000000.13],
      [103.80177, 1.272507, 1000000.15],
      [103.80277, 1.271507, 1000000.16],
      [103.82299, 1.275041, 0],
    ],
    pickable: true,
    opacity: 0.8,
    stroked: true,
    filled: true,
    radiusScale: 6,
    radiusMinPixels: 1,
    radiusMaxPixels: 100,
    lineWidthMinPixels: 1,
    getPosition: (d) => [d[0], d[1]],
    getRadius: (d) => (d[2] / 1000000) * 10,
    getFillColor: (d) => [255, 0, 0],
    getLineColor: (d) => [0, 0, 0],
    // Define extensions
    // extensions: [new DataFilterExtension({ filterSize: 4 })],
    extensions: [new DataFilterExtension({ filterSize: 4, fp64: true })],
    filterRange: [
      [1000000.1, 1000000.14],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    getFilterValue: (d) => {
      console.log('getFilterValue', d[2]);
      return [d[2]];
    },
  });

  const layers = [layer];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      getTooltip={({ object }) => object && `${object[2]}`}
    />
  );
}
