"use client"

import { useEffect, useState } from "react"
import RenderResult from "next/dist/server/render-result"
import { SignIn, useUser } from "@clerk/nextjs"
import { CheckCheckIcon, CheckIcon, Trash, TrashIcon } from "lucide-react"

import { capitalize, humanError, isEmpty, profileUrl } from "@/lib/utils"
import useAuthAxios from "@/hooks/useAuthAxios"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useVouches } from "@/app/context/vouches"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import BasicCard from "./BasicCard"
import Loading from "./Loading"
import RenderObject from "./RenderObject"

const AccessRequests = () => {
  const { isSignedIn, user, isLoaded } = useUser()
  const [error, setError] = useState<string | undefined>()
  const [data, setData] = useState<any>({})

  const { authAxios } = useAuthAxios()

  const {
    loading,
    accessRequests,
    getAccessRequests,
    rejectRequest,
    acceptRequest,
  } = useVouches()

  useEffect(() => {
    if (!isLoaded || !user) {
      return
    }
    getAccessRequests()
  }, [user, isLoaded])

  const hasRequests = !isEmpty(accessRequests)

  if (loading && !hasRequests) {
    return <Loading />
  }

  return (
    <div>
      <div className="flex items-center space-x-4">
        <div>
          {!hasRequests && !loading && (
            <div className="my-4">
              <h1 className="text-2xl font-bold">No access requests yet</h1>
              <p className="text-gray-500">
                {`You will see access requests here when someone requests access to
        your vouches.`}
              </p>
            </div>
          )}
          {hasRequests && (
            <div className="text-2xl my-2">
              New access requests will appear on this page.
            </div>
          )}
          {accessRequests.map((request: any) => {
            const isApproved = !!request.approvedAt
            const actionRow = (
              // align to fill row
              <div className="flex justify-between">
                {isApproved && (
                  <span className="text-green-500 flex">
                    Access Active&nbsp;
                    <CheckIcon size={24} />
                  </span>
                )}
                {!isApproved && (
                  <div>
                    <div>New Access Request</div>
                    <br />
                    <Button
                      onClick={async () => {
                        await acceptRequest(request.id)
                        await getAccessRequests()
                      }}
                    >
                      Accept request
                    </Button>
                  </div>
                )}

                <span>
                  <button
                    onClick={async () => {
                      await rejectRequest(request.id)
                      await getAccessRequests()
                    }}
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
                  obj={request}
                  keys={["requesterEmail", "message", "createdAt"]}
                />
              </BasicCard>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default AccessRequests
