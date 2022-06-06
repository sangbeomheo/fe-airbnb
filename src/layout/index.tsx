import React from 'react';
import { Wrapper, Header, Contents, Footer } from '@layout/index.style';
import { ReservationInfoProvider } from '@contexts/ReservationInfoProvider';
import { SelectedModalNameProvider } from '@/contexts/SelectedModalNameProvider';

interface Props {
  header: JSX.Element[] | JSX.Element;
  children: JSX.Element[] | JSX.Element;
  footer?: JSX.Element[] | JSX.Element | null;
}

function Layout({ header, children, footer = null, ...props }: Props) {
  return (
    <ReservationInfoProvider>
      <SelectedModalNameProvider>
        <Wrapper {...props}>
          <Header>{header}</Header>
          <Contents>{children}</Contents>
          <Footer>{footer}</Footer>
        </Wrapper>
      </SelectedModalNameProvider>
    </ReservationInfoProvider>
  );
}

export default Layout;
