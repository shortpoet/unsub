import React from 'react';
import styled from 'styled-components';

const PageBody = styled.div`
  padding: 1rem;
  background-color: #e9edf1;
`;

const Toolbar = styled.div`
  padding: 1rem 0;
  background-color: #e9edf1;
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
