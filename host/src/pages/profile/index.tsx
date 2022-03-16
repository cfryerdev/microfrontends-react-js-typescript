
import React from "react";

// @ts-ignore
const ProfileRemote = React.lazy(() => import("remote_profile/Application"));

const ProfilePage = () => (<ProfileRemote />);

export default ProfilePage;
