import React from "react";
import dynamic from 'next/dynamic';

const HomeRemote = dynamic(() => import("remote_home/Application"), {
    ssr: false
});

const HomePage = () => (<HomeRemote />);

export default HomePage;