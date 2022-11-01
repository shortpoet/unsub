import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { initMap, moveMap } from './MapService';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useSlotProps } from '@mui/base';
import { ColorFilter, MapColor } from './_MapColor';
import { Breakpoint } from '@mui/material';
import { MapColorFilterReturn } from './MapColor';
import { MapFilterOptions } from './MapFilterOptions';

const MapFrame = styled.div`
  margin-top: 0.75rem;
  width: 100%;
  max-width: ${(props: { maxWidth?: false | Breakpoint | undefined }) =>
    props.maxWidth || 'lg'};
  height: calc(100vh - 10rem);
  z-index: 1;
  overflow: hidden;
`;

export const SOURCE = 'earthquakes';
export const SOURCE_LAYER = 'earthquakes';

export function Map({
  center,
  maxWidth,
  mapColor,
  data,
  filterField,
  filterOptions,
  account
}: {
  center: LngLatLike | undefined;
  maxWidth: false | Breakpoint | undefined;
  mapColor: MapColorFilterReturn;
  data: any;
  filterField: MapFilterOptions[keyof MapFilterOptions]['options'][0]['field'];
  filterOptions: MapFilterOptions[keyof MapFilterOptions]['options'];
  account?: string;
}) {
  const mapContainer = useRef(null);
  // const map = useRef(null);
  // const map = React.useRef<mapboxgl.Map | null>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(6);
  const popup = useRef(
    new mapboxgl.Popup({
      offset: 25,
      closeButton: false,
      closeOnClick: false
    })
  );

  const onMapClick = useCallback((e: any) => {
    popup.current.setLngLat(e.lngLat).setHTML('Hello World!');
    // .addTo(map.current);
  }, []);

  const attachMap = (
    setMap: React.Dispatch<React.SetStateAction<any>>,
    mapDiv: React.RefObject<HTMLDivElement>
  ) => {
    if (!mapContainer.current) {
      return;
    }
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [lng, lat],
      zoom: zoom,
      attributionControl: false,
      antialias: true,
      trackResize: true,
      preserveDrawingBuffer: true,
      fadeDuration: 0,
      pitchWithRotate: false,
      dragRotate: false,
      touchZoomRotate: false,
      doubleClickZoom: false,
      scrollZoom: false,
      boxZoom: false,
      dragPan: false,
      keyboard: false,
      interactive: false,
      maxBounds: [
        [-180, -90],
        [180, 90]
      ]
    });
    setMap(map);
  };

  useEffect(() => {
    // map.current = initMap(mapContainer.current, onMapClick);

    if (!map) {
      attachMap(setMap, mapContainer);
      return;
    }
    if (!mapContainer.current) {
      attachMap(setMap, mapContainer);
      return;
    }
    map.on('load', () => {
      if (!mapContainer.current) {
        attachMap(setMap, mapContainer);
        return;
      }
      initMap(mapContainer.current, popup.current);
    });
    // map.on('move', () => {
    //   // setLng(map.getCenter().lng.toFixed(4));
    //   // setLat(map.getCenter().lat.toFixed(4));
    //   // setZoom(map.getZoom().toFixed(2));
    //   // moveMap(map, center, mapColor, data, field, fields);
    //   moveMap(mapContainer.current, setLng, setLat, setZoom);
    // });
  }, []);
  // }, [map, lng, lat, zoom, center, mapColor, data, field, fields, onMapClick]);

  // }, [map, lng, lat, zoom, onMapClick]);

  const retries = useRef(5);
  const loadData = () => {
    // const source = map.current.getSource('earthquakes');
    // const data = await fetch('https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson');

    // while (!map || !map.getSource(SOURCE)) {
    //   if (retries.current > 0) {
    //     retries.current -= 1;
    //     setTimeout(() => {
    //       loadData();
    //     }, 1000);
    //   } else {
    //     retries.current = 5;
    //   }
    //   return;
    // }
    try {
      if (!mapContainer.current) {
        attachMap(setMap, mapContainer);
        return;
      }
      if (!map) {
        attachMap(setMap, mapContainer);
        return;
      }
      if (!map.isSourceLoaded(SOURCE)) {
        // map.current.addSource('earthquakes', {
        //   type: 'geojson',
        //   data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
        // });
        setTimeout(loadData, 500);
        return;
      }
    } catch (error) {
      setTimeout(loadData, 2000);
      return;
    }
    map.removeFeatureState({
      source: SOURCE,
      sourceLayer: SOURCE_LAYER
    });

    data.forEach((item: any) => {
      const value = item[filterField];
      const state = {
        hover: false,
        selected: true,
        magnitude: mapColor.magnitude(value),
        quantize_color: mapColor.rgb(value),
        // quantize_color: useSlotProps.mapColor.rgb(value),
        quantize_height: mapColor.heightScale(value),
        name: item.name,
        place_id: item.placeId,
        properties: [{}]
      };

      (filterOptions || []).forEach((option: any) => {
        // const transform = useSlotProps.mapColor.transform(field);
        const transform = option.transform || ((value: any) => value);
        state.properties.push({
          name: option.name,
          value: transform(item[option.field])
        });
      });

      map.setFeatureState(
        {
          source: SOURCE,
          sourceLayer: SOURCE_LAYER,
          id: item.placeId
        },
        state
      );
    });
  };

  useEffect(() => {
    setTimeout(loadData, 0); // load data after map is initialized
  }, [data, filterField, mapColor, filterOptions]);

  useEffect(() => {
    if (!map || !mapContainer.current) {
      return;
    }
    moveMap(mapContainer.current, center);
    // moveMap(mapContainer.current, setLng, setLat, setZoom);
  }, [center]);
  // , [center, mapColor, data, field, fields]);

  useEffect(() => {
    if (!map) {
      return;
    }
    map.resize();
  }, [maxWidth]);

  return (
    <MapFrame
      ref={mapContainer}
      maxWidth={maxWidth}
      className="map-container"
    />
  );
}
