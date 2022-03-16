
import React, { Suspense } from "react";

// @ts-ignore
const ProfileRemote = React.lazy(() => import("remote_profile/Application"));

const ProfilePage = () => (
    <Suspense fallback={<div>Loading....</div>}>
        <ProfileRemote />
    </Suspense>
);

export default ProfilePage;
