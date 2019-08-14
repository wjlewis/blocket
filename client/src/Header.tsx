import React from 'react';
import './Header.css';

export interface HeaderProps {}

class Header extends React.Component<HeaderProps> {
  render() {
    return (
      <div className="header">
        <div className="header__container">
          <a href="https://github.com/wjlewis/blox" target="_blank">About</a>
          <div className="header__logo" />
          <a href="https://github.com/wjlewis/blox" target="_blank">Source</a>
        </div>
      </div>
    );
  }
}

export default Header;
