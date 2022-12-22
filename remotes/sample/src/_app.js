import React from 'react';
import { Helmet } from "react-helmet";

const Sample = ({ id }) => (
  <>
    <Helmet>
      <title>Microfrontends | Sample</title>
    </Helmet>
    <div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">Home</li>
        <li className="breadcrumb-item active">Sample</li>
      </ol>
      <h2>Remote App - Sample</h2>
      <p>This is the sample remote application.</p>
      <p>Parameter: {id || 'No id found'} </p>
    </div>
  </>
);

export default Sample;
