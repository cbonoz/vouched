"use client"

import Link from "next/link"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"

import { Button } from "@/components/ui/button"

function ConnectButton({
  buttonType = "submit",
}: {
  buttonType?: "submit" | "reset" | "button" | undefined
}) {
  const session = useSession()
  const supabase = useSupabaseClient()

  if (session) {
    return (
      <Button
        onClick={async () => {
          await supabase.auth.signOut()
          window.location.href = "/"
        }}
      >
        Sign Out
      </Button>
    )
  }

  return (
    <Button type={buttonType}>
      <Link href="/sign-in">Sign in</Link>
    </Button>
  )
}

export default ConnectButton
