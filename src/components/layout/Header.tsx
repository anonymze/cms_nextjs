import ActionsButtons from "../ActionsButtons"

interface Props {
    title: string
}

const Header: React.FC<Props> = ({ title }) => {
  return (
    <header className="flex justify-between items-center pb-lg">
        <h1>{ title }</h1>
        <ActionsButtons />
    </header>
  )
}

export default Header