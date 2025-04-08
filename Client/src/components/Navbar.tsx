import { Button } from "../components/Button"; // Importing the Button component
import { CreateContentModal } from "../components/CreateContentModal"; // Importing the modal to create content
import { PlusIcon } from "../icons/PlusIcon"; // Importing Plus icon for the 'Add content' button
import { ShareIcon } from "../icons/ShareIcon"; // Importing Share icon for the 'Share brain' button
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react"; // Importing React hooks to manage state and side effects
import { useContent } from "../hooks/useContent"; // Importing custom hook to manage content
import toast from "react-hot-toast";

export function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);
  const { refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  return (
    <div className="flex flex-col w-full">
      {/* CreateContentModal for adding new content */}
      <CreateContentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {/* Top action bar */}
      <div className="w-full bg-[#000046] px-2 py-4 flex justify-end items-center gap-3 md:px-6">
        <Button
          onClick={async () => {
            try {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                { share: true },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              );

              const shareUrl = `${window.location.origin}/share/${response.data.hash}`;

              await navigator.clipboard.writeText(shareUrl);

              toast.success("🔗 Share link copied to clipboard!", {
                duration: 3000,
              });
            } catch (err) {
              console.error(err);
              toast.error("❌ Failed to create share link");
            }
          }}
          variant="secondary"
          text="Share Brain"
          startIcon={<ShareIcon size="lg" />}
        />
        <Button
          onClick={() => setModalOpen(true)}
          variant="primary"
          text="Add Content"
          startIcon={<PlusIcon size="lg" />}
        />
      </div>
    </div>
  );
}
