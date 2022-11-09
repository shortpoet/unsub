import chroma from 'chroma-js';
import * as d3 from 'd3';
import {
  CHROMA_SCALE_COLOR_BREAK_COUNT,
  MAP_FILTERS
} from './MapFilterOptions';

const NO_DATA_COLOR = chroma('rgba(100,100,100,.0)').hex();

function countOccurences(list: any, value: any) {
  return list.reduce((a: any, v: any) => (v === value ? a + 1 : a), 0);
}

function getColorLimits(values: any) {
  const extentValues = d3.extent(values);
  let limits = chroma.limits(values, 'q', CHROMA_SCALE_COLOR_BREAK_COUNT);
  const occurences = countOccurences(values, 0);
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

function colorFilter(
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

export type ColorFilter = ReturnType<typeof colorFilter>;

export type MapColor = {
  filter: (filterValue: keyof typeof MAP_FILTERS, option: any) => any;
};

export function MapColor(data: any) {
  return {
    filter: (filterValue: keyof typeof MAP_FILTERS, option: any) => {
      const currentFilter = MAP_FILTERS[filterValue];
      const values = d3.map(data, (d: any) => d[option.field]).keys();
      const limits = getColorLimits(values);
      const scale = chroma.scale(currentFilter.colors).domain(limits);
      const heightScale = d3.scaleLinear().domain(values).range([0, 100]);
      const magnitude = d3
        .scaleSequentialLog(d3.interpolatePuBuGn)
        .domain(values);
      return colorFilter(
        values,
        limits,
        currentFilter.colors,
        scale,
        heightScale,
        magnitude
      );
    }
  };
  // const min = Math.min(...values);
  // const max = Math.max(...values);
  // const step = (max - min) / CHROMA_SCALE_COLOR_BREAK_COUNT;
  // const domain = [];
  // for (let i = 0; i < CHROMA_SCALE_COLOR_BREAK_COUNT; i++) {
  //   domain.push(min + step * i);
  // }
  // const range = currentFilter.color;
  // range.push(NO_DATA_COLOR);
  // const colorScale = d3

  //   .scaleThreshold()
  //   .domain(domain)
  //   .range(range);
  // return {
  //   option,
  //   colorScale
  // };
}

// import chroma from 'chroma-js';
// import * as d3 from 'd3';
// import {
//   CHROMA_SCALE_COLOR_BREAK_COUNT,
//   MAP_FILTERS
// } from './MapFilterOptions';

// const NO_DATA_COLOR = chroma('rgba(100,100,100,.0)').hex();

// class _MapColor {
//   private data: any;
//   private filterOptions: any;
//   private option: any;
//   private colorScale: any;
//   // private colorScaleDomain: any;
//   // private colorScaleRange: any;

//   constructor(data: any) {
//     this.data = data;
//     this.filter = filter;
//     this.option = filter.options[0];
//     this.colorScale = d3
//       .scaleThreshold()
//       .domain(this.colorScaleDomain)
//       .range(this.colorScaleRange);
//   }

//   getOptions() {
//     return this.filterOptions;
//   }

//   filter(filterValue: any, option: any) {
//     this.option = option;
//     this.colorScale = d3
//       .scaleThreshold()
//       .domain(this.colorScaleDomain)
//       .range(this.colorScaleRange);
//     return this;
//   }

//   get colorScaleDomain() {
//     const domain = [];
//     const values = this.data.map((d: any) => d[this.option.field]);
//     const min = Math.min(...values);
//     const max = Math.max(...values);
//     const step = (max - min) / CHROMA_SCALE_COLOR_BREAK_COUNT;
//     for (let i = 0; i < CHROMA_SCALE_COLOR_BREAK_COUNT; i++) {
//       domain.push(min + step * i);
//     }
//     return domain;
//   }

//   get colorScaleRange() {
//     const range = this.filterOptions;
//     range.push(NO_DATA_COLOR);
//     return range;
//   }

//   getColor(value: any) {
//     if (value === null || value === undefined) {
//       return NO_DATA_COLOR;
//     }
//     return this.colorScale(value);
//   }

//   getLegend() {
//     const legend = [];
//     const domain = this.colorScaleDomain;
//     const range = this.colorScaleRange;
//     for (let i = 0; i < domain.length; i++) {
//       legend.push({
//         color: range[i],
//         min: domain[i],
//         max: domain[i + 1]
//       });
//     }
//     return legend;
//   }

//   getTooltip(value: any) {
//     if (value === null || value === undefined) {
//       return 'No Data';
//     }
//     return this.option.transform(value);
//   }
// }
