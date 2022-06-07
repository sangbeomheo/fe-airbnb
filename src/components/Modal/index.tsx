import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from '@components/Modal/index.style';

interface Props {
  children: React.ReactNode;
}

function Portal({ children }: Props) {
  const container = document.querySelector('#portal');
  return container
    ? ReactDOM.createPortal(<Container className="modal">{children}</Container>, container)
    : null;
}

export default Portal;
