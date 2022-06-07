import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from '@components/Modal/index.style';

interface PortalProps {
  children: React.ReactNode;
}

function Portal({ children }: PortalProps) {
  const container = document.querySelector('#portal');
  return container
    ? ReactDOM.createPortal(<Container className="modal">{children}</Container>, container)
    : null;
}

export default Portal;
