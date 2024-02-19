import Link from "next/link"

//edge
export const runtime = "edge"

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested page</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}
