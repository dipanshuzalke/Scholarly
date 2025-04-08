import { DeleteIcon } from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface CardProps {
  contentId: string;
  title: string;
  link: string;
  description?: string;
  type: "twitter" | "youtube" | "linkedin" | "github" | "notes" | "other";
  onDelete: () => void;
}

// Declare external script objects globally
declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: () => void;
      };
    };
    IN?: {
      parse: () => void;
    };
  }
}

export function Card({
  contentId,
  title,
  link,
  type,
  description,
  onDelete,
}: CardProps) {
  const [screenshotError, setScreenshotError] = useState(false);
  const [githubData, setGithubData] = useState<any>(null);

  useEffect(() => {
    if (type === "twitter") {
      if (window.twttr) {
        window.twttr.widgets.load();
      } else {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.onload = () => window.twttr?.widgets.load();
        document.body.appendChild(script);
      }
    } else if (type === "linkedin") {
      if (window.IN) {
        window.IN.parse();
      } else {
        const script = document.createElement("script");
        script.src = "https://platform.linkedin.com/in.js";
        script.async = true;
        script.onload = () => window.IN?.parse();
        document.body.appendChild(script);
      }
    } else if (type === "github") {
      fetchGitHubData(link);
    }
  }, [type, link]);

  // Fetch GitHub Data
  const fetchGitHubData = async (url: string) => {
    try {
      const path = new URL(url).pathname.split("/").slice(1, 3).join("/");
      const response = await fetch(`https://api.github.com/repos/${path}`);
      const data = await response.json();
      setGithubData(data);
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
    }
  };

  async function handleDelete() {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
        data: {
          contentId,
        },
      });
      onDelete(); // callback to refresh or update local state
    } catch (err) {
      console.error("Failed to delete content:", err);
    }
  }

  return (
    <div className="flex flex-col bg-white rounded-2xl border border-gray-200 shadow-md max-w-sm w-full p-4 min-h-[14rem] overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <span className="truncate max-w-[220px]">{title}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-500">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            <ShareIcon size="md" />
          </a>
          <button
            onClick={handleDelete}
            className="hover:text-red-500 transition"
          >
            <DeleteIcon />
          </button>
        </div>
      </div>

      {/* Description */}
      {description && type !== "notes" && (
        <p className="text-gray-600 text-sm mb-3">{description}</p>
      )}

      {/* Dynamic Content */}
      <div className="mt-auto space-y-4">
        {type === "youtube" && (
          <div className="rounded-lg overflow-hidden bg-gray-100 shadow">
            <iframe
              className="w-full h-48"
              src={`https://www.youtube.com/embed/${
                link.includes("youtu.be/")
                  ? link.split("youtu.be/")[1]
                  : link.split("v=")[1]?.split("&")[0]
              }`}
              title="YouTube Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-red-600 text-white py-2 text-sm font-semibold hover:bg-red-700"
            >
              🎬 View on YouTube
            </a>
          </div>
        )}

        {type === "twitter" && (
          <div>
            {/* Header */}
            <blockquote className="twitter-tweet max-h-60 rounded bg-gray-50 px-4 py-3 text-sm text-gray-800">
              <a
                href={link.replace("x.com", "twitter.com")}
                className="block hover:underline text-blue-600 font-medium break-words"
              >
                {title}
              </a>
            </blockquote>

            {/* View Button */}
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition"
            >
              🐦 View on Twitter
            </a>
          </div>
        )}

        {type === "linkedin" && (
          <div className="text-center border p-4 rounded-lg shadow bg-white">
            <p className="text-gray-700 font-medium flex items-center gap-2 justify-center mb-3">
              ⚠️ LinkedIn doesn't allow embeds
            </p>
            {!screenshotError ? (
              <img
                src={`https://api.screenshotone.com/take?url=${encodeURIComponent(
                  link
                )}&access_key=YOUR_ACCESS_KEY`}
                alt="LinkedIn Preview"
                className="rounded-lg shadow"
                onError={() => setScreenshotError(true)}
              />
            ) : (
              <div className="h-32 flex items-center justify-center bg-gray-100 rounded-lg">
                <span className="text-gray-500">⚠️ Preview not available</span>
              </div>
            )}
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              🔗 View on LinkedIn
            </a>
          </div>
        )}

        {type === "github" && githubData && (
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-800 text-base">
              {githubData.full_name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {githubData.description || "No description available"}
            </p>
            <div className="flex justify-between text-sm text-gray-700 mt-3">
              <span>⭐ {githubData.stargazers_count}</span>
              <span>🍴 {githubData.forks_count}</span>
            </div>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block text-center bg-black text-white py-2 rounded hover:bg-gray-900"
            >
              🔗 View on GitHub
            </a>
          </div>
        )}

        {type === "notes" && (
          <div>
            {description && (
              <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                {description.split("\n").map((line, idx) => {
                  const trimmed = line.trim();
                  const isBullet =
                    trimmed.startsWith("-") || trimmed.startsWith("•");
                  return (
                    <div key={idx} className="flex items-start gap-2 mb-1">
                      {isBullet ? (
                        <>
                          <span className="text-purple-500 mt-1.5">•</span>
                          <span>{trimmed.replace(/^[-•]\s*/, "")}</span>
                        </>
                      ) : (
                        <span>{trimmed}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Optional "Read More" Link */}
            {link && (
              <div className="text-right">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-purple-600 text-white text-sm px-4 py-2 rounded-md font-medium hover:bg-purple-700 transition"
                >
                  🔗 Read More
                </a>
              </div>
            )}
          </div>
        )}

        {type === "other" && (
          <div className="bg-white border border-gray-200 p-4 rounded-lg shadow">
            {/* <h3 className='text-base font-semibold text-gray-900'>{title}</h3> */}
            <p className="text-sm text-gray-600 mt-2">
              This content type is not recognized. Click below to view.
            </p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block bg-gray-500 text-white py-2 rounded hover:bg-gray-600 text-center"
            >
              🔗 View Content
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
