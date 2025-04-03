import { ShareIcon } from '../icons/ShareIcon'
import { useEffect } from 'react'

interface CardProps {
  title: string // Title of the card, e.g., video, tweet, or LinkedIn post
  link: string // Link to the content (YouTube, Twitter, or LinkedIn)
  type: 'twitter' | 'youtube' | 'linkedin' // Type of the content
}

// Declare `twttr` to avoid TypeScript errors
declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: () => void
      }
    }
    IN?: {
      parse: () => void
    }
  }
}

export function Card ({ title, link, type }: CardProps) {
  useEffect(() => {
    if (type === 'twitter') {
      // Ensure Twitter's script is loaded
      if (window.twttr) {
        window.twttr.widgets.load()
      } else {
        const script = document.createElement('script')
        script.src = 'https://platform.twitter.com/widgets.js'
        script.async = true
        script.onload = () => window.twttr?.widgets.load()
        document.body.appendChild(script)
      }
    } else if (type === 'linkedin') {
      if (window.IN) {
        window.IN.parse()
      } else {
        const script = document.createElement('script')
        script.src = 'https://platform.linkedin.com/in.js'
        script.async = true
        script.onload = () => window.IN?.parse()
        document.body.appendChild(script)
      }
    }
  }, [type, link])

  return (
    <div>
      <div className='p-4 bg-white rounded-md border-gray-200 max-w-72 border min-h-48 min-w-72'>
        {/* Header Section */}
        <div className='flex justify-between'>
          <div className='flex items-center text-md'>
            <div className='text-gray-500 pr-2'>
              <ShareIcon />
            </div>
            {title}
          </div>
          <div className='flex items-center'>
            <div className='pr-2 text-gray-500'>
              <a href={link} target='_blank' rel='noopener noreferrer'>
                <ShareIcon />
              </a>
            </div>
            <div className='text-gray-500'>
              <ShareIcon />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className='pt-4'>
          {/* YouTube Embed */}
          {type === 'youtube' && (
            <iframe
              className='w-full'
              src={link.replace('watch', 'embed').replace('?v=', '/')}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
            ></iframe>
          )}

          {/* Twitter Embed */}
          {type === 'twitter' && (
            <blockquote className='twitter-tweet'>
              <a href={link.replace('x.com', 'twitter.com')}>{title}</a>
            </blockquote>
          )}

          {type === 'linkedin' && (
            <div className='flex flex-col items-center text-center p-4 border border-gray-300 rounded-xl shadow-md bg-white max-w-md'>
              {/* Error Message */}
              <p className='text-gray-700 font-medium flex items-center gap-2'>
                ⚠️ <span>LinkedIn does not allow direct embedding.</span>
              </p>

              {/* Screenshot Preview */}
              <div className='w-full mt-3'>
                <img
                  src={`https://api.screenshotone.com/take?url=${encodeURIComponent(
                    link
                  )}&access_key=YOUR_ACCESS_KEY`}
                  alt='LinkedIn Post Preview'
                  className='w-full rounded-lg shadow-md hover:opacity-90 transition-opacity duration-300'
                />
              </div>

              {/* View on LinkedIn Button */}
              <a
                href={link}
                target='_blank'
                rel='noopener noreferrer'
                className='mt-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300'
              >
                🔗 View on LinkedIn
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
