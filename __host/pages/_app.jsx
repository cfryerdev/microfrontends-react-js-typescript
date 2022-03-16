import { useEffect, useState } from "react";

import remotes from "../next.remotes.json";

import '../assets/styles/bootstrap.css';

const MyApp = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(true);

  const InjectAndLoadScript = (document, url) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.addEventListener("load", resolve);
        script.addEventListener("error", (e) => reject(e.error));
        document.head.appendChild(script);
    });
  };
  
  const LoadAllScripts = async () => {
    const promises = remotes.map((remote) => { 
        return InjectAndLoadScript(document, remote.url);
    });
    await Promise.all(promises);
  };

  useEffect(() => {
    LoadAllScripts().then(() => { setLoading(false); });
  }, []);

  return (loading ? <div>Loading...</div> : <Component {...pageProps} />);

};

export default MyApp;
