import { FeatureIdentifier, MapboxGeoJSONFeature } from 'mapbox-gl';
import React from 'react';
import styled from 'styled-components';

const Popup = styled.div`
  padding: 0.5rem;
  background-color: #fff;
  z-index: 1000;
  border-radius: 0.25rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
  & h4 {
    margin: 0 0 0.5rem 0;
  }
  & label {
    font-weight: bold;
    margin-right: 0.25rem;
  }
`;

export function PlacePopup({
  feature
}: {
  feature: any;
  // feature: FeatureIdentifier | MapboxGeoJSONFeature;
}) {
  return (
    <Popup>
      <h4>{feature.name}</h4>
      {feature.properties.map((prop: any) => (
        <div key={prop.name}>
          <label>{prop.name}</label>
          <span>{prop.value}</span>
        </div>
      ))}
    </Popup>
  );
}
