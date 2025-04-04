import { useContent } from '../../hooks/useContent';
import { Card } from '../../components/Card';
import { GithubIcon } from 'lucide-react'; // Or use your custom Github icon

export const GithubPage = () => {
  const { contents, refresh } = useContent("github");

  if (!contents || contents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
    <GithubIcon className="w-12 h-12 text-gray-800 mb-4" />
    <h2 className="text-xl font-semibold text-gray-700 mb-2">No GitHub Content Yet</h2>
    <p className="text-gray-500 mb-6 max-w-sm">
      You haven’t saved any GitHub repos or gists yet. Start collecting cool projects, code snippets, or libraries worth revisiting.
    </p>
  </div>
    )
  }

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">🐙 GitHub</h1>
      <p className="text-gray-600 mb-6">
        Organize your saved repositories, snippets, and useful developer tools from GitHub here.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {contents
          .filter(({ type }) => type === "github") // ✅ Ensure only notes are displayed
          .map(({ _id, type, link, title, description }) => (
            <Card key={_id} contentId={_id} type={type} link={link} title={title} description={description} onDelete={refresh}/>
          ))}
      </div>
    </div>
  );
};
