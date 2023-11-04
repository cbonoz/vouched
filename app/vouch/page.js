'use client';

import { SignIn, useUser } from "@clerk/nextjs";
import { Button, Card, Col, Divider, Input, Row, Steps, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { humanError, isEmpty, isValidEmail, profileUrl } from "../util";
import EndorsementRow from "../lib/EndorsementRow";
import useAuthAxios from "../hooks/useAuthAxios";
import { APP_NAME, DEMO_PROFILE } from "../constants";
import { useSearchParams } from "next/navigation";

const Vouch = () => {
    const searchParams = useSearchParams();
    const { isSignedIn, user, isLoaded } = useUser();
    const [loading, setLoading] = useState(false);
    // Pull handle from query param
    const [data, setData] = useState({});
    const [error, setError] = useState()
    const [result, setResult] = useState({});

    const setDemo = () => {
        setData(DEMO_PROFILE.endorsements[0])
    }


    useEffect(() => {
        if (searchParams.has('email')) {
            const email = searchParams.get('email');
            setData({ ...data, email })
        } else if (searchParams.has('handle')) {
            const handle = searchParams.get('handle');
            setData({ ...data, handle })
        }
    }, [searchParams])

    const { postEndorse, getUser } = useAuthAxios()

    const updateData = (key, value) => {
        setData({ ...data, [key]: value });
    }

    if (!isLoaded) {
        return null;
    }

    if (!isSignedIn) {
        return <SignIn path="/vouch" routing="path" />
    }

    const validationError = getValidationError();
    const currentStep = result.status === 'success' ? 2 : !validationError ? 1 : 0;

    function getValidationError() {
        if (!isValidEmail(data.email)) {
            return 'Please enter a valid email address';
        }

        if (!data.message) {
            return 'Please enter a message';
        }

        if (!data.company) {
            return 'Please enter the company name';
        }

        if (!data.duration) {
            return 'Please enter the duration';
        }

        return null;
    }

    const submitVouch = async () => {
        setError()

        if (validationError) {
            setError(validationError);
            return;
        }


        setLoading(true);
        try {
            const res = await postEndorse(data);
            setResult(res);
        } catch (err) {
            console.error(err);
            setError(humanError(err));
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="create-vouch">

            <Row gutter={[16, 16]}>
                <Col span={16}>
                    <Card title="Vouch for a person in your network">
                        <h3>Create a new '{APP_NAME}' endorsement</h3>
                        <Button type="link" onClick={setDemo}>Use demo data</Button>

                        {/* <label>Name</label>
                        <br />
                        <Input value={data.name} onChange={(e) => updateData('name', e.target.value)} placeholder="Enter person's name" /><br /> */}
                        <br />
                        <label>Email</label>
                        <br />
                        <Input value={data.email} onChange={(e) => updateData('email', e.target.value)} placeholder="Enter email"
                            // Trigger check of user on defocus
                            onBlur={async () => {
                                try {
                                    const d = await getUser(data.email);
                                    console.log('found', data.email, d)
                                    updateData('user', d)
                                } catch (err) {
                                    console.error('not found', data.email)
                                }
                            }}
                        /><br />
                        {data.handle && <div>
                            <a href={profileUrl(data.handle)}>View profile</a>
                        </div>}
                        <br />

                        <label>Message</label>
                        {/* <Tooltip title="This is the endorsement message that will show on the recipients profile.">
                        </Tooltip> */}
                        <Input.TextArea value={data.message} onChange={(e) => updateData('message', e.target.value)} placeholder="This is the endorsement message that would show on the recipient's profile" /><br />
                        <br/>

                        <label>Shared work history (required)</label>
                        <br/>
                        I worked with this person at <Input style={{maxWidth: 200}} value={data.company} onChange={(e) => updateData('company', e.target.value)} placeholder="Enter company name" /><br />
                        for <Input type="number" style={{maxWidth: 50}} value={data.duration} onChange={(e) => updateData('duration', e.target.value)} placeholder="years" /> years.<br />

                        <Divider />

                        {data.message && <div className="endorsement-preview">
                            <EndorsementRow preview={true} endorsement={{
                                name: "John Doe",
                                createdAt: new Date(),
                                message: data.message,
                                authorName: user.fullName,
                                authorImage: user.publicMetadata.image,
                                company: data.company,
                                duration: data.duration
                            }} />
                        </div>}

      
                        <Button size="large" onClick={submitVouch} disabled={loading} type="primary">Submit</Button>
                        <br />
                        <br />

                        {error && <div className="error-text">Error: {error}</div>}
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="How it works">

                        <Steps direction="vertical" current={currentStep}
                            items={[{
                                title: "Create",
                                description: "Draft an endorsement message for a person in your network."
                            },
                            {
                                title: "Submit",
                                description: "Submit the message. The recipient will get invited to the platform if not already active."
                            },
                            {
                                title: "Accept",
                                description: "Recipient is able to accept or decline the vouch."

                            }]} />
                    </Card>
                </Col>
            </Row>

        </div>
    )

}

export default Vouch