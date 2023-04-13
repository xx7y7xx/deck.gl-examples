import React from 'react';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import { DataFilterExtension } from '@deck.gl/extensions';

const INITIAL_VIEW_STATE = {
  longitude: 103.80177,
  latitude: 1.273607,
  zoom: 14,
  pitch: 0,
  bearing: 0,
};

const createLayer = (id, { fp64 }) => {
  const layer = new ScatterplotLayer({
    id,
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
    getFillColor: (d) => (d[2] === 1000000.15 ? [255, 0, 0] : [0, 255, 0]),
    getLineColor: (d) => [0, 0, 0],
    // Define extensions
    // extensions: [new DataFilterExtension({ filterSize: 4 })],
    extensions: [new DataFilterExtension({ filterSize: 4, fp64 })],
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
  return layer;
};

export default function App() {
  return (
    <div>
      <b>When to use fp64 in deck.gl</b>
      <br />
      Due to error in conversion from decimal to binary, we may use enable fp64 in deck.gl to resolve the issue.
      <br />
      <br />
      Red point value is <code>1000000.15</code>
      <br />
      The filterRange is <code>[1000000.1, 1000000.14]</code>
      <br />
      When <code>fp64</code> is disabled, this value actually stored in float is <code>1000000.125</code>, so it drops in the
      filterRange.
      <br />
      <div style={{ height: 350 }}>
        <div style={{ position: 'absolute', top: 130, left: 0 }}>fp64: disabled</div>
        <DeckGL
          id='foo'
          width={200}
          height={300}
          style={{ border: '#ccc solid 1px', top: 130 }}
          initialViewState={INITIAL_VIEW_STATE}
          layers={[createLayer('layer-1', { fp64: false })]}
          getTooltip={({ object }) => object && `${object[2]}`}
        />
      </div>
      <div>
        <div style={{ position: 'absolute', top: 130, left: 300 }}>fp64: enabled</div>
        <DeckGL
          id='bar'
          width={200}
          height={300}
          style={{ left: 300, border: '#ccc solid 1px', top: 130 }}
          initialViewState={INITIAL_VIEW_STATE}
          layers={[createLayer('layer-2', { fp64: true })]}
          getTooltip={({ object }) => object && `${object[2]}`}
        />
      </div>
      <li>
        IEEE-754 Floating Point Converter:{' '}
        <a href='https://www.h-schmidt.net/FloatConverter/IEEE754.html'>https://www.h-schmidt.net/FloatConverter/IEEE754.html</a>
      </li>
    </div>
  );
}
