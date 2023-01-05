import React, { Suspense, useState } from "react";
import { NavLink } from "react-router-dom";
import PageLoader from "../components/page-loader";
import Subnav from "./subnav";
import Footer from "./footer";

import '../assets/styles/main.scss';

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <NavLink to="/" className="navbar-brand">
      <i className="fa-solid fa-sitemap"></i> Microfrontend Site
    </NavLink>
  </nav>
);

interface LayoutProps {
  children: React.ReactNode
};

const mql = window.matchMedia(`(min-width: 800px)`);

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarDocked, setSidebarDocked] = useState(mql.matches);

  mql.addListener(() => {
    setSidebarDocked(mql.matches);
  });

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