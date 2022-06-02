import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from '@components/Modal/index.style';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

function Portal({ children }: Props) {
  const container = document.querySelector('#portal');
  return container ? ReactDOM.createPortal(<Container>{children}</Container>, container) : null;
}

export default Portal;
