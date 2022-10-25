import React from 'react';
import styled from 'styled-components';
import { myPalette } from '../Theme';

const PageBody = styled.div`
  background-color: ${myPalette.page.lightGrey};
  padding: 0rem;
`;

const Toolbar = styled.div`
  padding: 1rem 0;
  background-color: ${myPalette.page.mediumGrey};
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
