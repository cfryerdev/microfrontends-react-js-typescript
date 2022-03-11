import React from "react";
import Header from "./header";

export default ({ children }) => {
  return (
    <>
      <Header toggleMenu={() => {}} />
      <div className="container">{children}</div>
    </>
  );
};
