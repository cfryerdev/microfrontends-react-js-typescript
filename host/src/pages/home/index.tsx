import React from "react";
import { useParams } from "react-router-dom";
import importRemote from '../../utilities/dynamic-remotes';
import Layout from "../../layout";

// @ts-ignore
const HomeRemote = React.lazy(() =>
    importRemote({
        configApiUrl: process.env.CONFIG_API!,
        remoteName: 'Home',
        scope: 'remote_home',
        module: 'Application',
        remoteUrlFallback: null
    })
);

const HomePage = () => {
    let { id } = useParams();
    return (<Layout><HomeRemote id={id} /></Layout>);
}

export default HomePage;