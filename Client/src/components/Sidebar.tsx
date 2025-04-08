import { LogOutIcon } from "lucide-react";
import { GithubIcon } from "../icons/GithubIcon";
import { LinkedinIcon } from "../icons/LinkedinIcon";
import Logo from "../assests/book-cover.jpg";
import { NotesIcon } from "../icons/NotesIcon";
import { OtherIcon } from "../icons/OtherIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <div className="h-screen w-16 md:w-72 fixed top-0 left-0 bg-[#000046] border-r border-gray-200 shadow-sm flex flex-col px-2 md:px-4 items-center">
      {/* Logo */}
      <div className="flex items-center py-4 md:pr-4">
        <img
          src={Logo}
          alt="Second Brain Logo"
          className="h-10 w-10 md:h-12 md:w-12"
        />
        <h1 className="text-white text-xl md:text-2xl font-bold ml-2 hidden md:block">
          Second Brain
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col justify-between flex-1 w-full pb-4">
        {/* Links */}
        <div className="space-y-1 w-full text-white text-sm md:text-base">
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
        <div className="pt-4 w-full text-white">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/signin";
            }}
            className="w-full text-left hover:bg-[#1a1a50] rounded-md transition-all"
          >
            <SidebarItem text="Logout" icon={<LogOutIcon />} iconOnly />
          </button>
        </div>
      </nav>
    </div>
  );
}
