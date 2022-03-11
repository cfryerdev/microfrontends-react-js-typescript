import React from "react";

import Footer from "../footer";

interface LayoutProps {
  children: React.ReactNode
}

export default ({ children }: LayoutProps) => (
  <>
    <nav className="navbar navbar-expand-lg bg-primary">
      <i className="fas fa-bars fa-lg sidemenu-toggle-icon"></i>
      <a className="navbar-brand" href="/" style={{ color: '#fff' }}>Custom Header</a>
    </nav>
    <div className="container-fluid p-4">{ children }</div>
    <Footer>
      Custom footer here too.
    </Footer>
  </>
);
