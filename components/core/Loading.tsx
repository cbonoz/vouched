import Image from "next/image"
import { useTheme } from "next-themes"

const Loading = () => {
  const { theme } = useTheme()

  const logo = `/logo-${theme || "light"}.png`

  // centered with large margin
  return (
    <div className="flex flex-col items-center justify-center space-y-1 mt-8">
      <Image src={logo} alt="logo" width={100} height={100} />
      <div className="text-med">Loading...</div>
    </div>
  )
}

export default Loading
