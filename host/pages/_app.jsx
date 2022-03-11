import Layout from "../layout";

import '../assets/styles/bootstrap.css';
import '../assets/styles/bootstrap.theme.css';
import '../assets/styles/global.css';

const MyApp = ({ Component, pageProps }) => {
  return <Layout><Component {...pageProps} /></Layout>
};

export default MyApp;
