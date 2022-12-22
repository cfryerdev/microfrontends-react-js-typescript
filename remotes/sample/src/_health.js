import React from 'react';
import pkg from "../package.json";

const Sample = ({ id }) => (
  <div>
    {pkg.name} - {pkg.version}
  </div>
);

export default Sample;
