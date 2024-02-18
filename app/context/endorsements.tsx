"use client"

import { createContext, useContext, useState } from "react"

import { AccessRequest, Endorsement, EndorsementDto } from "@/lib/types"
import { humanError } from "@/lib/utils"
import useAuthAxios from "@/hooks/useAuthAxios"

export interface EndorsementsContextProps {
  endorsements: Endorsement[]
  addEndorsement: (data: any) => Promise<void>
  deleteEndorsement: (id: string) => Promise<void>
  getEndorsements: () => Promise<void>
  loading: boolean
  accessRequests: AccessRequest[]
  acceptRequest: (id: string) => Promise<void>
  rejectRequest: (id: string) => Promise<void>
  getAccessRequests: () => Promise<void>
}

const DEFAULT_CONTEXT: EndorsementsContextProps = {
  endorsements: [],
  addEndorsement: async () => {},
  deleteEndorsement: async () => {},
  getEndorsements: async () => {},
  loading: false,
  accessRequests: [],
  acceptRequest: async () => {},
  rejectRequest: async () => {},
  getAccessRequests: async () => {},
}

const EndorsementsContext = createContext(DEFAULT_CONTEXT)

interface Props {
  children: React.ReactNode
}

export function EndorsementsProvider({ children }: Props) {
  const [endorsements, setEndorsements] = useState<Endorsement[]>([])
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | undefined>()

  const { authAxios } = useAuthAxios()

  const addEndorsement = async (data: EndorsementDto) => {
    setLoading(true)
    try {
      const response = await authAxios.post(`/endorsements`, data)
      const endorsement = response.data
      setEndorsements([...endorsements, endorsement])
    } catch (e: any) {
      setError(humanError(e))
    } finally {
      setLoading(false)
    }
  }

  const getAccessRequests = async () => {
    setLoading(true)
    try {
      const response = await authAxios.get(`/endorser/requests/list`)
      setAccessRequests(response.data)
    } catch (e: any) {
      setError(humanError(e))
    } finally {
      setLoading(false)
    }
  }

  const modifyRequest = async (id: string, action: string) => {
    setLoading(true)
    try {
      await authAxios.patch(`/endorser/requests/${id}`, { action })
    } catch (e: any) {
      setError(humanError(e))
    } finally {
      setLoading(false)
    }
  }

  const acceptRequest = async (id: string) => {
    await modifyRequest(id, "accept")
    await getEndorsements()
  }

  const rejectRequest = async (id: string) => {
    await modifyRequest(id, "reject")
    await getEndorsements()
  }

  const getEndorsements = async () => {
    setLoading(true)
    try {
      const response = await authAxios.get(`/endorsements/list?limit=1000`)
      setEndorsements(response.data)
    } catch (e: any) {
      setError(humanError(e))
    } finally {
      setLoading(false)
    }
  }

  const deleteEndorsement = async (id: string) => {
    setLoading(true)
    try {
      await authAxios.delete(`/endorsements/${id}`)
      setEndorsements(endorsements.filter((e: any) => e.id !== id))
    } catch (e: any) {
      setError(humanError(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <EndorsementsContext.Provider
      value={{
        endorsements,
        accessRequests,
        getAccessRequests,
        acceptRequest,
        rejectRequest,
        loading,
        getEndorsements,
        addEndorsement,
        deleteEndorsement,
      }}
    >
      {children}
    </EndorsementsContext.Provider>
  )
}

export function useEndorsements() {
  return useContext(EndorsementsContext)
}
