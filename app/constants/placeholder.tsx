import { User } from "@clerk/clerk-js/dist/types/core/resources/User"

import { Vouch } from "@/lib/types"

export const createDemoProfile = (
  handle: string
): { user: any; endorsements: Vouch[] } => {
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
