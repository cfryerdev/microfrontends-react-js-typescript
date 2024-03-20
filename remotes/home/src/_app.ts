import React from 'react';
import { Helmet } from "react-helmet";


const App = () => (
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

export default App;
