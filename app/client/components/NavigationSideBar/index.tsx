import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationBarIcon, NavigationSideBarContainer } from './styles';

export default function NavigationSideBar() {
  return (
    <NavigationSideBarContainer>
      <div>
        <Link to="/">
          <NavigationBarIcon src="./static/icons/potion-skyrim.jpg" />
        </Link>
      </div>
      <div>
        <Link to="/ingredients">Indredients</Link>
      </div>
    </NavigationSideBarContainer>
  );
}
