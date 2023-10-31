'use client';

import { UserProfile, useUser } from "@clerk/nextjs";
import { Card } from "antd";

const Settings = () => {
    const { isSignedIn, user, isLoaded } = useUser();

    if (!isLoaded) {
        return null;
    }

    if (!isSignedIn) {
        return <Redirect to="/login" />;
    }

    return (
        <div>
            <UserProfile />
        </div>
    )

}

export default Settings