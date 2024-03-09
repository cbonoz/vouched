"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { SignIn, UserProfile, useUser } from "@clerk/nextjs"
import { Separator } from "@radix-ui/react-menubar"

import { capitalize, humanError, isEmpty, profileUrl } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toaster } from "@/components/ui/toaster"
import About from "@/components/core/About"
import AccessRequests from "@/components/core/AccessRequests"
import InviteUser from "@/components/core/InviteUser"
import ManageNetwork from "@/components/core/ManageNetwork"
import ManageProfile from "@/components/core/ManageProfile"
import Vouch from "@/components/core/Vouch"

import { useVouches } from "../context/vouches"

const ProfileSettings = () => {
  const { user, isLoaded, isSignedIn } = useUser()
  const [selectedTab, setSelectedTab] = useState("")

  const { vouches } = useVouches()

  useEffect(() => {
    if (!isLoaded || !selectedTab) {
      const getTab = () => {
        const tab = new URLSearchParams(window.location.search).get("tab")
        return tab || "manage"
      }
      setSelectedTab(getTab())
    }
  }, [isLoaded, selectedTab])

  const router = useRouter()

  if (!isLoaded) {
    return
  }

  if (!isSignedIn) {
    // push to sign in
    router.push("/sign-in")
    return
  }

  const getManageHeading = () => {
    const tab = `Manage your Vouch list`
    if (vouches.length > 0) {
      return `${tab} (${vouches.length})`
    }
    return tab
  }

  return (
    <div>
      <div className="my-4">
        <span className="text-2xl">Main dashboard</span>
        {/* <span className="text-xl">
          <a href={profileLink} target="_blank" rel="noreferrer">
            View your public profile
          </a>
        </span> */}
      </div>
      <div className="my-4">
        From this page you can manage your account settings and add new vouches
        to your profile page.
      </div>
      <Tabs
        onValueChange={(value) => setSelectedTab(value)}
        value={selectedTab}
        className="w-[800px]"
      >
        <TabsList>
          <TabsTrigger value="network">{getManageHeading()}</TabsTrigger>
          <TabsTrigger value="vouch">Add Vouch</TabsTrigger>
          <TabsTrigger value="manage">Your Vouch page</TabsTrigger>
          <TabsTrigger value="access">Access requests</TabsTrigger>
          {/* <TabsTrigger value="invite">Invite user to Vouched</TabsTrigger> */}
          <TabsTrigger value="howitworks">How Vouched works</TabsTrigger>
        </TabsList>
        <TabsContent value="manage">
          <ManageProfile />
        </TabsContent>

        <TabsContent value="vouch">
          <Vouch onSubmit={(data: any) => console.log("submit", data)} />
        </TabsContent>
        <TabsContent value="network">
          <ManageNetwork />
        </TabsContent>
        <TabsContent value="access">
          <AccessRequests />
        </TabsContent>
        <TabsContent value="invite">
          <InviteUser />
        </TabsContent>
        <TabsContent value="howitworks">
          <About />
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  )
}

export default ProfileSettings
