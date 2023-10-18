import { PlusCircleIcon } from "lucide-react"
import { Button } from "./ui/Button"

interface Props {}

const ActionsButtons: React.FC<Props> = (props) => {
  return (
    <div className="flex items-center gap-3">
        <Button actionClick={() => {}}><PlusCircleIcon className="h-5 w-5 mr-1" /> Ajouter</Button>
        <Button actionClick={() => {}}>Test</Button>
    </div>
  )
}

export default ActionsButtons