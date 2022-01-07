import React from 'react';
import Navbar from '../shared/Navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar children={children}/>
    </div>
  );
};

export default Layout;