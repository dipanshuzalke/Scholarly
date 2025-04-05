import { LogOutIcon } from 'lucide-react'
import { GithubIcon } from '../icons/GithubIcon'
import { LinkedinIcon } from '../icons/LinkedinIcon'
import { Logo } from '../icons/Logo'
import { NotesIcon } from '../icons/NotesIcon'
import { OtherIcon } from '../icons/OtherIcon'
import { TwitterIcon } from '../icons/TwitterIcon'
import { YoutubeIcon } from '../icons/YoutubeIcon'
import { SidebarItem } from './SidebarItem'
import { Link } from 'react-router-dom'

export function Sidebar() {
  return (
    <div className="h-screen w-16 md:w-72 fixed top-0 left-0 bg-white border-r border-gray-200 shadow-sm flex flex-col items-center md:items-start p-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-6">
        <div className="text-purple-600">
          <Logo />
        </div>
        <span className="hidden md:block text-2xl font-bold text-gray-800">
          SECOND BRAIN
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col justify-between h-full w-full">
        {/* Links */}
        <div className="space-y-2 w-full">
          <Link to="/notes">
            <SidebarItem text="Notes" icon={<NotesIcon />} iconOnly />
          </Link>
          <Link to="/twitter">
            <SidebarItem text="Tweets" icon={<TwitterIcon />} iconOnly />
          </Link>
          <Link to="/youtube">
            <SidebarItem text="Videos" icon={<YoutubeIcon />} iconOnly />
          </Link>
          <Link to="/linkedin">
            <SidebarItem text="Posts" icon={<LinkedinIcon />} iconOnly />
          </Link>
          <Link to="/github">
            <SidebarItem text="Repos" icon={<GithubIcon />} iconOnly />
          </Link>
          <Link to="/other">
            <SidebarItem text="Other" icon={<OtherIcon />} iconOnly />
          </Link>
        </div>

        {/* Logout */}
        <div className="pt-4 w-full">
          <button
            onClick={() => {
              localStorage.removeItem('token')
              window.location.href = '/signin'
            }}
            className="w-full text-left"
          >
            <SidebarItem text="Logout" icon={<LogOutIcon />} iconOnly />
          </button>
        </div>
      </nav>
    </div>
  )
}
