import { cn } from '@/utils/libs/utils'
import Link from "next/link"
import { mainNavigation, optionsNavigation } from './navLinks';

const SideNavbar: React.FC = () => {
  return (
    <div className="flex grow flex-col gap-y-5 h-full overflow-y-auto">
      <div className="flex h-16 shrink-0 items-center">
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
          alt="Your Company"
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <div className="text-xs font-semibold leading-6 text-gray-400">Contenu</div>
            <ul role="list" className="mt-2 space-y-1">
              {mainNavigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    )}
                  >
                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    {item.name}
                    {item.count ? (
                      <span
                        className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-900 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-gray-700"
                        aria-hidden="true"
                      >
                        {item.count}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <div className="text-xs font-semibold leading-6 text-gray-400">Avancées</div>
            <ul role="list" className="mt-2 space-y-1">
              {optionsNavigation.map((team) => (
                <li key={team.name}>
                  <Link
                    href={team.href}
                    className={cn(
                      team.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    )}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                      {team.initial}
                    </span>
                    <span className="truncate">{team.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className='mt-auto'>
            <Link
              href="/dashboard"
              className="flex items-center gap-x-4 py-3 text-sm font-semibold leading-6 text-white"

            >
              <img
                className="h-8 w-8 rounded-full bg-gray-800"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">Tom Cook</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default SideNavbar;
