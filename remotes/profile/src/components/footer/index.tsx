import React from "react";

interface FooterProps {
  children: React.ReactNode
}

export default ({ children }: FooterProps) => (
  <div style={{
    padding: 20,
    textAlign: 'center',
    color: '#e2e2e2'
  }}>
    { children }
  </div>
);
