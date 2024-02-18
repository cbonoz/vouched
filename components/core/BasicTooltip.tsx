import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface Props {
  children: React.ReactNode
  text: string
}

const BasicTooltip = ({ children, text }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className="flex-center max-w-[300px] align-center justify-center">
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default BasicTooltip
