import Link from "next/link"
import { SignIn, SignUp } from "@clerk/nextjs"

import { siteConfig } from "@/config/site"

const SignInPage = () => {
  return (
    <div>
      <div className="center-content my-12 flex flex-row justify-center">
        <SignIn afterSignInUrl={siteConfig.defaultHome} signUpUrl="/sign-up" />
      </div>
      <div className="text-md my-4 flex flex-row content-center justify-center">
        {/* No account? Sign up&nbsp;
        <Link className="text-blue-500" href="/sign-up">
          here
        </Link>
        . */}
      </div>
    </div>
  )
}

export default SignInPage
