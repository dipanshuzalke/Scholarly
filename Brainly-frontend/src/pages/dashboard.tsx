import { useEffect, useState } from 'react' // Importing React hooks to manage state and side effects
import { Button } from '../components/Button' // Importing the Button component
// import { Card } from "../components/Card" // Importing the Card component
import { CreateContentModal } from '../components/CreateContentModal' // Importing the modal to create content
import { PlusIcon } from '../icons/PlusIcon' // Importing Plus icon for the 'Add content' button
import { ShareIcon } from '../icons/ShareIcon' // Importing Share icon for the 'Share brain' button
import { Sidebar } from '../components/Sidebar' // Importing Sidebar component for navigation
import { useContent } from '../hooks/useContent'
import { Card } from '../components/Card'
import axios from 'axios'
import { BACKEND_URL } from '../config'

// Dashboard component that renders the main page
export function Dashboard () {
  // State to manage the modal visibility
  const [modalOpen, setModalOpen] = useState(false)
  const { contents, refresh } = useContent()

  useEffect(() => {
    refresh()
  }, [modalOpen])

  return (
    <div>
      <Sidebar /> {/* Sidebar component for navigation */}
      <div className='p-4 ml-72 min-h-screen bg-gray-100 border-2'>
        {/* CreateContentModal component for adding new content, controlled by modalOpen state */}
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />

        <div className='flex justify-end gap-4 mb-4'>
          <Button
            onClick={() => setModalOpen(true)}
            variant='primary'
            text='Add Content'
            startIcon={<PlusIcon />}
          />{' '}
          {/* Button to open the modal for adding content */}
          <Button
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                {
                  share: true
                },
                {
                  headers: {
                    "Authorization": localStorage.getItem("token") // Adding the token to the request headers for authentication
                  }
                }
              )
              const shareUrl = `http://localhost:5173/share/${response.data.hash}` // Constructing the shareable URL
              alert(shareUrl) // Alerting the user with the shareable URL
            }}
            variant='primary'
            text='Share Brain'
            startIcon={<ShareIcon />}
          />{' '}
          {/* Button to share the brain */}
        </div>

        <div className='flex gap-4 flex-wrap'>
          {/* Rendering the content cards dynamically from the 'contents' array */}
          {contents.map(({ type, link, title }) => (
            <Card type={type} link={link} title={title} />
          ))}
        </div>
      </div>
    </div>
  )
}
