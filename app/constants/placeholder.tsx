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
    endorsements: [
      {
        id: 1,
        handle: "endorser",
        avatar: "https://i.pravatar.cc/40",
        name: "John Smith",
        relationship: "Colleague",
        message: "This is a demo endorsement.",
        endorserId: 123,
        approvedAt: d,
        createdAt: d,
      },
      {
        id: 2,
        handle: "endorser",
        endorserId: 123,
        avatar: "https://i.pravatar.cc/40",
        name: "John Smith",
        relationship: "Colleague",
        message: "This is a demo endorsement.",
        approvedAt: undefined,
        createdAt: d,
      },
    ],
  }
}
