import React from 'react';
import styled from 'styled-components';

const SectionBox = styled.div`
  position: relative;
  padding: 1rem;
  background-color: #fff;
  margin: 1rem 0;
  overflow: auto;
`;

const SectionBoxTitle = styled.h2`
  padding: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 500;
  border-bottom: 1px solid #d9d9d9;
`;

const SectionContentBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: ${(props: { justify?: string }) =>
    props.justify || 'flex-start'};
  align-items: center;
  align-content: center;
`;

const Heading = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  margin: 0.5rem 0;
`;

const SubHeading = styled.h3`
  font-size: 1.25rem;
  font-weight: 400;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  border-bottom: 1px solid #d9d9d9;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 400;
  color: #666;
  margin: 0.5rem 0;
  display: block;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 400;
  color: #666;
  margin: 0.5rem 0;
  display: block;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 400;
  color: #666;
  margin: 0.5rem 0;
  display: block;
  cursor: pointer;
`;

// export const Section = (props: { title: string; children: React.ReactNode }) => {
//   return (
//     <SectionBox>
//       <SectionBoxTitle>{props.title}</SectionBoxTitle>
//       <SectionBoxContent>{props.children}</SectionBoxContent>
//     </SectionBox>
//   );
// }

export function Title(props: { children: React.ReactNode }) {
  return <Heading>{props.children}</Heading>;
}

export function SubTitle(props: { children: React.ReactNode }) {
  return <SubHeading>{props.children}</SubHeading>;
}

export function Section(props: { title: string; children: React.ReactNode }) {
  return <SectionBox {...props} />;
}

export function SectionTitle(props: { children: React.ReactNode }) {
  return <SectionBoxTitle>{props.children}</SectionBoxTitle>;
}

export function SectionContent(props: {
  justify: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <SectionContentBox justify={props.justify}>
      {props.children}
    </SectionContentBox>
  );
}

export function SectionItem(props: { children: React.ReactNode }) {
  return <div style={{ flex: '1 1 0' }}>{props.children}</div>;
}

export function SectionItemFull(props: { children: React.ReactNode }) {
  return <div style={{ flex: '1 1 100%' }}>{props.children}</div>;
}
