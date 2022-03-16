import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../layout";

// @ts-ignore
const SampleRemote = React.lazy(() => import("remote_sample/Application"));

const SamplePage = () => {
    let { id } = useParams();
    return (<Layout><SampleRemote id={id} /></Layout>);
}

export default SamplePage;