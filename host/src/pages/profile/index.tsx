
import React, { Suspense } from "react";
import PageLoader from "../../components/page-loader";
import importRemote from '../../utilities/dynamic-remotes';

// @ts-ignore
const ProfileRemote = React.lazy(() =>
    importRemote({
        configApiUrl: process.env.CONFIG_API!,
        remoteName: 'Profile',
        scope: 'remote_profile',
        module: 'Application'
    })
);

const ProfilePage = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <ProfileRemote />
        </Suspense>
    );
}

export default ProfilePage;
