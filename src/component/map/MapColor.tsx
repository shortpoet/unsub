/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import chroma from 'chroma-js';
import * as d3 from 'd3';
import { GmailMessageDTO } from '../../types/messageDTO';
import {
  CHROMA_SCALE_COLOR_BREAK_COUNT,
  MapFilterOptions,
  MAP_FILTERS
} from './MapFilterOptions';

const NO_DATA_COLOR = chroma('rgba(100,100,100,.0)').hex();

class MapColor {
  private data: any;
  private filterOptions: any;
  private option: any;
  private colorScale: any;
  // private colorScaleDomain: any;
  // private colorScaleRange: any;

  constructor(data: any) {
    if (data.length !== 0) {
      console.log('[MapColor.constructor]', data);
      this.data = data;
      return;
    }
  }
  private countOccurences(list: any, value: any) {
    console.log('[MapColor.countOccurences]', list, value);
    return list.reduce((a: any, v: any) => (v === value ? a + 1 : a), 0);
  }
  private getColorLimits(values: any) {
    console.log('[MapColor.getColorLimits]', values);
    const extentValues = d3.extent(values);
    let limits = chroma.limits(values, 'q', CHROMA_SCALE_COLOR_BREAK_COUNT);
    const occurences = this.countOccurences(values, 0);
    if (occurences > 0) {
      limits = chroma.limits(values, 'e', CHROMA_SCALE_COLOR_BREAK_COUNT);
    }
    if (typeof extentValues[1] === 'number') {
      if (extentValues[1] < 1) {
        limits = chroma.limits(values, 'k', CHROMA_SCALE_COLOR_BREAK_COUNT);
      }
    }
    return limits;
  }
  private colorFilter(
    values: any,
    limits: any,
    colorChoices: any[],
    scale: any,
    heightScale: any,
    magnitude: any
  ) {
    return {
      scale: () => {
        console.log('[MapColor.colorFilter.scale]', values, limits);
        return colorChoices.map((color: any, path: any) => {
          return {
            color: color,
            path: path,
            value: limits[path]
          };
        });
      },
      heightScale: (value: any) => heightScale(Number(value)),
      magnitude: (value: any) => magnitude(value),
      rgb: (value: any) => scale(Number(value)).rgb()
    };
  }
  public filter(
    filterValue: keyof typeof MAP_FILTERS,
    option: MapFilterOptions['HAS_DATA']['options'][0]['field']
  ) {
    console.log('[MapColor.filter]', filterValue, option);
    const currentFilter = MAP_FILTERS[filterValue];

    const values = d3.map(this.data, (d: any) => {
      console.log('[MapColor.filter.map.d]', d);
      console.log('[MapColor.filter.map.option]', option);
      console.log('[MapColor.filter.map.currentFilter]', currentFilter);
      // option is field
      console.log('[MapColor.filter.map.currentFilter.return]', d);
      const [lat, lng] = d.geometry.coordinates;
      const status = d.properties[option];
      return lat;
      // return {
      //   lat,
      //   lng,
      //   status
      // };
      // return [lat, lng, d.properties[option]];
      // return d[option];
    });
    // .keys();
    console.log('[MapColor.filter.map.values]', values);
    const limits = this.getColorLimits(values);
    const scale = chroma.scale(currentFilter.colors).domain(limits);
    const heightScale = d3.scaleLinear().domain(values).range([0, 100]);
    const magnitude = d3
      .scaleSequentialLog(d3.interpolatePuBuGn)
      .domain(values);
    return this.colorFilter(
      values,
      limits,
      currentFilter.colors,
      scale,
      heightScale,
      magnitude
    );
  }
}

export type MapColorFilterReturn = {
  scale: () => any;
  heightScale: (value: any) => any;
  magnitude: (value: any) => any;
  rgb: (value: any) => any;
};

export default MapColor;
