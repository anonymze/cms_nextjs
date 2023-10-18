import type { PropsWithChildren } from "react"

type Props = PropsWithChildren & {
    actionClick: () => void
}

const Button: React.FC<Props> = ({ children, actionClick }) => {
  return (
    <button onClick={actionClick} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
        {children}
    </button>
  )
}

export { Button }