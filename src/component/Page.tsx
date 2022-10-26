import React from 'react';
import styled from 'styled-components';
import { myPalette } from '../Theme';

const PageBody = styled.div`
  background-color: ${myPalette.page.purpleStop};
  padding: 0rem;
  margin: 0rem;
  height: 100vh;
  width: 100vw;

  scroll-snap-align: start;
  position: relative;
`;

// const PageBody = styled.div`
//   background-color: ${myPalette.page.lightGrey};
//   padding: 0rem;
//   margin: 0rem;
//   height: 100vh;
//   width: 100vw;

//   max-height: 100vh;
//   overflow-y: scroll;
//   scroll-snap-type: mandatory;
//   scroll-snap-points-y: repeat(3rem);
//   scroll-snap-type: y mandatory;
// `;

const Toolbar = styled.div`
  background-color: ${myPalette.deepPurple.mute};
  color: ${myPalette.text.bright} !important;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
`;

export default function Page(props: {
  children: React.ReactNode;
  title: string;
  showToolbar?: boolean;
}) {
  return <PageBody>{props.children}</PageBody>;
}

export function PageToolbar(props: { children: React.ReactNode }) {
  return <Toolbar>{props.children}</Toolbar>;
}
