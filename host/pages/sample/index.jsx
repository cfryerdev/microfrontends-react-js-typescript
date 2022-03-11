import React from "react";
import dynamic from 'next/dynamic';

const SampleRemote = dynamic(() => import("remote_sample/Application"), {
    ssr: false
});

const SamplePage = () => (<SampleRemote />);

export default SamplePage;