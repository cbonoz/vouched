'use client';

import { SignIn, UserProfile, useUser } from "@clerk/nextjs";
import { FIELDS } from '../constants';
import { useEffect, useState } from "react";
import { Button, Card, Divider, Input, Switch } from "antd";
import { capitalize, humanError, isEmpty, profileUrl } from "../util";



const Settings = () => {
    const { isSignedIn, user, isLoaded } = useUser();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState()
    const [data, setData] = useState({});

    useEffect(() => {
        if (isLoaded && user) {
            setData({ ...user, username: user.unsafeMetadata.handle, email: user.emailAddresses[0].emailAddress });
        }
    }, [user, isLoaded]);

    function updateField(key, value) {
        setData({ ...data, [key]: value })
    }

    function validateData() {
        if (isEmpty(data.firstName)) {
            setError('First name is required');
            return false;
        }

        if (isEmpty(data.lastName)) {
            setError('Last name is required');
            return false;
        }

        if (isEmpty(data.username)) {
            setError('Username is required');
            return false;
        }
        setError();
        return true;
    }

    async function save() {
        setLoading(true);
        validateData()


        try {
            // TODO: update DB.
            await user.update({
                firstName: data.firstName,
                lastName: data.lastName,
                // imageUrl: data.imageUrl,
                unsafeMetadata: {
                    ...user.unsafeMetadata,
                    handle: data.username
                }
            });
        } catch (e) {
            setError(humanError(e));
            console.log(e);
        } finally {
            setLoading(false);
        }
    }


    if (!isLoaded) {
        return null;
    }

    if (!isSignedIn) {
        return <SignIn path="/settings" routing="path" />
    }

    const isComplete = !isEmpty(data.firstName) && !isEmpty(user.lastName) && !isEmpty(user.unsafeMetadata?.handle);

    return (
        <div>

            <Card title="Manage account">
            <h3>You must set a first name, last name, and profile image to activate your account and receive endorsements.</h3>
                <br/>
                {FIELDS.map((field, i) => {
                    const { label, key, disabled } = field
                    return <div key={i}>
                        <label>{capitalize(label)}</label>
                        <br />
                        <Input disabled={disabled} value={data[key]} onChange={(e) => updateField(key, e.target.value)} placeholder={`Enter ${label}`} />
                        <br />
                        <br />
                    </div>
                })}

                <a style={{ color: "blue" }} href={profileUrl(data.username)} target="_blank">View profile</a>
                <br />
                <Divider />
                <Button type="primary" size="large" onClick={save} loading={loading}>Save</Button>
                {error && <div className="error-text">{error}</div>}
                <br />
                <Divider />
         
                <Switch size="large" checked={data.isActivated} onChange={(e) => updateField('isActivated', e)} />&nbsp;
                {data.isActivated ? 'Profile page active' : 'Activate profile page'}
                {/* <pre>{JSON.stringify(user, null, 4)}</pre> */}

            </Card>
        </div>
    )

}

export default Settings