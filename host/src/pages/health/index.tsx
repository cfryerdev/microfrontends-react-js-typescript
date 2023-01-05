import React, { Suspense, useEffect, useState } from 'react';
import importRemote from '../../utilities/dynamic-remotes';
import Layout from "../../layout";
import ErrorBoundary from "@shared/components/error-boundary";
import RemoteHealthComponent from "@shared/components/remote-health-component";
import pkg from "../../../package.json";

interface RemoteProps {
  remoteName: string;
  scope: string;
  fallBackUrl: string;
  module?: string;
};

interface RemoteResponse {
  name: string;
  url: string;
  scope: string;
};

const RemoteWrapper = ({ remoteName, scope, fallBackUrl, module = './Health' }: RemoteProps) => {
  const RemoteHealthComponent = React.lazy(() =>
    importRemote({
      configApiUrl: process.env.CONFIG_API!,
      remoteName,
      scope,
      module,
      remoteUrlFallback: fallBackUrl
    })
  );
  return (
    // @ts-ignore
    <ErrorBoundary fallback={<div className="card card-body border-danger mb-3">Error loading remote: {remoteName || 'Unknown'}</div>}>
      <Suspense fallback={<div>Loading remote...</div>}>
        <RemoteHealthComponent />
      </Suspense>
    </ErrorBoundary>
  );
};

const HealthPage = () => {
  const [remotes, setRemotes] = useState<RemoteResponse[]>();
  const fetchRemotes = () => {
    fetch(process.env.CONFIG_API!)
      .then(response => response.json())
      .then(result => {
        setRemotes(result as unknown as RemoteResponse[]);
      });
  };
  useEffect(() => {
    fetchRemotes();
  }, []);
  return (
    <Layout>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <i className="fa-solid fa-book-medical"></i> Application Health Information
        </li>
      </ol>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', alignContent: 'space-between' }}>
        <RemoteHealthComponent 
          name={pkg.name} 
          version={pkg.version} 
          dependencies={pkg.dependencies}
        />
        {remotes && remotes.map((remote, i) => {
          return (
            <RemoteWrapper
              key={i}
              remoteName={remote.name} 
              scope={remote.scope} 
              fallBackUrl={remote.url} />
          );
        })}
      </div>
      
    </Layout>
  )
}

export default HealthPage;