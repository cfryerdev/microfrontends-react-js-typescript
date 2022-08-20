import React, { Suspense, useState } from "react";
import { NavLink } from "react-router-dom";
import PageLoader from "../components/page-loader";
import LeftNavigation from "@shared/components/left-navigation";
import Sidemenu from "./sidemenu";
import Footer from "./footer";

import '../assets/styles/main.scss';

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <i className="fas fa-bars fa-lg sidemenu-toggle-icon"></i>
    <NavLink to="/" className="navbar-brand">Micro-Site Example</NavLink>
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
      {/* <LeftNavigation
        sidebar={<Sidemenu toggleMenu={() => setSidebarOpen(false)} />}
        open={sidebarOpen}
        onSetOpen={setSidebarOpen}
        docked={sidebarDocked}
      > */}
        <div className="container mt-4">{children}</div>
      {/* </LeftNavigation> */}
      <Footer />
    </Suspense>
  );
};

export default Layout;