import React from 'react';
import styled from 'styled-components';

const bc = '#d9d9d9';
const Box = styled.div`
  background-color: #f5f5f5;
  border: 1px solid ${bc};
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  padding: 0.75rem 3rem;
  margin: 0rem 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoxContent = styled.div`
  text-align: center;
`;

const BoxTitle = styled.h4`
  color: #333;
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0 0 0.25rem;
`;

const BoxText = styled.div`
  color: #666;
  font-size: 3rem;
  font-weight: 600;
`;

export function InfoBox(props: any) {
  return (
    <Box>
      <BoxContent>{props.children}</BoxContent>
    </Box>
  );
}

export function InfoBoxTitle(props: any) {
  return <BoxTitle>{props.children}</BoxTitle>;
}

export function InfoBoxText(props: any) {
  return <BoxText>{props.children}</BoxText>;
}
