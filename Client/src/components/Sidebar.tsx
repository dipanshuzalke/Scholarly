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
    <div className="h-screen w-72 fixed top-0 left-0 bg-white border-r border-gray-200 shadow-sm p-6 flex flex-col">
      {/* Logo and Branding */}
      <div className="flex items-center text-2xl font-bold text-gray-800">
        <div className="pr-2 text-purple-600">
          <Logo />
        </div>
        SECOND BRAIN
      </div>

      {/* Navigation */}
      <nav className="mt-10 flex flex-col gap-2">
        <Link to="/notes">
          <SidebarItem text="Notes" icon={<NotesIcon />} />
        </Link>
        <Link to="/twitter">
          <SidebarItem text="Tweets" icon={<TwitterIcon />} />
        </Link>
        <Link to="/youtube">
          <SidebarItem text="Videos" icon={<YoutubeIcon />} />
        </Link>
        <Link to="/linkedin">
          <SidebarItem text="Posts" icon={<LinkedinIcon />} />
        </Link>
        <Link to="/github">
          <SidebarItem text="Repos" icon={<GithubIcon />} />
        </Link>
        <Link to="/other">
          <SidebarItem text="Other" icon={<OtherIcon />} />
        </Link>
      </nav>
    </div>
  );
}