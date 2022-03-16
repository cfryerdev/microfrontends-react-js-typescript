import React from "react";
import Layout from "../../layout";

// @ts-ignore
const HomeRemote = React.lazy(() => import("remote_home/Application"));

const HomePage = () => (<Layout><HomeRemote /></Layout>);

export default HomePage;