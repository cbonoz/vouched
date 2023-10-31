'use client'

import { Breadcrumb, Card, Row, Col, Spin, Statistic } from "antd"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import { APP_NAME } from "../../constants"


export default function ProfilePage({ params }) {
    const { profileHandle } = params
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    const cardTitle = profile.name ?? 'User profile';

    const breadcrumbs = [
        {
            title: APP_NAME,
            href: '/'
        },
        {
            title: cardTitle,
            href: `/profile/${profileHandle}`
        }
    ]

    useEffect(() => {
        setLoading(false)
    }, [profileHandle])

    if (loading) {
        return <Spin />
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div>
            <Breadcrumb style={{ fontSize: 16 }} items={breadcrumbs} />
            <br/>

            <Card title={cardTitle}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Image src={profile.image ?? ''}
                            alt={"profile"}
                            layout='fill'
                            objectFit='contain'
                        />
                    </Col>
                    <Col span={16}>
                        <span>
                            <span className='handle-header bold'>{profileHandle}</span>
                        </span>
                        <br/>
                        {JSON.stringify(profile, null, 4)}
                    </Col>
                </Row>
            </Card>
        </div>
    )
}