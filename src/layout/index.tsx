import React from 'react';
import { Wrapper, Header, Contents, Footer } from '@layout/index.style';

interface LayoutProps {
  header: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

function Layout({ header, children, footer, ...props }: LayoutProps) {
  return (
    <Wrapper {...props}>
      <Header>{header}</Header>
      <Contents>{children}</Contents>
      <Footer>{footer}</Footer>
    </Wrapper>
  );
}

export default Layout;
