import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useSlotProps } from '@mui/base';
import { MapFilterOptions, MAP_FILTERS } from './MapFilterOptions';
import { ColorFilter } from './_MapColor';
import { AllowedStatusTypes } from '../../types/messageDTO';

const MapToolbarContainer = styled.div`
  margin-left: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;

  & > * {
    margin-bottom: 0.5rem;
  }

  & > div:not(:last-child) {
    margin-bottom: 0.25rem;
  }

  & > *:last-child {
    margin-bottom: 0;
  }

  & > button {
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
  }

  & > button > svg {
    font-size: 1.5rem;
  }

  & > button > span {
    font-size: 1.5rem;
  }

  & > button > span > svg {
    font-size: 1.5rem;
  }

  & > button > span > svg > path {
    fill: #fff;
  }
`;
// const MapToolbarContainer = styled.div`
//   position: absolute;
//   top: 0.5rem;
//   left: 0.5rem;
//   z-index: 10;
//   background-color: #fff;
//   border-radius: 0.25rem;
//   box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
//   padding: 0.25rem;
//   width: 8rem;
// `;

export function MapToolbar({
  filterType,
  filterField,
  onFilterChange,
  onFilterOptionChange,
  colorFilter,
  // setFilter,
  setColorFilter
}: {
  filterType: MapFilterOptions[keyof MapFilterOptions];
  filterField: MapFilterOptions[keyof MapFilterOptions]['options'][0]['field'];
  onFilterChange?: (
    filter: MapFilterOptions[keyof MapFilterOptions]['value']
  ) => void;
  onFilterOptionChange?: (
    filterValue: AllowedStatusTypes,
    option: any
  ) => Promise<void>;
  colorFilter?: ColorFilter;
  // setFilter?: (filter: string) => void;
  setColorFilter?: (colorFilter: ColorFilter) => void;
}) {
  const [selectedFilterValue, setSelectedFilterValue] = useState(
    filterType.value || MAP_FILTERS['HAS_DATA'].value
  );
  const [selectedFilterOption, setSelectedFilterOption] = useState(
    filterField || MAP_FILTERS['HAS_DATA'].options[0].field
  );
  const [filter, setFilter] = useState(filterType || MAP_FILTERS['HAS_DATA']);

  const handleFilterChange = useCallback(
    (
      event: React.MouseEvent<HTMLElement>,
      newFilter: MapFilterOptions[keyof MapFilterOptions]['value']
    ) => {
      if (!newFilter) return;

      setSelectedFilterValue(newFilter);
      const currentFilter = MAP_FILTERS[newFilter];
      setFilter(currentFilter);
      onFilterChange?.(currentFilter.value);
      onFilterOptionChange?.(
        currentFilter.value,
        currentFilter.options[0].field
      );
    },
    [onFilterChange, onFilterOptionChange]
  );

  const handleFilterOptionChange = useCallback(
    (
      event: React.MouseEvent<HTMLElement>,
      newFilterOption: MapFilterOptions[keyof MapFilterOptions]['options'][0]['field']
    ) => {
      if (!newFilterOption) return;
      setSelectedFilterOption(newFilterOption);
      onFilterOptionChange?.(selectedFilterValue, newFilterOption);
    },
    [onFilterOptionChange, selectedFilterValue]
  );

  const handleColorFilterChange = useCallback(
    (colorFilter: ColorFilter) => {
      setColorFilter?.(colorFilter);
    },
    [setColorFilter]
  );

  useEffect(() => {
    if (filterType.value) {
      setSelectedFilterValue(filterType.value);
      setFilter(filterType);
    }
  }, [filterType]);

  useEffect(() => {
    if (filterField) {
      setSelectedFilterOption(filterField);
    }
  }, [filterField]);

  return (
    <MapToolbarContainer>
      <ToggleButtonGroup
        color="primary"
        value={selectedFilterValue}
        exclusive
        onChange={handleFilterChange}
        aria-label="map filter">
        {Object.values(MAP_FILTERS).map(filter => (
          <ToggleButton
            key={filter.value}
            value={filter.value}
            aria-label={`${filter.name}-filter-toggle-button`}>
            {filter.name}
            {/* {filter.icon} */}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <ToggleButtonGroup
        color="primary"
        size="small"
        value={selectedFilterOption}
        exclusive
        onChange={handleFilterOptionChange}
        aria-label="map filter option">
        {filter.options.map(option => (
          <ToggleButton
            key={option.field}
            value={option.field}
            aria-label={`${option.name}-filter-option-toggle-button`}>
            {option.name}
            {/* {option.icon} */}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </MapToolbarContainer>
  );

  // const [isFullscreen, setIsFullscreen] = useState(false);

  // const handleFullscreen = useCallback(() => {
  //   if (isFullscreen) {
  //     document.exitFullscreen();
  //   } else {
  //     document.documentElement.requestFullscreen();
  //   }
  //   setIsFullscreen(!isFullscreen);
  // }, [isFullscreen]);

  // const handleColorFilterChange = useCallback(
  //   (event: React.MouseEvent<HTMLElement>, newColorFilter: ColorFilter) => {
  //     if (newColorFilter && setColorFilter) {
  //       setColorFilter(newColorFilter);
  //     }
  //   },
  //   [setColorFilter]
  // );

  // const handleFilterChange = useCallback(
  //   (event: React.MouseEvent<HTMLElement>, newFilter: string) => {
  //     if (newFilter && setFilter) {
  //       setFilter(newFilter);
  //     }
  //   },
  //   [setFilter]
  // );

  // useEffect(() => {
  //   const handleFullscreenChange = () => {
  //     setIsFullscreen(document.fullscreenElement !== null);
  //   };

  //   document.addEventListener('fullscreenchange', handleFullscreenChange);

  //   return () => {
  //     document.removeEventListener('fullscreenchange', handleFullscreenChange);
  //   };
  // }, []);

  // return (
  //   <MapToolbarContainer>
  //     <ToggleButtonGroup
  //       value={colorFilter}
  //       exclusive
  //       onChange={handleColorFilterChange}>
  //       {/* onChange={handleColorFilterChange}> */}
  //       <ToggleButton value="none">None</ToggleButton>
  //       <ToggleButton value="confirmed">Confirmed</ToggleButton>
  //       <ToggleButton value="deaths">Deaths</ToggleButton>
  //       <ToggleButton value="recovered">Recovered</ToggleButton>
  //     </ToggleButtonGroup>
  //     <ToggleButtonGroup value={filter} exclusive onChange={handleFilterChange}>
  //       {/* <ToggleButtonGroup value={filter} exclusive onChange={handleFilterChange}> */}
  //       {MAP_FILTERS.map(filter => (
  //         <ToggleButton key={filter} value={filter}>
  //           {filter}
  //         </ToggleButton>
  //       ))}
  //     </ToggleButtonGroup>
  //     <ToggleButton onClick={handleFullscreen}>
  //       {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
  //     </ToggleButton>
  //     {/* <ToggleButton onClick={handleFullscreen}>
  //       {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
  //     </ToggleButton> */}
  //   </MapToolbarContainer>
  // );
}
