import React from "react";

interface FooterProps {
  children: React.ReactNode
}

export default ({ children }: FooterProps) => {
  return (
    <div className="text-center text-muted">
      { children }
    </div>
  );
}