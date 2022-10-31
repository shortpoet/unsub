import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Page, { PageToolbar } from '../component/Page';
import {
  Breakpoint,
  Container,
  Grid,
  IconButton,
  Typography
} from '@mui/material';
import { Section, SectionTitle, TopBar } from '../component/UI';
import { useCheckAuthentication } from '../hook/AuthenticationHook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog,
  faDownLeftAndUpRightToCenter,
  faUpRightAndDownLeftFromCenter
} from '@fortawesome/free-solid-svg-icons';

// import PlaceAutocomplete
// import MapToolbar
// import MapLegend
import { Map } from '../component/map/Map';
import {
  MapFilterOptions,
  MAP_FILTERS
} from '../component/map/MapFilterOptions';
import { MessageApi } from '../api/MessageApi';
import MapColor, { MapColorFilterReturn } from '../component/map/MapColor';

import mapboxgl from 'mapbox-gl';
// import { MapboxLayer } from '@deck.gl/mapbox';
// import { GeoJsonLayer } from '@deck.gl/layers';
// import { StaticMap } from 'react-map-gl';
// import { Deck } from '@deck.gl/core';
import { AccountSwitch } from '../component/AccountSwitch';

import MapboxGLWorker from 'mapbox-gl';
import { IApiConfig } from '../api/IApi';
import { LngLatLike } from 'react-map-gl';
import { MapToolbar } from '../component/map/MapToolbar';
import { AllowedStatusTypes, GmailMessageDTO } from '../types/messageDTO';
import { MapLegend } from '../component/map/MapLegend';
import { LocationAutoComplete } from '../component/map/LocationAutoComplete';

mapboxgl.workerClass = MapboxGLWorker;
mapboxgl.workerClass =
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || '';

const FullScreenButton = styled(IconButton)`
  && {
    position: absolute;
    top: 1.5rem;
    right: 1rem;
    z-index: 1000;
    font-size: 1.5rem;
    height: 2.5rem;
    width: 2.5rem;
    padding: 0;
  }
`;

const MapBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const MapBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export function MapPage() {
  const [account, setAccount] = useState('');
  const [center, setCenter] = useState<LngLatLike | undefined>([0, 0]);
  // const [zoom, setZoom] = useState(1);
  const [filterKey, setFilterKey] =
    useState<keyof MapFilterOptions>('HAS_DATA');
  const [filterType, setFilterType] = useState<
    MapFilterOptions[keyof MapFilterOptions]
  >(MAP_FILTERS[filterKey]);

  // const [filterType, setFilterType] =
  //   useState<MapFilterOptions['HAS_DATA']['value']>('HAS_DATA');
  const [selectedFilterOption, setSelectedFilterOption] =
    useState<MapFilterOptions['HAS_DATA']['options'][0]['field']>('hasData');

  const [mapColor, setMapColor] = useState<MapColor>(new MapColor([]));
  const [mapColorOption, setMapColorOption] = useState<MapColorFilterReturn>();
  const [maxWidth, setMaxWidth] = useState<false | Breakpoint | undefined>(
    'xl'
  );
  const [mapData, setMapData] = useState<any>({});
  // const [map, setMap] = useState(null);
  // const [mapLoaded, setMapLoaded] = useState(false);
  // const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/streets-v11');
  // const [mapStyleOption, setMapStyleOption] = useState('streets-v11');
  // const [mapStyleOptions, setMapStyleOptions] = useState([
  //   { name: 'Streets', value: 'streets-v11' },
  //   { name: 'Outdoors', value: 'outdoors-v11' },
  //   { name: 'Light', value: 'light-v10' },
  //   { name: 'Dark', value: 'dark-v10' },
  //   { name: 'Satellite', value: 'satellite-v9' },
  //   { name: 'Satellite Streets', value: 'satellite-streets-v11' },
  // ]);

  const getMessageData = useCallback(async (selectedTableType: any) => {
    const config: IApiConfig = {
      baseURL: 'http://localhost:3000',
      timeout: 10000
    };
    const api = new MessageApi(config);
    const params = {
      account: account,
      userId: 'me',
      // q: 'mous',
      fetchCount: 100
    };
    return api.getMessages(params).then(response => {
      if (response.data) {
        return response.data;
      }
    });
  }, []);

  const parseGeoData = (data: GmailMessageDTO[]) => {
    return data.map((message: GmailMessageDTO) => {
      const { geoData } = message;
      if (geoData) {
        if (geoData?.length > 0) {
          const { ip, ipApi, geoIp } = geoData[0];
          if (ipApi) {
            const { lat, lon } = ipApi;
            return {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [lat, lon]
              },
              properties: {
                ip: ip,
                ipApi: ipApi,
                geoIp: geoIp,
                message: message,
                status: message.status
              }
            };
          } else if (geoIp) {
            const { lat, lon } = geoIp;
            return {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [lat, lon]
              },
              properties: {
                ip: ip,
                ipApi: ipApi,
                geoIp: geoIp,
                message: message,
                status: message.status
              }
            };
          } else {
            return {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [0, 0]
              },
              properties: {
                ip: ip,
                ipApi: ipApi,
                geoIp: geoIp,
                message: message,
                status: message.status
              }
            };
          }
        } else {
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [0, 0]
            },
            properties: {
              ip: '',
              ipApi: undefined,
              geoIp: undefined,
              message: message,
              status: message.status
            }
          };
        }
      } else {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0]
          },
          properties: {
            ip: '',
            ipApi: undefined,
            geoIp: undefined,
            message: message,
            status: message.status
          }
        };
      }
    });
    // .reduce(
    //   (acc, curr) => {
    //     if (curr.properties.status === 'HAS_DATA') {
    //       acc.hasData++;
    //     } else if (curr.properties.status === 'HAS_UNSUB_LINK') {
    //       acc.hasUnsub++;
    //     } else if (curr.properties.status === 'HAS_BOTH') {
    //       acc.hasBoth++;
    //     } else if (curr.properties.status === 'HAS_MAILTO') {
    //       acc.hasMailto++;
    //     } else if (curr.properties.status === '--> HAS_MANY_LINKS <--') {
    //       acc.hasManyLinks++;
    //     }
    //     return acc;
    //   },
    //   { hasData: 0, hasUnsub: 0, hasMailto: 0, hasManyLinks: 0, hasBoth: 0 }
    // );
  };

  useCheckAuthentication();

  const handleFilterInitChange = async (filter: any) => {
    const currentFilter = MAP_FILTERS[filterKey];
    setFilterType(currentFilter);
    try {
      const data = parseGeoData([(await getMessageData(currentFilter))[0]]);
      console.log('[MapPage.handleFilterChange.data]', data);
      setMapData(data);
      const mapColor = new MapColor(data);
      setMapColor(mapColor);
      setMapColorOption(
        mapColor.filter(filter, currentFilter.options[0].field)
      );
    } catch (error) {
      console.error('[MapPage.handleFilterChange.error]', error);
    }
  };

  const handleFilterOptionChange = async (
    filterValue: AllowedStatusTypes,
    option: any
  ) => {
    try {
      setSelectedFilterOption(option);
      setMapColorOption(mapColor.filter(filterValue, option));
    } catch (error) {
      console.error('[MapPage.handleFilterOptionChange.error]', error);
    }
  };

  useEffect(() => {
    // if (account) {
    //   MessageApi.getMessages(account).then((messages) => {
    //     const mapColor = new MapColor(messages);
    //     setMapColor(mapColor);
    //     setMapColorOption(mapColor.getOptions()[0]);
    //   });
    // }
    (async () => {
      // this sets data
      await handleFilterInitChange(filterType.value);
      setSelectedFilterOption(selectedFilterOption);
      setMapColorOption(
        mapColor.filter(filterType.value, selectedFilterOption)
      );
    })();
  }, [account]);
  // }, [account, filter, filterOption]);

  const handleAccountChange = (account: string) => {
    setAccount(account);
  };

  const toggleFullScreen = () => {
    if (maxWidth === 'xl') {
      setMaxWidth(false);
      // setMaxWidth("lg");
    } else {
      setMaxWidth('xl');
    }
  };

  const moveMapToLocation = (location: any) => {
    if (location) {
      setCenter(location.geo);
    }
  };

  return (
    <Page title="Map">
      <PageToolbar>
        <Container maxWidth="xl">
          <TopBar>
            <AccountSwitch onChange={handleAccountChange} />
          </TopBar>
        </Container>
      </PageToolbar>
      <Container maxWidth={maxWidth}>
        <Section>
          <FullScreenButton onClick={toggleFullScreen}>
            <FontAwesomeIcon
              icon={
                maxWidth === 'xl'
                  ? faUpRightAndDownLeftFromCenter
                  : faDownLeftAndUpRightToCenter
              }
            />
            {/* {maxWidth === "xl" ? <FullscreenIcon /> : <FullscreenExitIcon />} */}
          </FullScreenButton>
          <SectionTitle>Map</SectionTitle>
          <MapBar
          // style={{
          //   position: 'absolute',
          //   top: '1.5rem',
          //   left: '1rem',
          //   zIndex: 1000,
          // }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} md={4} display="flex" alignItems="flex-end">
                <LocationAutoComplete onChange={moveMapToLocation} />
              </Grid>
              <Grid item xs={12} md={8}>
                <MapToolbar
                  filterType={filterType}
                  filterField={selectedFilterOption}
                  onFilterChange={handleFilterInitChange}
                  onFilterOptionChange={handleFilterOptionChange}
                />
              </Grid>
            </Grid>
          </MapBar>
          {mapData && mapColorOption && (
            <MapBox>
              <MapLegend mapColor={mapColorOption} />
              <Map
                center={center}
                // zoom={zoom}
                maxWidth={maxWidth}
                mapColor={mapColorOption}
                data={mapData}
                filterField={selectedFilterOption}
                filterOptions={filterType.options}
                account={''}
              />
            </MapBox>
          )}
        </Section>
      </Container>
    </Page>
  );
}
