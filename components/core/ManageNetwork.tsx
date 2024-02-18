"use client"

import { useEffect, useState } from "react"
import RenderResult from "next/dist/server/render-result"
import { SignIn, useUser } from "@clerk/nextjs"
import { Trash, TrashIcon } from "lucide-react"

import { capitalize, humanError, isEmpty, profileUrl } from "@/lib/utils"
import useAuthAxios from "@/hooks/useAuthAxios"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEndorsements } from "@/app/context/endorsements"

import { Input } from "../ui/input"
import BasicCard from "./BasicCard"
import RenderObject from "./RenderObject"

const ManageNetwork = () => {
  const { isSignedIn, user, isLoaded } = useUser()
  const [error, setError] = useState<string | undefined>()
  const [data, setData] = useState<any>({})

  const { authAxios } = useAuthAxios()

  const { endorsements, loading, deleteEndorsement, getEndorsements } =
    useEndorsements()

  useEffect(() => {
    if (!isLoaded || !user) {
      return
    }
    getEndorsements()
  }, [user, isLoaded])

  const hasEndorsements = !isEmpty(endorsements)

  if (loading && !hasEndorsements) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="flex items-center space-x-4">
        <div>
          {!hasEndorsements && !loading && (
            <div className="my-4">
              <h1 className="text-2xl font-bold">No added endorsements yet</h1>
              <p className="text-gray-500">
                {`You can add endorsements for individuals from your network from the
                'Add endorsement' tab.`}
              </p>
            </div>
          )}
          <div className="my-4">
            These profiles will be visible on your Vouched profile page if a
            user has unlocked access. Make your profile public from the User
            settings tab.
          </div>
          {endorsements.map((endorsement: any) => {
            const actionRow = (
              // align to fill row
              <div className="flex justify-between">
                <span>Endorsement</span>
                <span>
                  <button
                    onClick={() => deleteEndorsement(endorsement.id)}
                    className="text-red-500"
                  >
                    <TrashIcon size={24} />
                  </button>
                </span>
              </div>
            )

            return (
              <BasicCard title={actionRow} className="p-4">
                <RenderObject
                  obj={endorsement}
                  keys={[
                    "firstName",
                    "lastName",
                    "message",
                    "skills",
                    "relationship",
                    "createdAt",
                  ]}
                />
              </BasicCard>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default ManageNetwork
