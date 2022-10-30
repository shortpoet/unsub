import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Page, { PageToolbar } from '../component/Page';
import { Container, Grid, IconButton, Typography } from '@mui/material';
import { Section, SectionTitle, TopBar } from '../component/UI';
import { useCheckAuthentication } from '../hook/AuthenticationHook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faDownLeftAndUpRightToCenter, faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';

import PlaceAutocomplete 
import { Map } from '../component/map/Map';
import MapToolbar
import MapLegend
import { MAP_FILTERS } from '../component/map/MapFilterOptions';
import { MessageApi } from '../api/MessageApi';
import MapColor from '../component/map/MapColor';

import mapboxgl from 'mapbox-gl';
// import { MapboxLayer } from '@deck.gl/mapbox';
// import { GeoJsonLayer } from '@deck.gl/layers';
// import { StaticMap } from 'react-map-gl';
// import { Deck } from '@deck.gl/core';
import { AccountSwitch } from '../component/AccountSwitch';

import MapboxGLWorker from 'mapbox-gl';
import { IApiConfig } from '../api/IApi';

mapboxgl.workerClass = MapboxGLWorker;
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
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
  // const [center, setCenter] = useState([0, 0]);
  const [center, setCenter] = useState(undefined);
  // const [zoom, setZoom] = useState(1);
  const [filter, setFilter] = useState(MAP_FILTERS[0]);
  const [mapColor, setMapColor] = useState(new MapColor());
  const [mapColorOption, setMapColorOption] = useState(null);
  const [filterOption, setFilterOption] = useState(MAP_FILTERS[0].options[0].field);
  const [maxWidth, setMaxWidth] = useState("xl");
  const [mapData, setMapData] = useState(null);
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



  const getMessageData = useCallback(
    async (selectedTableType: any) => {
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
    },
    []
  );


  useCheckAuthentication();

  const handleFilterChange = async (filter: any) => {
    const currentFilter = MAP_FILTERS.find((f:any) => f.value === filter);
    setFilter(currentFilter);

    const data = await getMessageData(currentFilter);
    setMapData(data);

    const mapColor = new MapColor(data, currentFilter);
    setMapColor(mapColor);
    setMapColorOption(mapColor.filter(filter, currentFilter.options[0].field));
  };

  const handleFilterOptionChange = async (filterValue: any, option: any) => {
    setFilterOption(option);
    setMapColorOption(mapColor.filter(filterValue, option));
  };
    

  useEffect(() => {
    // if (account) {
    //   MessageApi.getMessages(account).then((messages) => {
    //     const mapColor = new MapColor(messages);
    //     setMapColor(mapColor);
    //     setMapColorOption(mapColor.getOptions()[0]);
    //   });
    // }
    await handleFilterChange(filter.value);
    setFilterOption(filterOption);
    setMapColorOption(mapColor.filter(filter.value, filterOption));
  }, [account]);
  // }, [account, filter, filterOption]);
    
  const handleAccountChange = (account: string) => {
    setAccount(account);
  }

  const toggleFullScreen = () => {
    if (maxWidth === "xl") {
      setMaxWidth(false);
      // setMaxWidth("lg");
    } else {
      setMaxWidth("xl");
    }
  }

  const moveMapToLocation = (location: any) => {
    if (location) {
      setCenter(location.geo);
    }
  }

  return (
    <Page>
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
            <FontAwesomeIcon icon={maxWidth === "xl" ? faUpRightAndDownLeftFromCenter : faDownLeftAndUpRightToCenter} />
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
              <LocationAutoComplete onChoose={moveMapToLocation} />
            </Grid>
            <Grid item xs={12} md={8}>
              <MapToolbar
                filter={filter}
                filterOption={filterOption}
                onFilterChange={handleFilterChange}
                onFilterOptionChange={handleFilterOptionChange}
              />
            </Grid>
          </Grid>
        </MapBar>
        <MapBox>
          <MapLegend mapColor={mapColor} mapColorOption={mapColorOption} />
          <Map
            center={center}
            // zoom={zoom}
            maxWidth={maxWidth}
            mapColor={mapColorOption}
            data={mapData}
            field={filterOption}
            fields={filter.options}
          />
        </MapBox>
        </Section>
      </Container>
    </Page>
  );
}
