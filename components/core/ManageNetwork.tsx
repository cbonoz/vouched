"use client"

import { useEffect, useState } from "react"
import RenderResult from "next/dist/server/render-result"
import { SignIn, useUser } from "@clerk/nextjs"
import { Trash, TrashIcon } from "lucide-react"

import { capitalize, humanError, isEmpty, profileUrl } from "@/lib/utils"
import useAuthAxios from "@/hooks/useAuthAxios"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useVouches } from "@/app/context/vouches"

import { Input } from "../ui/input"
import BasicCard from "./BasicCard"
import RenderObject from "./RenderObject"
import Loading from './Loading'

const ManageNetwork = () => {
  const { isSignedIn, user, isLoaded } = useUser()
  const [error, setError] = useState<string | undefined>()
  const [data, setData] = useState<any>({})

  const { authAxios } = useAuthAxios()

  const { vouches, loading, deleteVouch, getVouches } = useVouches()

  useEffect(() => {
    if (!isLoaded || !user) {
      return
    }
    getVouches()
  }, [user, isLoaded])

  const hasVouches = !isEmpty(vouches)

  if (loading && !hasVouches) {
    return  <Loading/>
  }

  return (
    <div>
      <div className="flex items-center space-x-4">
        <div>
          {!hasVouches && !loading && (
            <div className="my-4">
              <h1 className="text-2xl font-bold">No added vouches yet</h1>
              <p className="text-gray-500">
                {`You can add vouches for individuals from your network from the
                'Add vouch' tab.`}
              </p>
            </div>
          )}
          <div className="my-4">
            These profiles will be visible on your Vouched profile page if a
            user has unlocked access. Make your profile public from the User
            settings tab.
          </div>
          {vouches.map((vouch: any) => {
            const actionRow = (
              // align to fill row
              <div className="flex justify-between">
                <span>Vouch</span>
                <span>
                  <button
                    onClick={() => deleteVouch(vouch.id)}
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
                  obj={vouch}
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
