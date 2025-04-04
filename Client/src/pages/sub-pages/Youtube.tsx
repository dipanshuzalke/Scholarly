import { useContent } from '../../hooks/useContent';
import { Card } from '../../components/Card';
import { YoutubeIcon } from 'lucide-react'; // Swap with your custom icon if needed

export const YoutubePage = () => {
  const { contents, refresh } = useContent("youtube");

  if (!contents || contents.length === 0) {
   return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
    <YoutubeIcon className="w-12 h-12 text-red-500 mb-4" />
    <h2 className="text-xl font-semibold text-gray-700 mb-2">No Videos Saved</h2>
    <p className="text-gray-500 mb-6 max-w-sm">
      You haven’t added any YouTube content yet. Save insightful videos, podcasts, or lectures to come back to later.
    </p>
  </div>
   )
  }

  return (
    <div className="px-4 py-6">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">📺 YouTube</h1>
    <p className="text-gray-600 mb-6">
      Keep track of your favorite YouTube videos, lectures, or content you want to revisit.
    </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {contents
          .filter(({ type }) => type === "youtube") // ✅ Ensure only notes are displayed
          .map(({ _id, type, link, title, description }) => (
            <Card key={_id} contentId={_id} type={type} link={link} title={title} description={description} onDelete={refresh} />
          ))}
      </div>
    </div>
  );
};
