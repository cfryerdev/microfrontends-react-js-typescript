
import React from "react";
import dynamic from 'next/dynamic';

const ProfileRemote = dynamic(() => import("remote_profile/Application"), {
    ssr: false
});

const ProfilePage = () => (<ProfileRemote />);

// ProfilePage.getLayout = function getLayout(page) {
//     return <CustomLayout>page</CustomLayout>
// }

export default ProfilePage;
