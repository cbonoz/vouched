"use client"

import React, { useEffect, useState } from "react"
import { TrashIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { getNameFromUser, humanError, isEmpty, isValidEmail } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import BasicCard from "@/components/core/BasicCard"
import VouchRow from "@/components/core/VouchRow"

import useAuthAxios from "../../../hooks/useAuthAxios"

interface Props {
  params: {
    profileHandle: string
  }
}

export default function ProfilePage({ params }: Props) {
  const { profileHandle } = params
  const [profile, setProfile] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [emailValue, setEmailValue] = useState("")
  const [message, setMessage] = useState("")
  const [setCorrectCode, setSetCorrectCode] = useState("")
  const [showAccessModal, setShowAccessModal] = useState(false)
  const [skillFilter, setSkillFilter] = useState("")
  const [code, setCode] = useState("")
  const [type, setType] = useState("received")
  const [error, setError] = useState()
  const { getProfile, requestAccess } = useAuthAxios()

  const { theme } = useTheme()

  async function sendAccessRequest() {
    if (!isValidEmail(emailValue)) {
      alert("Enter a valid email")
      return
    }
    try {
      await requestAccess(profileHandle, message, emailValue)
      alert(
        "Request sent. You will receive an email when your request is accepted or rejected."
      )
      setShowAccessModal(false)
    } catch (err) {
      console.error("error requesting access", err)
      alert(humanError(err))
    }
  }

  useEffect(() => {
    async function fetchProfile() {
      if (email) {
        // check valid
        if (!isValidEmail(email)) {
          alert("Enter a valid email")
          return
        }
      }
      setLoading(true)
      try {
        const data = await getProfile(profileHandle, email)
        setProfile(data)
      } catch (err) {
        console.error("error getting profile, using default", err)
        setError(humanError(err))
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [profileHandle, email])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (loading || !profile) {
    return (
      <div>
        <div className="my-2">Loading Vouched profile...</div>
        <div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const {
    yourPage,
    user,
    endorsements: vouches,
    endorsementCount: vouchCount,
    locked,
  } = profile

  if (!user) {
    return <div>Profile not found</div>
  }

  const fullName = getNameFromUser(user)
  const hasVouches = !isEmpty(vouches)

  let filteredVouches = vouches
  if (skillFilter) {
    const filterString = skillFilter.toLowerCase()
    filteredVouches = vouches.filter(
      (e: any) =>
        (e.skills && e.skills.includes(filterString)) ||
        (e.message && e.message.toLowerCase().includes(filterString))
    )
  }

  return (
    <div>
      {yourPage && (
        <div className="flex flex-row gap-8 mb-4 font-bold justify-center">
          <i>
            This is your profile page. Vouches below will only be visible
            to&nbsp;
            <a
              href="/profile?tab=access"
              className="underline cursor-point text-blue-500"
            >
              your authorized visitors
            </a>
            .
          </i>
        </div>
      )}
      <div className="flex flex-row gap-8">
        <Avatar className="w-[256px] h-[256px]">
          <AvatarImage src={user.imageUrl || ""} />
          <AvatarFallback>{fullName}</AvatarFallback>
        </Avatar>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-row gap-8">
        <div className="basis-1/4">
          <div className="text-2xl my-4">{getNameFromUser(user)}</div>
          <div>{user.handle}</div>
          <div className="my-4">{user.bio}</div>
          {!locked && (
            <div>
              <i>{user.agreementText}</i>
            </div>
          )}
        </div>
        <div className="basis-3/4">
          <BasicCard title={`${fullName}'s Vouches (${vouchCount})`}>
            {!loading && !vouchCount && (
              <div className="my-4">
                <div className="text-2xl font-bold">
                  {user.firstName} has not added any vouches yet
                </div>
              </div>
            )}
            {locked && !email && (
              <div>
                <Input
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  placeholder="Enter your email to unlock or request access"
                  className="my-4"
                />

                <Button onClick={() => setEmail(emailValue)} className="mt-4">
                  Check access
                </Button>
              </div>
            )}
            {locked && email && (
              <div className="my-4">
                <div className="text-2xl font-bold">
                  {user.firstName}&#39;s vouches are locked
                </div>
                <div>
                  {`You can unlock ${user.firstName}'s vouches by requesting access`}
                </div>

                <Button
                  onClick={() => setShowAccessModal(true)}
                  className="mt-4"
                >
                  Request Access
                </Button>
              </div>
            )}
            {hasVouches && !loading && (
              <div>
                <div className="flex">
                  <Input
                    value={skillFilter}
                    onChange={(e) => setSkillFilter(e.target.value)}
                    placeholder="Filter by vouch content"
                    className="my-4"
                  ></Input>
                  {skillFilter && (
                    // align center
                    <TrashIcon
                      className="cursor-pointer text-red-500 size-6 mt-6 ml-2"
                      onClick={() => setSkillFilter("")}
                    />
                  )}
                </div>
                <div className="mt-2">
                  {filteredVouches.map((vouch: any) => {
                    return (
                      <span key={vouch.id}>
                        <VouchRow vouch={vouch} />
                      </span>

                      // <RenderObject
                      //   obj={vouch}
                      //   keys={[
                      //     "firstName",
                      //     "lastName",
                      //     "message",
                      //     "relationship",
                      //     "createdAt",
                      //   ]}
                      // />
                    )
                  })}
                </div>
              </div>
            )}
          </BasicCard>
        </div>
      </div>

      {showAccessModal && (
        <div>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          {/* <div className="fixed inset-0 bg-black bg-opacity-50" /> */}
          <div className="fixed inset-0 flex items-center justify-center">
            <div
              className={`p-12 rounded-lg bg-${
                theme === "dark" ? "black" : "white"
              } shadow-lg`}
            >
              {/* close icon */}
              <div
                className="cursor-pointer align-right"
                onClick={() => setShowAccessModal(false)}
              >
                X
              </div>
              <br />
              <div className="text-2xl font-bold">
                Request access to vouches
              </div>

              <div className="my-4">
                By clicking request access below, if this user accepts your
                access request, you agree to the following terms:
                <br />
                <br />
                <i>
                  {user.firstName}: {user.agreementText}
                </i>
              </div>

              <Input
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                placeholder="Enter your email"
                className="my-4"
              />

              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Include a message"
                className="my-4"
                rows={4}
              ></Textarea>

              <Button
                onClick={() => {
                  sendAccessRequest()
                }}
                className="mt-4"
              >
                Request Access
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
