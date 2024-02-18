"use client"

import Image from "next/image"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import RequestInvite from "@/components/core/RequestInvite"
import { Icons } from "@/components/icons"

export default function IndexPage() {
  const { isSignedIn, user, isLoaded } = useUser()
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-row gap-8">
        <div className="basis-1/2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            {siteConfig.description}
          </h1>
          <p className="max-w-[700px] text-lg my-2 text-muted-foreground">
            {siteConfig.slogan}
          </p>
          <div className="my-4">
            {siteConfig.checklistItems.map((item, index) => (
              <div className="py-2 text-xl" key={index}>
                <span className="flex">
                  <Icons.check className="mx-2 size-6" /> {item}.
                </span>
              </div>
            ))}
          </div>
          <div className="py-4">
            {!isSignedIn && (
              <Link href="/sign-in">
                <Button className={buttonVariants({ variant: "default" })}>
                  {/* Get Started */}
                  Coming Soon
                </Button>
              </Link>
            )}
            {isSignedIn && (
              <Link href="/profile">
                <Button className={buttonVariants({ variant: "default" })}>
                  Go to Profile
                </Button>
              </Link>
            )}
          </div>
          {/* <div className="py-4">
            <RequestInvite />
          </div> */}
        </div>
        {/* <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: "outline" })}
        >
          GitHub
        </Link> */}

        <div className="basis-1/2 justify-center">
          <Image
            src="/static/hero.png"
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt="hero"
          />
        </div>
      </div>
      <Toaster />
    </section>
  )
}
