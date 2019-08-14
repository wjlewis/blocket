import React from 'react';
import './Footer.css';

export interface FooterProps {}

class Footer extends React.Component<FooterProps> {
  render() {
    return (
      <div className="footer">
        Use the arrow keys to move around!
      </div>
    );
  }
}

export default Footer;
