import React from "react";
import dynamic from 'next/dynamic';
import { getLayout} from "../../layout";

const HomeRemote = dynamic(() => import("remote_home/Application"), {
    ssr: false,
});

const HomePage = () => getLayout(<HomeRemote />)

export default HomePage;