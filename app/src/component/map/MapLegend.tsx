import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import millify from 'millify';
import { ColorFilter } from './_MapColor';
import MapColor, { MapColorFilterReturn } from './MapColor';

const Legend = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 10;
  background-color: #fff;
  border-radius: 0.25rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
  padding: 0.25rem;
  width: 8rem;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.25rem;
  }
`;

const ColorLegendScale = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`;

const ColorScale = styled.div`
  display: flex;
  flex-direction: row;
`;

const ColorScaleItem = styled.div<{ color: string }>`
  width: 2.5rem;
  height: 1rem;
  background-color: ${props => props.color};
`;

const ColorLegend = styled.div`
  width: 2.5rem;
  height: 1rem;
`;

const ColorLegendItem = styled.div<{ color: string }>`
  width: 2.5rem;
  height: 0.25rem;
  background-color: ${props => props.color};
`;

const ColorLegendLabel = styled.div`
  font-size: 0.75rem;
  text-align: center;
`;

export function MapLegend({
  data,
  mapColor,
  field,
  fields
}: {
  data?: any;
  mapColor?: MapColorFilterReturn;
  field?: string;
  fields?: {
    field: string;
    name: string;
    transform: (value: any) => string | number;
  }[];
}) {
  const [legend, setLegend] = useState<any>(null);
  const [scale, setScale] = useState<any>([]);

  useEffect(() => {
    if (mapColor) {
      setScale(mapColor.scale());
    }
  }, [mapColor]);

  return (
    <Legend>
      <ColorScale>
        {scale.map((color: string, index: number) => (
          <ColorScaleItem key={index} color={color} />
        ))}
      </ColorScale>
      {scale.length > 0 && (
        <ColorLegendScale>
          <ColorLegend>
            {millify(parseInt(scale[0].val || '0'), { lowercase: true })}
          </ColorLegend>
          {/* <ColorLegend style={{ textAlign: 'center' }}>
            {millify(parseInt(scale[scale.length / 2].val || '0'), {
              lowercase: true
            })}
          </ColorLegend> */}
          <ColorLegend style={{ textAlign: 'right' }}>
            {millify(parseInt(scale[scale.length - 1].val || '0'), {
              lowercase: true
            })}
          </ColorLegend>
        </ColorLegendScale>
      )}
      {data &&
        (fields || [{ name: '', field: '', transform: x => x }]).map(
          (field, index) => (
            <div key={index}>
              <label>{field.name}</label>
              <span>{field.transform(data[field.field])}</span>
            </div>
          )
        )}
    </Legend>
  );
}

// useEffect(() => {
//   if (data && field) {
//     const fieldDef = fields.find(f => f.field === field);
//     const values = data.features.map((f: any) => f.properties[field]);
//     const min = Math.min(...values);
//     const max = Math.max(...values);
//     const scale = mapColor.scale(min, max);
//     const legend = scale.map((color: string, index: number) => {
//       const value = min + (max - min) * (index / (scale.length - 1));
//       return {
//         color,
//         value: fieldDef ? fieldDef.transform(value) : millify(value)
//       };
//     });
//     setLegend(legend);
//   }
// }, [data, field, fields, mapColor]);

// return (
//   <Legend>
//     {legend &&
//       legend.map((item: any, index: number) => (
//         <div key={index}>
//           <ColorLegend>
//             <ColorLegendItem color={item.color} />
//           </ColorLegend>
//           <ColorLegendLabel>{item.value}</ColorLegendLabel>
//         </div>
//       ))}
//   </Legend>
// );
