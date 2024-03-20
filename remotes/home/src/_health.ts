import React from 'react';
import RemoteHealthComponent from "@shared/components/remote-health-component";
import pkg from "../package.json";

const Health = () => (
  <RemoteHealthComponent 
    name={pkg.name} 
    version={pkg.version} 
    dependencies={pkg.dependencies}
  />
);

export default Health;
