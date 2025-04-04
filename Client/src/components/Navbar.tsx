import { Button } from '../components/Button' // Importing the Button component
// import { Card } from "../components/Card" // Importing the Card component
import { CreateContentModal } from '../components/CreateContentModal' // Importing the modal to create content
import { PlusIcon } from '../icons/PlusIcon' // Importing Plus icon for the 'Add content' button
import { ShareIcon } from '../icons/ShareIcon' // Importing Share icon for the 'Share brain' button
// import { Card } from '../components/Card'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useEffect, useState } from 'react' // Importing React hooks to manage state and side effects
import { useContent } from '../hooks/useContent' // Importing custom hook to manage content

export function Navbar () {
  const [modalOpen, setModalOpen] = useState(false)
  const { refresh } = useContent()

  useEffect(() => {
    refresh()
  }, [modalOpen])

  return (
    <div className="flex flex-col w-full">
      {/* CreateContentModal for adding new content */}
      <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Top action bar */}
      <div className="w-full bg-gray-50 px-6 py-4 flex justify-end items-center gap-3">
      <Button
          onClick={async () => {
            const response = await axios.post(
              `${BACKEND_URL}/api/v1/brain/share`,
              { share: true },
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              }
            );
            const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
            alert(shareUrl);
          }}
          variant="secondary"
          text="Share Brain"
          startIcon={<ShareIcon size='lg' />}
        />
        <Button
          onClick={() => setModalOpen(true)}
          variant="primary"
          text="Add Content"
          startIcon={<PlusIcon size='lg' />}
        />
      </div>
    </div>
  );
}
