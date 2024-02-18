"use client"

import path from "path"
import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import logo from "/static/favicon-16x16.png"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname()

  // is current url
  const isCurrentUrl = (href: string) => {
    console.log("pathname", pathname, "href", href)
    if (href === "/" || href === "/") {
      return pathname === "/" || pathname === ""
    }
    // check if href is prefix of pathname
    return pathname.startsWith(href)
  }

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Image alt="Vouched" src={logo} className="size-6" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  <span className={cn(isCurrentUrl(item.href) && "font-bold")}>
                    {item.title}
                  </span>
                </Link>
              )
          )}
          {pathname.startsWith("/profile/") && (
            <span>{pathname.split("/").pop()}</span>
          )}
        </nav>
      ) : null}
    </div>
  )
}
