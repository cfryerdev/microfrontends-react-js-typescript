import React from "react";
import { NavLink } from "react-router-dom";

interface SidemenuProps {
    toggleMenu: any
}

export default ({ toggleMenu }: SidemenuProps) => (
  <div className="sidemenu">
    <div className="card profile-card">
      <div className="card-body">
        <h4 className="card-title">John Smith</h4>
        <h6 className="card-subtitle mb-3 text-muted">Administrator</h6>
        <NavLink to="/" onClick={toggleMenu} className="card-link">
          Profile
        </NavLink>
        <NavLink to="/" onClick={toggleMenu} className="card-link">
          Logout
        </NavLink>
      </div>
    </div>
    <NavLink className="link" to="/sample/666" onClick={toggleMenu}>
      Sample Page
    </NavLink>
    <NavLink className="link" to="/" onClick={toggleMenu}>
      Page 1
    </NavLink>
    <NavLink className="link" to="/" onClick={toggleMenu}>
      Page 2
    </NavLink>
    <NavLink className="link" to="/" onClick={toggleMenu}>
      Page 3
    </NavLink>
  </div>
);
