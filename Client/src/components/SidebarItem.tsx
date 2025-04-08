import { ReactElement } from "react";

interface SidebarItemProps {
  text: string;
  icon: ReactElement;
  iconOnly?: boolean; // Optional prop to hide text on small screens
}

export function SidebarItem({ text, icon, iconOnly }: SidebarItemProps) {
  return (
    <div className="flex items-center text-white py-2 cursor-pointer hover:bg-gray-200 hover:text-black rounded max-w-48 pl-4 transition-all duration-200">
      {/* Icon section */}
      <div className="pr-2">{icon}</div>

      {/* Text section - hidden on small screens if iconOnly is true */}
      <div className={iconOnly ? "hidden md:block" : ""}>{text}</div>
    </div>
  );
}
