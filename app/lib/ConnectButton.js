import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

function ConnectButton({ buttonType = 'primary' }) {

  return <div className="connect-button">
    <SignedIn>
      {/* Mount the UserButton component */}
      <UserButton />
    </SignedIn>
    <SignedOut>
      {/* Signed out users get sign in button */}
      <SignInButton />
    </SignedOut>
  </div>

}

export default ConnectButton