import React from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import buffer from '@turf/buffer';

import data1 from './data.json';
import data2 from './data2.json';

// 创建缓冲区并向内缩进10像素
const bufferedData1 = buffer(data1, -10, { units: 'kilometers' });
const bufferedData2 = buffer(data2, -10, { units: 'kilometers' });

const INITIAL_VIEW_STATE = { longitude: 103.91839, latitude: 1.316713, zoom: 6 };
export default function App() {
  return (
    <div>
      <DeckGL
        id='foo-1'
        width={400}
        height={400}
        style={{ border: '#ccc solid 1px' }}
        initialViewState={INITIAL_VIEW_STATE}
        controller
        layers={[
          new GeoJsonLayer({
            id: 'geojson-layer-1',
            data: data1,
            // fill
            filled: true,
            getFillColor: [255, 0, 0],
          }),
          new GeoJsonLayer({
            id: 'geojson-layer-2',
            data: data2,
            // fill
            filled: true,
            getFillColor: [0, 255, 0],
          }),
        ]}
      />
      <DeckGL
        id='foo-2'
        width={400}
        height={400}
        style={{ left: '400px', border: '#ccc solid 1px' }}
        initialViewState={INITIAL_VIEW_STATE}
        controller
        layers={[
          new GeoJsonLayer({
            id: 'geojson-layer-1',
            data: data1,
            // fill
            filled: true,
            getFillColor: [255, 0, 0],
            // border line
            stroked: true,
            getLineColor: [0, 0, 255, 150],
            getLineWidth: 20,
            lineWidthUnits: 'pixels',
          }),
          new GeoJsonLayer({
            id: 'geojson-layer-2',
            data: data2,
            // fill
            filled: true,
            getFillColor: [0, 255, 0],
            // border line
            stroked: true,
            getLineColor: [0, 255, 255, 150],
            getLineWidth: 20,
            lineWidthUnits: 'pixels',
          }),
        ]}
      />
      <DeckGL
        id='foo-3'
        width={400}
        height={400}
        style={{ left: '800px', border: '#ccc solid 1px' }}
        initialViewState={INITIAL_VIEW_STATE}
        controller
        layers={[
          new GeoJsonLayer({
            id: 'geojson-layer-1',
            data: bufferedData1,
            // fill
            filled: true,
            getFillColor: [255, 0, 0],
            // border line
            stroked: true,
            getLineColor: [0, 255, 0, 150],
            getLineWidth: 20000,
            lineWidthUnits: 'meters', //'pixels',
          }),
          new GeoJsonLayer({
            id: 'geojson-layer-2',
            data: bufferedData2,
            // fill
            filled: true,
            getFillColor: [0, 255, 0],
            // border line
            stroked: true,
            getLineColor: [0, 255, 255, 150],
            getLineWidth: 20000,
            lineWidthUnits: 'meters', //'pixels',
          }),
        ]}
      />
    </div>
  );
}
