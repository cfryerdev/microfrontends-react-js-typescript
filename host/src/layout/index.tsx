import React, { Suspense } from "react";
import { NavLink } from "react-router-dom";
import PageLoader from "../components/page-loader";
import Subnav from "./subnav";
import Footer from "./footer";

import '../assets/styles/main.scss';

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <i className="fas fa-bars fa-lg sidemenu-toggle-icon"></i>
    <NavLink to="/" className="navbar-brand">Microfrontend Site</NavLink>
  </nav>
);

interface LayoutProps {
  children: React.ReactNode
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Header />
      <Subnav />
      <div className="container mt-4">{children}</div>
      <Footer />
    </Suspense>
  );
};

export default Layout;