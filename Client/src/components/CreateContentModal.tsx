import { useEffect, useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { toast } from "react-hot-toast";

// ✅ Custom icon imports
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { LinkedinIcon } from "../icons/LinkedinIcon";
import { GithubIcon } from "../icons/GithubIcon";
import { NotesIcon } from "../icons/NotesIcon";
import { OtherIcon } from "../icons/OtherIcon";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Linkedin = "linkedin",
  Github = "github",
  Notes = "notes",
  Other = "other"
}

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

// ✅ Updated icon list using custom icons
const typeOptions: { type: ContentType; icon: JSX.Element; label: string }[] = [
  { type: ContentType.Youtube, icon: <YoutubeIcon />, label: "YouTube" },
  { type: ContentType.Twitter, icon: <TwitterIcon  />, label: "Twitter" },
  { type: ContentType.Linkedin, icon: <LinkedinIcon  />, label: "LinkedIn" },
  { type: ContentType.Github, icon: <GithubIcon  />, label: "GitHub" },
  { type: ContentType.Notes, icon: <NotesIcon  />, label: "Notes" },
  { type: ContentType.Other, icon: <OtherIcon  />, label: "Other" },
];

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const description = descriptionRef.current?.value;
  
    try {
      await axios.post(`${BACKEND_URL}/api/v1/content`, {
        title,
        description,
        link,
        type
      }, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });
  
      toast.success('Content added!', {
        duration: 3000
      });
  
      onClose();
    } catch (err) {
      console.error("Error creating content:", err);
      toast.error('❌ Failed to add content. Try again.');
    }
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-40" />
          <div
            ref={modalRef}
            className="relative z-50 bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl border border-gray-200"
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold text-gray-800">Add New Content</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <CrossIcon />
              </button>
            </div>

            <div className="space-y-4">
              <Input reference={titleRef} placeholder="Enter title" />
              <Input reference={descriptionRef} placeholder="Enter description" multiline />
              <Input reference={linkRef} placeholder="Enter link" />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {typeOptions.map(({ type: ct, icon, label }) => (
                    <button
                      key={ct}
                      onClick={() => setType(ct)}
                      className={`flex flex-col items-center justify-center border rounded-lg p-3 text-xs font-medium hover:bg-gray-100 transition ${
                        type === ct ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-300 text-gray-600"
                      }`}
                    >
                      {icon}
                      <span className="mt-1">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 text-center flex justify-center">
              <Button onClick={addContent} variant="primary" text="Add Content" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
