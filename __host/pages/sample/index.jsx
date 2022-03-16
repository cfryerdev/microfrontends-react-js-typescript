import React from "react";
import dynamic from 'next/dynamic';
import { getLayout} from "../../layout";

const SampleRemote = dynamic(() => import("remote_sample/Application"), {
    ssr: false
});

const SamplePage = () => getLayout(<SampleRemote />);

export default SamplePage;