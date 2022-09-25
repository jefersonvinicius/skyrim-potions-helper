import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import NavigationSideBar from './components/NavigationSideBar';
import IngredientsSelectorPage from './pages/IngredientsSelector';
import PotionsPage from './pages/Potions';

const Content = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
`;

export default function AppRoutes() {
  return (
    <HashRouter>
      <Content>
        <NavigationSideBar />
        <Routes>
          <Route path="/" element={<PotionsPage />} />
          <Route path="/ingredients" element={<IngredientsSelectorPage />} />
        </Routes>
      </Content>
    </HashRouter>
  );
}
