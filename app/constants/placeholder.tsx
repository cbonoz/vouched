import { User } from "@clerk/clerk-js/dist/types/core/resources/User"

import { Endorsement } from "@/lib/types"

export const createDemoProfile = (
  handle: string
): { user: any; endorsements: Endorsement[] } => {
  const d = new Date()
  return {
    user: {
      id: "123",
      handle,
      username: "demo",
      firstName: "Demo",
      lastName: "User",
    },
    endorsements: [],
  }
}
