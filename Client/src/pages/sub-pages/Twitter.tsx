import { useContent } from '../../hooks/useContent';
import { Card } from '../../components/Card';
import { TwitterIcon } from 'lucide-react'; // You can swap with your custom Twitter icon

export const TwitterPage = () => {
  const { contents, refresh } = useContent("twitter");

  if (!contents || contents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
        <TwitterIcon className="w-12 h-12 text-blue-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">No Tweets Saved</h2>
        <p className="text-gray-500 mb-6 max-w-sm">
          You haven’t added any tweets yet. Start saving interesting threads, quotes, or ideas from Twitter.
        </p>
      </div>
    );
  }
  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">🐦 Twitter</h1>
      <p className="text-gray-600 mb-6">
        Curate and keep track of your favorite tweets, threads, or Twitter insights right here.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {contents
          .filter(({ type }) => type === "twitter") // ✅ Ensure only notes are displayed
          .map(({ _id, type, link, title, description }) => (
            <Card key={_id} contentId={_id} type={type} link={link} title={title} description={description} onDelete={refresh} />
          ))}
      </div>
    </div>
  );
};

  