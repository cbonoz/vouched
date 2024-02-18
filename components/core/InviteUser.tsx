"use client"

import { useState } from "react"

import { axiosInstance } from "@/lib/api"
import { humanError } from "@/lib/utils"

import { Button, buttonVariants } from "../ui/button"
import { Input } from "../ui/input"
import { useToast } from "../ui/use-toast"
import BasicCard from "./BasicCard"

const InviteUser = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  async function inviteUser() {
    if (!name || !email) {
      toast({
        title: "Error",
        description: "Please fill out all fields",
        variant: "destructive",
        duration: 1500,
      })
      return
    }

    try {
      setLoading(true)
      const { data } = await axiosInstance.post("/user/invite", {
        name: name,
        email,
      })
      toast({
        title: "Success",
        description: "Your invite to Vouched has been sent via email",
        duration: 1500,
      })
    } catch (error: any) {
      toast({
        title: "Error sending invite",
        description: humanError(error),
        variant: "destructive",
        duration: 1500,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* <h1>Request Invite</h1> */}

      <BasicCard title="Invite new user to join Vouched" className="w-max p-6">
        <Input
          className="mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter their first and last name"
        />

        <Input
          className="mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter individual's email"
        />

        <Button
          onClick={inviteUser}
          className={buttonVariants({ variant: "default" })}
        >
          Invite User
        </Button>
      </BasicCard>
    </div>
  )
}

export default InviteUser
