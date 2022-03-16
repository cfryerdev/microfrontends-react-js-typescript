
import React from "react";
import dynamic from 'next/dynamic';

const ProfileRemote = dynamic(() => import("remote_profile/Application"), {
    ssr: false
});

const ProfilePage = () => (<ProfileRemote />);

export default ProfilePage;
