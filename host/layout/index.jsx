import React from "react";
import Header from "./header";

import './index.module.css';

const Layout = ({ children }) => {
  return (
    <>
      <Header toggleMenu={() => {}} />
      <div className="container mt-4">{children}</div>
    </>
  );
};

export const getLayout = (page) => {
  return <Layout>{page}</Layout>
};

export default Layout;