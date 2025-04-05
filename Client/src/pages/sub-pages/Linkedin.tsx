import { useContent } from '../../hooks/useContent';
import { Card } from '../../components/Card';
import { LinkedinIcon } from 'lucide-react'; // Or your custom Linkedin icon

export const LinkedinPage = () => {
  const { contents, refresh } = useContent("linkedin");

  if (!contents || contents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
        <LinkedinIcon className="w-12 h-12 text-blue-600 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">No LinkedIn Content Yet</h2>
        <p className="text-gray-500 mb-6 max-w-sm">
          You haven’t saved any LinkedIn posts or articles yet. Use this space to keep track of professional insights and career-related content.
        </p>
      </div>
    )
  }

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">💼 LinkedIn</h1>
      <p className="text-gray-600 mb-6">
        Save valuable career content, posts, and insights from LinkedIn to grow your professional knowledge.
      </p>

      <div className="w-full h-full flex items-start gap-6 flex-wrap">
        {contents
          .filter(({ type }) => type === "linkedin") // ✅ Ensure only notes are displayed
          .map(({ _id, type, link, title, description }) => (
            <Card key={_id} contentId={_id} type={type} link={link} title={title} description={description} onDelete={refresh} />
          ))}
      </div>
    </div>
  );
};
