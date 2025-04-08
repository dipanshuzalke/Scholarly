import { useContent } from "../../hooks/useContent";
import { Card } from "../../components/Card";
import { FolderIcon } from "lucide-react"; // Or use your custom OtherIcon

export const OtherPage = () => {
  const { contents } = useContent("other");

  if (!contents || contents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
        <FolderIcon className="w-12 h-12 text-gray-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          No Other Content Yet
        </h2>
        <p className="text-gray-500 mb-6 max-w-sm">
          You haven’t added any miscellaneous content yet. Save articles, PDFs,
          tools, or anything that doesn’t fit into a category.
        </p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">📁 Other</h1>
      <p className="text-gray-600 mb-6">
        Catch-all space for content that doesn’t belong to a specific platform.
      </p>

      <div className="w-full h-full flex items-start gap-6 flex-wrap">
        {contents
          .filter(({ type }) => type === "other") // ✅ Ensure only notes are displayed
          .map(({ _id, type, link, title, description }) => (
            <Card
              key={_id}
              type={type}
              link={link}
              title={title}
              description={description}
            />
          ))}
      </div>
    </>
  );
};
