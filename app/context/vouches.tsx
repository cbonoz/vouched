"use client"

import { createContext, useContext, useState } from "react"

import { AccessRequest, Vouch, Vouchedto } from "@/lib/types"
import { humanError } from "@/lib/utils"
import useAuthAxios from "@/hooks/useAuthAxios"

export interface VouchesContextProps {
  vouches: Vouch[]
  addVouch: (data: any) => Promise<void>
  deleteVouch: (id: string) => Promise<void>
  getVouches: () => Promise<void>
  loading: boolean
  accessRequests: AccessRequest[]
  acceptRequest: (id: string) => Promise<void>
  rejectRequest: (id: string) => Promise<void>
  getAccessRequests: () => Promise<void>
}

const DEFAULT_CONTEXT: VouchesContextProps = {
  vouches: [],
  addVouch: async () => {},
  deleteVouch: async () => {},
  getVouches: async () => {},
  loading: false,
  accessRequests: [],
  acceptRequest: async () => {},
  rejectRequest: async () => {},
  getAccessRequests: async () => {},
}

const VouchesContext = createContext(DEFAULT_CONTEXT)

interface Props {
  children: React.ReactNode
}

export function VouchesProvider({ children }: Props) {
  const [vouches, setVouches] = useState<Vouch[]>([])
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | undefined>()

  const { authAxios } = useAuthAxios()

  const addVouch = async (data: Vouchedto) => {
    setLoading(true)
    try {
      const response = await authAxios.post(`/vouches`, data)
      const vouch = response.data
      setVouches([...vouches, vouch])
    } catch (e: any) {
      setError(humanError(e))
    } finally {
      setLoading(false)
    }
  }

  const getAccessRequests = async () => {
    setLoading(true)
    try {
      const response = await authAxios.get(`/voucher/requests/list`)
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
      await authAxios.patch(`/voucher/requests/${id}`, { action })
    } catch (e: any) {
      setError(humanError(e))
    } finally {
      setLoading(false)
    }
  }

  const acceptRequest = async (id: string) => {
    await modifyRequest(id, "accept")
  }

  const rejectRequest = async (id: string) => {
    await modifyRequest(id, "reject")
  }

  const getVouches = async () => {
    setLoading(true)
    try {
      const response = await authAxios.get(`/vouches/list?limit=1000`)
      setVouches(response.data)
    } catch (e: any) {
      setError(humanError(e))
    } finally {
      setLoading(false)
    }
  }

  const deleteVouch = async (id: string) => {
    setLoading(true)
    try {
      await authAxios.delete(`/vouches/${id}`)
      setVouches(vouches.filter((e: any) => e.id !== id))
    } catch (e: any) {
      setError(humanError(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <VouchesContext.Provider
      value={{
        vouches,
        accessRequests,
        getAccessRequests,
        acceptRequest,
        rejectRequest,
        loading,
        getVouches,
        addVouch,
        deleteVouch,
      }}
    >
      {children}
    </VouchesContext.Provider>
  )
}

export function useVouches() {
  return useContext(VouchesContext)
}
