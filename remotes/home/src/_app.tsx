import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { LogClient, LogListener, logConfig } from "@shared/logging";

const App = () => {
  useEffect(() => {
    LogClient.logPageView({ page: "Home" });
  }, []);

  return (
    <>
      <Helmet>
        <title>Microfrontends | Home</title>
      </Helmet>
      <div>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">Home</li>
          <li className="breadcrumb-item active">Dashboard</li>
        </ol>
        <h2>Remote App - Home</h2>
        <p>This is the home remote application.</p>
      </div>
    </>
  );
};

export default App;
