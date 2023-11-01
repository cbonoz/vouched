'use client';

import { APP_NAME, EXAMPLE_DATASETS } from "../constants";
import Image from 'next/image'
import Button from 'antd/es/button'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, Divider } from "antd";

const SECTIONS = [
    'Vouched is a place to find jobs and opportunities through verified connections.',
    'Vouched is a place to get endorsements from your network.',
    'Vouched is a place to connect with people you know.',
    'Vouched is a place to find people you want to know.',
]


export default function About() {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState()

    const router = useRouter()
    return (
        <div className="about-page">
            <br />
            <br />

            <p>
                <Image src="logo.png" alt="Vouched Logo" width={140} height={40} /><br /><br />
            </p>

            {SECTIONS.map((section, i) => {
                return (
                    <p key={i}>
                        {section}
                    </p>
                )
            })}

            {/* github */}
            <p>
                You can find the code on GitHub&nbsp;
                <a style={{color: 'blue'}} href="https://github.com/cbonoz/vouched" target="_blank">here</a>.
            </p>

            <p>
                {/* Create profile */}
                <Button type="primary" size="large" onClick={() => {
                    router.push('/vouch')
                }}>Vouch for a connection</Button>&nbsp;


            </p>

            <Divider />


        </div>
    )
}