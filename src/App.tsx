import React from 'react';
import { ReservationInfoProvider } from '@contexts/ReservationInfoProvider';
import { SelectedModalNameProvider } from '@/contexts/SelectedModalNameProvider';
import GlobalStyles from '@/GlobalStyles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages';

function App() {
  return (
    <ReservationInfoProvider>
      <SelectedModalNameProvider>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </SelectedModalNameProvider>
    </ReservationInfoProvider>
  );
}

export default App;
