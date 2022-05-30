import React from 'react';
import GlobalStyles from '@/GlobalStyles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages';

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
