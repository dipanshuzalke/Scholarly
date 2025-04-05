import { useContent } from '../../hooks/useContent';
import { Card } from '../../components/Card';
import { FileText } from 'lucide-react'; // Or your own icon

export const NotesPage = () => {
  const { contents, refresh } = useContent('notes');

  const filteredNotes = contents.filter(({ type }) => type === 'notes');

  if (!contents || filteredNotes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
        <FileText className="w-12 h-12 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">No Notes Yet</h2>
        <p className="text-gray-500 mb-6 max-w-sm">
          You haven’t added any notes yet. Start saving your thoughts, summaries, or resources here.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">📓 Notes</h1>
      <p className="text-gray-600 mb-6">
        You're notes, summaries, and resources all in one place. Use this space to jot down your thoughts, save important information, or summarize what you’ve learned.
      </p>
      <div className="w-full h-full flex items-start gap-6 flex-wrap">
        {filteredNotes.map(({ _id, type, link, title, description }) => (
          <Card
            key={_id}
            contentId={_id}
            type={type}
            link={link}
            title={title}
            description={description}
            onDelete={refresh}
          />
        ))}
      </div>
    </div>
  );
};
