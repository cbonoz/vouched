"use client"

import { useEffect, useState } from "react"
import RenderResult from "next/dist/server/render-result"
import { useSession } from '@supabase/auth-helpers-react'
import { Trash, TrashIcon } from "lucide-react"

import { Vouch } from "@/lib/types"
import { capitalize, humanError, isEmpty, profileUrl } from "@/lib/utils"
import useAuthAxios from "@/hooks/useAuthAxios"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useVouches } from "@/app/context/vouches"

import { Input } from "../ui/input"
import BasicCard from "./BasicCard"
import Loading from "./Loading"
import RenderObject from "./RenderObject"

const ManageNetwork = () => {
  const session = useSession()
  const [error, setError] = useState<string | undefined>()
  const [data, setData] = useState<any>({})

  const { authAxios } = useAuthAxios()
  const { vouches, loading, deleteVouch, getVouches } = useVouches()

  useEffect(() => {
    if (!session?.user) {
      return
    }
    getVouches()
  }, [session])

  const hasVouches = !isEmpty(vouches)

  if (loading && !hasVouches) {
    return <Loading />
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
            user has unlocked access. Make your profile public from the 'Your
            Vouch page' tab.
          </div>
          {vouches.map((vouch: Vouch, i: number) => {
            const actionRow = (
              // align to fill row
              <div className="flex justify-between">
                <span>
                  Active Vouch - {vouch.firstName} {vouch.lastName}
                </span>
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
              <BasicCard key={i} title={actionRow} className="p-4">
                <RenderObject
                  obj={vouch}
                  keys={[
                    "firstName",
                    "lastName",
                    "message",
                    // "skills",
                    // "relationship",
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
