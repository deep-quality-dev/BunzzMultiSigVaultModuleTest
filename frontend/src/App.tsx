import './App.css';

import { Container, Stack } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Header } from './components';
import { ROUTES } from './config';
import { useEagerConnect } from './hooks';

function App() {
  useEagerConnect();

  return (
    <BrowserRouter>
      <Header />
      <Container as={Stack} maxW={'7xl'} marginTop={'80px'} width={'100%'}>
        <Routes>
          {ROUTES.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            ></Route>
          ))}
          <Route path='*' element={<Navigate to={ROUTES[0].path} />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
