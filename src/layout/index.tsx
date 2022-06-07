import React from 'react';
import { Wrapper, Header, Contents, Footer } from '@layout/index.style';

interface Props {
  header: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

function Layout({ header, children, footer, ...props }: Props) {
  return (
    <Wrapper {...props}>
      <Header>{header}</Header>
      <Contents>{children}</Contents>
      <Footer>{footer}</Footer>
    </Wrapper>
  );
}

export default Layout;
