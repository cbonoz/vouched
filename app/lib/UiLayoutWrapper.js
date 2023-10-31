'use client';

import { usePathname } from "next/navigation"
import Link from "next/link";
import { isAdminAddress } from "../util";
import { APP_NAME, PRIMARY_COLOR } from "../constants";
import StyledComponentsRegistry from "./AntdRegistry";
import { Button, ConfigProvider, Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import ConnectButton from "./ConnectButton";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

function UiLayoutWrapper({ children }) {
    const { isSignedIn, user, isLoaded } = useUser();

    const pathname = usePathname()
    const isProfilePage = pathname.startsWith('/profile')
    const menuItems = [{}]

    if (user) {
        menuItems.push({
            key: '/vouch',
            label: <Link href="/vouch">Vouch</Link>,
            href: '/vouch',
        })
        menuItems.push({
            key: '/settings',
            label: <Link href="/settings">Settings</Link>,
            href: '/settings',
        })
    }

    menuItems.push({
        key: '/about',
        label: <Link href="/about">About</Link>,
        href: '/about',
    })


    const isAdmin = false;

    if (isAdmin) {
        menuItems.push({
            key: '/admin',
            label: <Link href="/admin">Admin</Link>,
            href: '/admin',
        })
    }


    if (!isLoaded) {
        return null;
    }


    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        colorPrimary: PRIMARY_COLOR,
                        algorithm: true, // Enable algorithm
                    },
                    Input: {
                        colorPrimary: PRIMARY_COLOR,
                        algorithm: true, // Enable algorithm
                    }
                },
            }}
        >
            <StyledComponentsRegistry>
                <Layout>
                    <Header style={{ background: '#fff', display: 'flex' }}>
                        <Image src="/logo.png" alt="Vouched Logo"
                            className='header-logo pointer'
                            height={52}
                            onClick={() => {
                                window.location.href = '/'
                            }}
                            width={140}
                        />

                        <Menu style={{ minWidth: '800px' }}
                            mode="horizontal" defaultSelectedKeys={pathname} items={menuItems} />

                        <span style={{ float: 'right', right: 20, position: 'absolute' }}>
                            <ConnectButton />
                        </span>


                    </Header>
                    <Content className='container'>
                        {/* Pass children to the content area */}
                        <div className='container'>
                            {children}
                        </div>
                    </Content>

                    <Footer style={{ textAlign: 'center' }}>
                        <hr />
                        <br />
                        {APP_NAME} ©2023
                    </Footer>
                </Layout>

            </StyledComponentsRegistry>
        </ConfigProvider>
    )
}

export default UiLayoutWrapper