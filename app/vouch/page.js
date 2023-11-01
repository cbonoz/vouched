'use client';

import { useUser } from "@clerk/nextjs";
import { Button, Card, Col, Divider, Input, Row, Steps } from "antd";
import { useState } from "react";
import { isEmpty, isValidEmail } from "../util";

const Vouch = () => {
    const { isSignedIn, user, isLoaded } = useUser();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const [result, setResult] = useState({});

    const updateData = (key, value) => {
        setData({ ...data, [key]: value });
    }

    if (!isLoaded) {
        return null;
    }

    if (!isSignedIn) {
        return <Redirect to="/login" />;
    }

    const isComplete = !isEmpty(data.name) && isValidEmail(data.email) && !isEmpty(data.message);

    const currentStep = result.status === 'success' ? 2 : isComplete ? 1 : 0;

    const submitVouch = async () => {
        const res = await fetch('/api/vouch', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        const result = await res.json();

        setResult(result);
    }

    return (
        <div>

            <Row gutter={[16, 16]}>
                <Col span={16}>
                    <Card title="Vouch for a person in your network">
                        <h3>Create a new vouch</h3>

                        <br />
                        <label>Name</label>
                        <br />
                        <Input value={data.name} onChange={(e) => updateData('name', e.target.value)} placeholder="Name" /><br />
                        <br />
                        <label>Email</label>
                        <br />
                        <Input value={data.email} onChange={(e) => updateData('email', e.target.value)} placeholder="Email"
                            // Trigger check of user on defocus
                            onBlur={() => {
                                if (isValidEmail(data.email)) {
                                    fetch('/api/checkUser?email=' + data.email)
                                        .then(res => res.json())
                                        .then(res => {
                                            if (res.exists) {
                                                updateData('handle', res.handle);
                                            }
                                        })
                                }
                            }}
                        /><br />
                        {data.handle && <div>
                            <a href={'/profile/' + data.handle}>View profile</a>
                        </div>}
                        <br />
                        <label>Message</label>
                        <Input.TextArea value={data.message} onChange={(e) => updateData('message', e.target.value)} placeholder="Message" /><br />
                        <Divider />

                        <Button size="large" onClick={submitVouch} disabled={!isComplete} type="primary">Submit</Button>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="How it works">

                        <Steps direction="vertical" current={currentStep}>
                            <Steps.Step title="Create" description="Vouch for a person in your network." />
                            <Steps.Step title="Submit" description="Submit the vouch message. The recipient will get invited to the platform if not already." />
                            <Steps.Step title="Accept" description="Recipient is able to accept or decline the vouch." />
                        </Steps>
                    </Card>
                </Col>
            </Row>

        </div>
    )

}

export default Vouch