"use client"

import React, { useState } from "react"

import { siteConfig } from "@/config/site"
import { useEndorsements } from "@/app/context/endorsements"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { useToast } from "../ui/use-toast"
import BasicCard from "./BasicCard"

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
  const { addEndorsement } = useEndorsements()

  const clearForm = () => {
    setMessage("")
    setRelationship("")
    setFirstName("")
    setLastName("")
    setSkills("")
  }

  async function submitEndorsement() {
    if (!message || !relationship || !firstName || !lastName) {
      setError("Please fill out all fields")
      return
    }

    try {
      setLoading(true)
      await addEndorsement({
        message,
        relationship,
        firstName,
        lastName,
        skills
      })

      toast({
        title: "Success",
        description: "Endorsement added",
        duration: 1500,
      })
      clearForm()
      onSubmit()
    } catch (error: any) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <BasicCard title={`Add a new endorsement`} className="min-w-max p-4">
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

        <Label className="mb-4">Message</Label>
        <Textarea
          className="my-4 w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={siteConfig.endorsementPlaceholder.message}
        />

        {/* skills  */}
        <Label className="mb-4">Skills</Label>
        <Input
          className="my-4 w-full"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder={siteConfig.endorsementPlaceholder.skills}
        />

        <Label className="mb-4">Relationship</Label>
        <Input
          className="my-4 w-full"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          placeholder={siteConfig.endorsementPlaceholder.relationship}
        />

        <Button disabled={loading} onClick={submitEndorsement}>
          Add Endorsement
        </Button>

        <div>
          {error && <p className="text-red-500">{error}</p>}
          {loading && <p>Loading...</p>}
        </div>
      </BasicCard>
    </div>
  )
}

export default Vouch
