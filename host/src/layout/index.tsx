import React, { Suspense, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import PageLoader from "../components/page-loader";
import { AccountContext } from "@shared/contexts/account-context";

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
};

const Layout = ({ children }: LayoutProps) => {
  const context = useContext(AccountContext);
  useEffect(() => {
    window.addEventListener("storage",(e) => {
      console.log('### session updated', e);
    });
  }, [])
  return (
    <Suspense fallback={<PageLoader />}>
      <Header />
      <div className="container mt-4">{children}</div>
      <div className="text-center text-muted">
        {context.getAccountDetails().username || 'Not logged in.'}
      </div>
    </Suspense>
  );
};

export default Layout;