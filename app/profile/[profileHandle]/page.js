'use client'

import { Breadcrumb, Card, Row, Col, Spin, Statistic, Divider, Button, Empty } from "antd"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import { APP_NAME, DEMO_PROFILE } from "../../constants"
import useAuthAxios from "../../hooks/useAuthAxios"
import EndorsementRow from "../../lib/EndorsementRow"
import { formatDate } from "../../util"


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


    const isYou = user.firstName.indexOf('John') !== -1; // TODO:
    const userName = `${user.firstName} ${user.lastName} ${isYou ? '(you)' : ''}`

    const cardTitle = userName ?? 'User profile';
    const breadcrumbs = [
        {
            title: 'Home',
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

            <Card title={`${APP_NAME} - ${cardTitle}`}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Image src={user?.image ?? '/profile.png'}
                            className="standard-padding"
                            width={200}
                            height={200}
                            alt={"profile"}
                        />
                        <Divider />
                        <h3 className='bold'>{userName}</h3>
                        <h4>@{profileHandle}</h4>
                        <br />
                        {user.createdAt && <h4>Account created: {formatDate(user.createdAt, true)}</h4>}

                        {!isYou && <Button type="primary" size="large" onClick={() => {
                            window.location.href = `/vouch?handle=${profileHandle}`
                        }}>Vouch for {userName}</Button>}
                    </Col>
                    <Col span={16}>

                        <div className='handle-header bold'>Endorsements</div>

                        {!endorsements && !loading && <div>

                            <Empty description="No endorsements yet" />
                        </div>}

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