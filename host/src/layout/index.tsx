import React, { Suspense } from "react";
import { Outlet, NavLink } from "react-router-dom";

import '../assets/styles/bootstrap.css';
import '../assets/styles/main.css';

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <i className="fas fa-bars fa-lg sidemenu-toggle-icon"></i>
    <NavLink to="/" className="navbar-brand">Micro-Site Example</NavLink>
  </nav>
);

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <Header />
      <div className="container mt-4">{children}</div>
    </Suspense>
  );
};

export default Layout;