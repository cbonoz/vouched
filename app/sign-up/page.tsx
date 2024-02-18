import { SignUp } from "@clerk/nextjs"

import { siteConfig } from "@/config/site"

const SignUpPage = () => {
  return (
    <div className="center-content my-12 flex flex-row justify-center">
      <SignUp afterSignInUrl={siteConfig.defaultHome} signInUrl="/sign-in" />
    </div>
  )
}

export default SignUpPage
