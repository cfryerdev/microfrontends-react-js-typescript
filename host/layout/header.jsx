import React from "react";
import Link from 'next/link';

export default () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <i className="fas fa-bars fa-lg sidemenu-toggle-icon"></i>
    <Link href="/">
      <a className="navbar-brand">Micro-Site Example</a>
    </Link>
  </nav>
);
