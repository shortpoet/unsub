import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const FooterBar = styled.footer`
  background-color: #f5f5f5;
  border-top: 1px solid #e5e5e5;
  bottom: 0;
  left: 0;
  padding: 1rem;
  position: fixed;
  right: 0;
  text-align: center;
`;

const AUTHOR = 'Carlos Soriano';
const ORG = 'Shortpoet';

export function Footer() {
  return (
    <FooterBar>
      <p>
        Made with <FontAwesomeIcon icon={faHeart} /> by {AUTHOR}
        {'      '}
        <small>
          <a href={`/`}>Unsub App</a> is a project by{'    '}
        </small>
        © <a href="https://shortpoet.com"> {ORG}, LLC </a>
        {new Date().getFullYear()} All rights reserved.
      </p>
    </FooterBar>
  );
}
