import Link from "next/link"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"

function ConnectButton({
  buttonType = "submit",
}: {
  buttonType?: "submit" | "reset" | "button" | undefined
}) {
  return (
    <div className="connect-button">
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton
          //  redirect on logout
          afterSignOutUrl="/"
        />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <div>
          <Button style={{ display: "block" }} type={buttonType}>
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </div>
      </SignedOut>
    </div>
  )
}

export default ConnectButton
