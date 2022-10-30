import chroma from 'chroma-js';
import * as d3 from 'd3';
import {
  CHROMA_SCALE_COLOR_BREAK_COUNT,
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
    this.data = data;
  }
  private countOccurences(list: any, value: any) {
    return list.reduce((a: any, v: any) => (v === value ? a + 1 : a), 0);
  }
  private getColorLimits(values: any) {
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
  public filter(filterValue: keyof typeof MAP_FILTERS, option: any) {
    const currentFilter = MAP_FILTERS[filterValue];
    const values = d3.map(this.data, (d: any) => d[option.field]).keys();
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
