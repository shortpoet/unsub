import chroma from 'chroma-js';
import { AllowedStatusTypes } from '../../@types/messageDTO';
import {
  formatNumberViceVersa,
  formatCurrencyViceVersa
} from '../../util/Utils';

export const CHROMA_SCALE_COLOR_BREAK_COUNT = 7;

export type MapFilterOptions = {
  [key in AllowedStatusTypes]: {
    name: string;
    value: AllowedStatusTypes;
    colors: string[];
    options: {
      name: string;
      field: string;
      transform: (value: any) => any;
    }[];
  };
};

export const MAP_FILTERS: MapFilterOptions = {
  HAS_DATA: {
    value: 'HAS_DATA',
    name: 'Has Data',
    colors: chroma.scale('PuRd').colors(CHROMA_SCALE_COLOR_BREAK_COUNT),
    options: [
      {
        field: 'hasData',
        name: 'Has Data',
        transform: (value: any) => (value ? 'Yes' : 'No')
      },
      {
        field: 'hasDataCount',
        name: 'Has Data Count',
        transform: (value: any) => formatNumberViceVersa(value)
      }
    ]
  },
  HAS_BOTH: {
    value: 'HAS_BOTH',
    name: 'Has Both',
    colors: chroma
      .scale(['#f7f7f7', '#e31a1c'])
      .colors(CHROMA_SCALE_COLOR_BREAK_COUNT)
      .reverse(),
    options: [
      {
        field: 'hasBoth',
        name: 'Has Both',
        transform: (value: any) => (value ? 'Yes' : 'No')
      },
      {
        field: 'hasBothCount',
        name: 'Has Both Count',
        transform: (value: any) => formatNumberViceVersa(value)
      }
    ]
  },
  HAS_UNSUB_LINK: {
    value: 'HAS_UNSUB_LINK',
    name: 'Has Unsub Link',
    colors: chroma.scale('YlOrRd').colors(CHROMA_SCALE_COLOR_BREAK_COUNT),
    options: [
      {
        field: 'hasUnsubLink',
        name: 'Has Unsub Link',
        transform: (value: any) => (value ? 'Yes' : 'No')
      },
      {
        field: 'hasUnsubLinkCount',
        name: 'Has Unsub Link Count',
        transform: (value: any) => formatNumberViceVersa(value)
      }
    ]
  },
  HAS_MAILTO: {
    value: 'HAS_MAILTO',
    name: 'Has Mailto',
    colors: chroma.scale('YlOrRd').colors(CHROMA_SCALE_COLOR_BREAK_COUNT),
    options: [
      {
        field: 'hasMailto',
        name: 'Has Mailto',
        transform: (value: any) => (value ? 'Yes' : 'No')
      },
      {
        field: 'hasMailtoCount',
        name: 'Has Mailto Count',
        transform: (value: any) => formatNumberViceVersa(value)
      }
    ]
  },
  '--> HAS_MANY_LINKS <--': {
    value: '--> HAS_MANY_LINKS <--',
    name: 'Has Many Links',
    colors: chroma.scale('YlOrRd').colors(CHROMA_SCALE_COLOR_BREAK_COUNT),
    options: [
      {
        field: 'hasManyLinks',
        name: 'Has Many Links',
        transform: (value: any) => (value ? 'Yes' : 'No')
      },
      {
        field: 'hasManyLinksCount',
        name: 'Has Many Links Count',
        transform: (value: any) => formatNumberViceVersa(value)
      }
    ]
  },
  '': {
    value: '',
    name: 'None',
    colors: chroma.scale('YlOrRd').colors(CHROMA_SCALE_COLOR_BREAK_COUNT),
    options: []
  }
};

// export const FILTER_COLOR_BREAKS = {
//   [MAP_FILTERS.CASES]: [
//     '#ffffcc',
//     '#c7e9b4',
//     '#7fcdbb',
//     '#41b6c4',
//     '#1d91c0',
//     '#225ea8',
//     '#253494',
//     '#081d58'
//   ],
//   [MAP_FILTERS.DEATHS]: [
//     '#ffffcc',
//     '#c7e9b4',
//     '#7fcdbb',
//     '#41b6c4',
//     '#1d91c0',
//     '#225ea8',
//     '#253494',
//     '#081d58'
//   ],
