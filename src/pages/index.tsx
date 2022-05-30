import React from 'react';
import Layout from '@/layout';
import Header from '@components/Header';
import Hero from '@components/Hero';

function Home() {
  return (
    <Layout header={<Header />}>
      <Hero />
    </Layout>
  );
}

export default Home;
