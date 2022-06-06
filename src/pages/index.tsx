import React, { useContext } from 'react';
import styled from 'styled-components';
import Layout from '@/layout';
import Header from '@components/Header';
import Hero from '@components/Hero';
import { SelectedModalNameContext } from '@/contexts/SelectedModalNameProvider';

const Wrapper = styled.div``;

function Home() {
  const { hideSearchModal } = useContext(SelectedModalNameContext);

  return (
    <Wrapper
      className="wrapper"
      onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => hideSearchModal(event)}
    >
      <Layout header={<Header />}>
        <Hero />
      </Layout>
    </Wrapper>
  );
}

export default Home;
