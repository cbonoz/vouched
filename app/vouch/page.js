'use client';

import { useUser } from "@clerk/nextjs";
import { Button, Card, Col, Divider, Input, Row, Steps, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { humanError, isEmpty, isValidEmail, profileUrl } from "../util";
import EndorsementRow from "../lib/EndorsementRow";
import useAuthAxios from "../hooks/useAuthAxios";
import { APP_NAME } from "../constants";
import { useSearchParams } from "next/navigation";

const Vouch = () => {
    const searchParams = useSearchParams();
    const { isSignedIn, user, isLoaded } = useUser();
    const [loading, setLoading] = useState(false);
    // Pull handle from query param
    const [data, setData] = useState({ name: '' });
    const [error, setError] = useState()
    const [result, setResult] = useState({});


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
        return <Redirect to="/login" />;
    }

    const isComplete = isValidEmail(data.email) && !isEmpty(data.message);

    const currentStep = result.status === 'success' ? 2 : isComplete ? 1 : 0;

    const submitVouch = async () => {
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
        <div>

            <Row gutter={[16, 16]}>
                <Col span={16}>
                    <Card title="Vouch for a person in your network">
                        <h3>Create a new '{APP_NAME}' endorsement</h3>

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
                        <Divider />

                        {isComplete && <div className="endorsement-preview">
                            <EndorsementRow preview={true} endorsement={{
                                name: "John Doe",
                                createdAt: new Date(),
                                message: data.message,
                                authorName: user.fullName,
                                authorImage: user.publicMetadata.image
                            }} />
                        </div>}

                        <Button size="large" onClick={submitVouch} disabled={!isComplete || loading} type="primary">Submit</Button>

                        {error && <div>{error}</div>}
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="How it works">

                        <Steps direction="vertical" current={currentStep}>
                            <Steps.Step title="Create" description="Draft an endorsement message for a person in your network." />
                            <Steps.Step title="Submit" description="Submit the message. The recipient will get invited to the platform if not already active." />
                            <Steps.Step title="Accept" description="Recipient is able to accept or decline the vouch." />
                        </Steps>
                    </Card>
                </Col>
            </Row>

        </div>
    )

}

export default Vouch