"use client"

import { get } from "http"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Label } from "@radix-ui/react-label"

import { siteConfig } from "@/config/site"
import { axiosInstance } from "@/lib/api"
import { capitalize, humanError, isEmpty, profileUrl } from "@/lib/utils"
import useAuthAxios from "@/hooks/useAuthAxios"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Switch } from "../ui/switch"
import { Textarea } from "../ui/textarea"
import { useToast } from "../ui/use-toast"
import BasicCard from "./BasicCard"
import BasicTooltip from "./BasicTooltip"
import Loading from "./Loading"

const ManageProfile = () => {
  const { isSignedIn, user, isLoaded } = useUser()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [resultText, setResultText] = useState<string>("")
  const [error, setError] = useState<string | undefined>()
  const [data, setData] = useState<any>({})
  const [emailConfirmed, setEmailConfirmed] = useState(false)

  const { toast } = useToast()

  const { authAxios } = useAuthAxios()

  async function getUserData(u: UserResource) {
    setLoading(true)
    try {
      const response = await authAxios.get(`/user/me`)
      const userData = response.data
      setData({
        ...userData,
        u,
      })
    } catch (e) {
      console.error(e)
      setError(humanError(e))
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (!isLoaded || !user) {
      return
    }

    getUserData(user)
  }, [user, isLoaded])

  function updateField(key: string, value: any) {
    setResultText("You must hit save for any changes to take effect")
    setData({ ...data, [key]: value })
  }

  function validateData() {
    if (isEmpty(data.firstName)) {
      setError("First name is required")
      return false
    }

    if (isEmpty(data.lastName)) {
      setError("Last name is required")
      return false
    }

    if (isEmpty(data.handle)) {
      setError("handle is required")
      return false
    }

    if (!emailConfirmed) {
      setError("Please confirm your email address")
      return false
    }

    setError(undefined)
    return true
  }

  async function verifyEmail() {
    if (!user) return;
    try {
      await user.verifyEmail();
      setEmailConfirmed(true);
      toast({
        title: "Success",
        description: "Email verification sent. Please check your inbox.",
        duration: 1500,
      })
    } catch (e) {
      setError(humanError(e))
      console.error(e)
    }
  }

  async function save() {
    if (!user) {
      alert("Session invalid. Please sign in again.")
      return
    }

    if (!validateData()) {
      return
    }
    setResultText("")
    setSaving(true)

    try {
      await axiosInstance.patch(`/user/me`, {
        ...data,
      })

      // await user.update({
      //   firstName: data.firstName,
      //   lastName: data.lastName,
      // })

      toast({
        title: "Success",
        description: "Your profile has been updated",
        duration: 1500,
      })
      await getUserData(user)
    } catch (e) {
      setError(humanError(e))
      console.log(e)
    } finally {
      setSaving(false)
    }
  }

  const handlePlaceholder =
    data.firstName && data.lastName
      ? (data.firstName + "-" + data.lastName).toLowerCase()
      : "john-doe"

  const isProfileActivated = !!data.activatedAt && !!data.handle

  return (
    <BasicCard title="Vouch page setup" className="min-w-max p-4">
      {isProfileActivated && (
        <div>
          View your profile page:{" "}
          <Link
            href={profileUrl(data.handle)}
            className="underline text-blue-500"
            target="_blank"
            rel="noreferrer"
          >
            {profileUrl(data.handle)}
          </Link>{" "}
          (share this link with others)
        </div>
      )}
      {!isProfileActivated && !loading && (
        <div>
          <div className="my-4 font-bold ">
            Your profile is not activated. Please fill out the required fields
            and activate your profile to make it public.
          </div>
        </div>
      )}
      {!loading && (
        <div className="my-1">
          <b>Enter your bio information below</b>
          <div className="py-2">
            <Label htmlFor="firstName">Your first name</Label>
            <Input
              id="firstName"
              value={data.firstName}
              placeholder="Your first name"
              onChange={(e) => updateField("firstName", e.target.value)}
              className="Input"
            />
          </div>
          {/* last name */}
          <div className="py-2">
            <Label htmlFor="lastName">Your last name</Label>
            <Input
              id="lastName"
              placeholder="Your last name"
              value={data.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              className="Input"
            />
          </div>
          <div className="py-2">
            <Label htmlFor="title">
              Enter your title to display
              <BasicTooltip text={siteConfig.tooltips.profile.title}>
                <Icons.infoCircle />
              </BasicTooltip>
            </Label>
            <Input
              id="title"
              placeholder='Ex: "Software sales leader" or "Product Manager with over 10 years of experience"'
              value={data.title}
              onChange={(e) => updateField("title", e.target.value)}
              className="Input"
            />
          </div>
          <div className="py-2">
            <Label htmlFor="bio">
              Enter your bio information to display
              <BasicTooltip text={siteConfig.tooltips.profile.bio}>
                <Icons.infoCircle />
              </BasicTooltip>
            </Label>
            <Textarea
              id="bio"
              rows={5}
              placeholder='Ex: "I am a software engineer with a passion for building scalable web applications."'
              value={data.bio}
              onChange={(e) => updateField("bio", e.target.value)}
              className="Input"
            />
          </div>
          <div className="py-2">
            <Label htmlFor="bio">
              Enter agreement text
              <BasicTooltip text={siteConfig.tooltips.profile.agreement}>
                <Icons.infoCircle />
              </BasicTooltip>
            </Label>
            <Textarea
              id="agreement"
              rows={5}
              value={data.agreementText}
              placeholder='Ex: "By using my Vouch network, you agree to pay 10% of any successful hire first year salary ."'
              onChange={(e) => updateField("agreementText", e.target.value)}
              className="Input"
            />
          </div>
          <div className="py-2">
            <Label htmlFor="handle">
              Enter Vouched page handle
              <BasicTooltip text={siteConfig.tooltips.profile.handle}>
                <Icons.infoCircle />
              </BasicTooltip>
            </Label>
            <Input
              id="handle"
              value={data.handle}
              placeholder={`ex: ${handlePlaceholder}`}
              onChange={(e) => updateField("handle", e.target.value)}
              className="Input"
            />
          </div>
          <div className="my-4">
            Update your profile image by clicking the user icon in the top right
            of the page. Hit save below and ensure an image icon below displays.
            <br />
            Ideal image aspect ratio should be 1:1.
            <div className="profile-image-preview max-w-[64px]">
              <Image
                src={data.imageUrl || ""}
                alt="Profile image"
                width="64"
                height="64"
                className="my-2 h-unset rounded-full"
              />
            </div>
          </div>
          {/* handle */}
          <div className="my-2 flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label className="text-xl font-bold">Email Verification</Label>
              <div>
                {emailConfirmed ?
                  "Email verified" :
                  "Please verify your email address before activating your account"}
              </div>
            </div>
            {!emailConfirmed && (
              <Button onClick={verifyEmail} variant="outline">
                Verify Email
              </Button>
            )}
          </div>
          <div className="my-2 flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label className="text-xl font-bold">Activate account page</Label>
              <div>
                By activating your account page, you agree to our{" "}
                <Link className="underline" href="/terms">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link className="underline" href="/terms">
                  Privacy Policy
                </Link>
              </div>
            </div>

            <Switch
              className="mx-4"
              checked={!!data.activatedAt}
              onCheckedChange={() =>
                updateField(
                  "activatedAt",
                  data.activatedAt ? null : new Date().getTime()
                )
              }
            />
          </div>
          <Button disabled={loading || saving} type="submit" onClick={save}>
            Save
          </Button>
          {isProfileActivated && (
            <div className="my-2">
              <Link
                href={profileUrl(data.handle)}
                className="underline text-blue-500"
                target="_blank"
                rel="noreferrer"
              >
                View profile page
              </Link>
            </div>
          )}
        </div>
      )}
      {loading && <Loading />}
      <div className="my-4 max-w-[400px]">
        {error && <div className="text-red-500">{error}</div>}
      </div>
      {resultText && <div className="text-med font-bold">{resultText}</div>}
    </BasicCard>
  )
}
export default ManageProfile
