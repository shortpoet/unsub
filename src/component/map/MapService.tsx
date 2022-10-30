import { LngLatLike, Map } from 'mapbox-gl';
import { createRoot } from 'react-dom/client';
import { SOURCE, SOURCE_LAYER } from './Map';
import { ColorFilter } from './_MapColor';
import { PlacePopup } from './PlacePopup';

export function initMap(
  map: Map,
  popup: any,
  center?: [number, number],
  mapColor?: ColorFilter,
  data?: any,
  field?: string,
  fields?: string[]
) {
  map.addLayer(
    {
      id: 'places-shapes-fill',
      type: 'fill',
      source: 'places',
      layout: {
        visibility: 'visible'
      },
      paint: {
        'fill-color': [
          'case',
          ['boolean', ['feature-state', 'selected'], false],
          ['feature-state', 'quantize_color'],
          'rgba(49,13,255,.0)'
        ],
        'fill-color-transition': {
          duration: 300,
          delay: 0
        },
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'selected'], false],
          0.8,
          0.1
        ],
        'fill-opacity-transition': {
          duration: 300,
          delay: 0
        }
      }
    },
    'some-label'
  );
  map.addLayer(
    {
      id: 'places-hover',
      type: 'fill',
      source: 'places',
      layout: {
        visibility: 'visible'
      },
      paint: {
        'fill-color': '#CCCCCC',
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          0.8,
          0.1
        ]
      }
    },
    'some-label'
  );

  map.addLayer({
    id: 'sky',
    type: 'sky',
    paint: {
      'sky-type': 'atmosphere',
      'sky-atmosphere-sun': [0.0, 90.0],
      'sky-atmosphere-sun-intensity': 85
    }
  });

  map.on('click', 'places-shapes-fill', e => {
    if (e.features && e.properties) {
      if (!e.features.length) {
        popup.remove();
        return;
      }

      const feature = map.getFeatureState({
        source: SOURCE,
        sourceLayer: SOURCE_LAYER,
        id: e.features[0].id
      });

      const popupNode = document.createElement('div');
      createRoot(popupNode).render(<PlacePopup feature={feature} />);
      // createRoot(popupNode).render(<PlacePopup {...feature} />);
      popup.setLngLat(e.lngLat).setDOMContent(popupNode).addTo(map);
    }
  });

  map.on('mouseenter', 'places-shapes-fill', e => {
    if (e.features && e.properties) {
      if (!e.features.length) {
        return;
      }
      map.getCanvas().style.cursor = 'pointer';
      map.setFeatureState(
        {
          source: SOURCE,
          sourceLayer: SOURCE_LAYER,
          id: e.features[0].id
        },
        { hover: true }
      );
    }
  });

  map.on('mouseleave', 'places-shapes-fill', e => {
    if (e.features && e.properties) {
      if (!e.features.length) {
        return;
      }
      popup.remove();
      map.getCanvas().style.cursor = '';
      map.setFeatureState(
        {
          source: SOURCE,
          sourceLayer: SOURCE_LAYER,
          id: e.features[0].id
        },
        { hover: false }
      );
    }
  });
  map.setLayoutProperty('places-3d', 'visibility', 'none');
  // map.setLayoutProperty('places-shapes-fill', 'visibility', 'visible');
}

export function moveMap(
  map: Map,
  center?: LngLatLike | undefined,
  zoom = 12,
  bearing = 0,
  pitch = 0,
  essential = true
) {
  // map.easeTo({
  //   center,
  //   zoom,
  //   bearing,
  //   pitch,
  //   essential
  // });
  map.flyTo({
    center,
    zoom,
    bearing,
    pitch,
    essential
  });
}
