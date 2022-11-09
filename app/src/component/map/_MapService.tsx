import { LngLatLike, Map } from 'mapbox-gl';
import { createRoot } from 'react-dom/client';
import { SOURCE, SOURCE_LAYER } from './Map';
import { ColorFilter } from './_MapColor';
import { PlacePopup } from './PlacePopup';

export function updateMap(
  map: Map,
  center?: [number, number],
  mapColor?: ColorFilter,
  data?: any,
  field?: string,
  fields?: string[]
) {
  if (center) {
    map.flyTo({
      center,
      zoom: 10,
      speed: 0.8,
      curve: 1,
      easing: t => t
    });
  }

  if (mapColor) {
    map.setPaintProperty('places-shapes-fill', 'fill-color', [
      'case',
      ['boolean', ['feature-state', 'selected'], false],
      ['feature-state', 'quantize_color'],
      mapColor
    ]);
  }

  // if (data) {
  //   map.getSource(SOURCE).setData(data);
  // }

  if (field) {
    map.setFilter('places-shapes-fill', ['==', field, ['get', field]]);
  }

  if (fields) {
    map.setFilter('places-shapes-fill', ['in', field, ...fields]);
  }
}

export function selectMapFeature(map: Map, id: string) {
  map.setFeatureState(
    {
      source: SOURCE,
      sourceLayer: SOURCE_LAYER,
      id
    },
    { selected: true }
  );
}

export function deselectMapFeature(map: Map, id: string) {
  map.setFeatureState(
    {
      source: SOURCE,
      sourceLayer: SOURCE_LAYER,
      id
    },
    { selected: false }
  );
}

export function selectMapFeatures(map: Map, ids: string[]) {
  ids.forEach(id => {
    map.setFeatureState(
      {
        source: SOURCE,
        sourceLayer: SOURCE_LAYER,
        id
      },
      { selected: true }
    );
  });
}

export function deselectMapFeatures(map: Map, ids: string[]) {
  ids.forEach(id => {
    map.setFeatureState(
      {
        source: SOURCE,
        sourceLayer: SOURCE_LAYER,
        id
      },
      { selected: false }
    );
  });
}

export function selectMapFeaturesByField(
  map: Map,
  field: string,
  value: string
) {
  map.setFilter('places-shapes-fill', ['==', field, value]);
}

export function deselectMapFeaturesByField(
  map: Map,
  field: string,
  value: string
) {
  map.setFilter('places-shapes-fill', ['!=', field, value]);
}

export function selectMapFeaturesByFields(
  map: Map,
  field: string,
  values: string[]
) {
  map.setFilter('places-shapes-fill', ['in', field, ...values]);
}

export function deselectMapFeaturesByFields(
  map: Map,
  field: string,
  values: string[]
) {
  map.setFilter('places-shapes-fill', ['!in', field, ...values]);
}

export function selectMapFeaturesByFilter(map: Map, filter: any) {
  map.setFilter('places-shapes-fill', filter);
}

export function deselectMapFeaturesByFilter(map: Map, filter: any) {
  map.setFilter('places-shapes-fill', ['!in', filter]);
}

export function selectMapFeaturesByExpression(map: Map, expression: any) {
  map.setFilter('places-shapes-fill', expression);
}

export function deselectMapFeaturesByExpression(map: Map, expression: any) {
  map.setFilter('places-shapes-fill', ['!in', expression]);
}

export function selectMapFeaturesByQuery(map: Map, query: string) {
  map.setFilter('places-shapes-fill', [
    'match',
    ['get', 'name'],
    query,
    true,
    false
  ]);
}

export function deselectMapFeaturesByQuery(map: Map, query: string) {
  map.setFilter('places-shapes-fill', [
    '!match',
    ['get', 'name'],
    query,
    true,
    false
  ]);
}

export function selectMapFeaturesByQueries(map: Map, queries: string[]) {
  map.setFilter('places-shapes-fill', [
    'match',
    ['get', 'name'],
    queries,
    true,
    false
  ]);
}

export function deselectMapFeaturesByQueries(map: Map, queries: string[]) {
  map.setFilter('places-shapes-fill', [
    '!match',
    ['get', 'name'],
    queries,
    true,
    false
  ]);
}

export function selectMapFeaturesByRegex(map: Map, regex: string) {
  map.setFilter('places-shapes-fill', [
    'match',
    ['get', 'name'],
    regex,
    true,
    false
  ]);
}

export function deselectMapFeaturesByRegex(map: Map, regex: string) {
  map.setFilter('places-shapes-fill', [
    '!match',
    ['get', 'name'],
    regex,
    true,
    false
  ]);
}

export function selectMapFeaturesByRegexes(map: Map, regexes: string[]) {
  map.setFilter('places-shapes-fill', [
    'match',
    ['get', 'name'],
    regexes,
    true,
    false
  ]);
}

export function deselectMapFeaturesByRegexes(map: Map, regexes: string[]) {
  map.setFilter('places-shapes-fill', [
    '!match',
    ['get', 'name'],
    regexes,
    true,
    false
  ]);
}

export function selectMapFeaturesByFunction(map: Map, func: any) {
  map.setFilter('places-shapes-fill', [
    'match',
    ['get', 'name'],
    func,
    true,
    false
  ]);
}

export function deselectMapFeaturesByFunction(map: Map, func: any) {
  map.setFilter('places-shapes-fill', [
    '!match',
    ['get', 'name'],
    func,
    true,
    false
  ]);
}

// if (e.features && e.properties) {

//   const feature = e.features[0];
//   const id = feature?.properties?.id;
//   const selected = feature?.properties?.selected;
//   const features = map.queryRenderedFeatures(e.point, {
//     layers: ['places-shapes-fill']
//   });
//   if (features.length) {
//     map.setFeatureState(
//       { source: 'places', id: features[0].id },
//       { selected: !selected }
//     );
//   }
// }

// import { createRoot } from 'react-dom/client';
// import { ColorFilter } from './_MapColor';
// import { PlacePopup } from './PlacePopup';

// export function initMap(
//   map: any,
//   popup: any,
//   center?: [number, number],
//   mapColor?: ColorFilter,
//   data?: any,
//   field?: string,
//   fields?: string[]
// ) {
//   map.on('load', function () {
//     map.addSource('places', {
//       type: 'geojson',
//       data: data
//     });

//     // Add a layer showing the places.
//     map.addLayer({
//       id: 'places',
//       type: 'circle',
//       source: 'places',
//       paint: {
//         'circle-color': mapColor.color,
//         'circle-radius': 6,
//         'circle-stroke-width': 2,
//         'circle-stroke-color': mapColor.stroke
//       }
//     });

//     // Create a popup, but don't add it to the map yet.
//     const popup = new mapboxgl.Popup({
//       closeButton: false,
//       closeOnClick: false
//     });

//     map.on('mouseenter', 'places', function (e) {
//       // Change the cursor style as a UI indicator.
//       map.getCanvas().style.cursor = 'pointer';

//       const coordinates = e.features[0].geometry.coordinates.slice();
//       const description = e.features[0].properties.description;

//       // Ensure that if the map is zoomed out such that multiple
//       // copies of the feature are visible, the popup appears
//       // over the copy being pointed to.
//       while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//       }

//       // Populate the popup and set its coordinates
//       // based on the feature found.
//       popup.setLngLat(coordinates).setHTML(description).addTo(map);
//     });

//     map.on('mouseleave', 'places', function () {
//       map.getCanvas().style.cursor = '';
//       popup.remove();
//     });
//   });

//   // Move the map to a given center point.
//   moveMap(map, center);
// }
