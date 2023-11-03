'use client'

import { Breadcrumb, Card, Row, Col, Spin, Statistic, Divider } from "antd"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import { APP_NAME, DEMO_PROFILE } from "../../constants"
import useAuthAxios from "../../hooks/useAuthAxios"
import EndorsementRow from "../../lib/EndorsementRow"


export default function ProfilePage({ params }) {
    const { profileHandle } = params
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(true)
    const [type, setType] = useState('received')
    const [error, setError] = useState()
    const { getProfile } = useAuthAxios()



    async function fetchProfile() {
        setLoading(true)
        try {
            const data = await getProfile(profileHandle, type)
            setProfile(data)
        } catch (err) {
            console.error('error getting proflile, using default', err)
            // setError(err.message)
            setProfile(DEMO_PROFILE)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [profileHandle])


    if (error) {
        return <div>{error}</div>
    }


    if (loading || !profile) {
        return <Spin />
    }

    const { user, endorsements } = profile

    const userName = `${user.firstName} ${user.lastName}`

    const cardTitle = userName ?? 'User profile';
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

    return (
        <div>
            <Breadcrumb style={{ fontSize: 16 }} items={breadcrumbs} />
            <br />

            <Card title={cardTitle}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Image src={user?.image ?? '/profile.png'}
                            className="standard-padding"
                            width={200}
                            height={200}
                            alt={"profile"}
                        />
                    </Col>
                    <Col span={16}>
                        <span>
                            <span className='handle-header bold'>{userName}</span>
                        </span>
                        <br />

                        {endorsements.map((endorsement, i) => {
                            return <div>
                                <EndorsementRow defaultName={userName} key={i} endorsement={endorsement} />
                                <Divider />
                            </div>
                        })}
                    </Col>
                </Row>
            </Card>
        </div>
    )
}