"use client"

import React, { useState } from "react"

import { siteConfig } from "@/config/site"
import { humanError } from "@/lib/utils"
import { useVouches } from "@/app/context/vouches"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { useToast } from "../ui/use-toast"
import BasicCard from "./BasicCard"
import Loading from "./Loading"

interface Props {
  // targetUser: any
  onSubmit: any
}

const Vouch = ({ onSubmit }: Props) => {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [relationship, setRelationship] = useState("")
  const [skills, setSkills] = useState<string>("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  const { toast } = useToast()
  const { addVouch } = useVouches()

  const clearForm = () => {
    setMessage("")
    setRelationship("")
    setFirstName("")
    setLastName("")
    setSkills("")
  }

  async function submitVouch() {
    if (!message || !firstName || !lastName) {
      setError("Please fill out all fields")
      return
    }

    try {
      setLoading(true)
      await addVouch({
        message,
        relationship,
        firstName,
        lastName,
        skills,
      })

      toast({
        title: "Success",
        description: "Vouch added",
        duration: 1500,
      })
      clearForm()
      onSubmit()
    } catch (error: any) {
      setError(humanError(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <BasicCard title={`Add a new Vouch`} className="min-w-max p-4">
        <Label className="mb-4">First name</Label>
        <Input
          className="my-4 w-full"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter first name of individual (ex: John)"
        />

        <Label className="mb-4">Last name</Label>
        <Input
          className="my-4 w-full"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter last name of individual (ex: Doe)"
        />

        <Label className="mb-4">Headline / Summary</Label>
        <Textarea
          className="my-4 w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={siteConfig.vouchPlaceholder.message}
        />

        {/* skills  */}
        {/* <Label className="mb-4">Skills</Label>
        <Input
          className="my-4 w-full"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder={siteConfig.vouchPlaceholder.skills}
        />

        <Label className="mb-4">Relationship</Label>
        <Input
          className="my-4 w-full"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          placeholder={siteConfig.vouchPlaceholder.relationship}
        /> */}

        <Button disabled={loading} onClick={submitVouch}>
          Add Vouch
        </Button>

        <div>
          {error && <p className="text-red-500">{error}</p>}
          {loading && <Loading />}
        </div>
      </BasicCard>
    </div>
  )
}

export default Vouch
