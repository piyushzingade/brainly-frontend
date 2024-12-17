import { RiLinksFill } from "react-icons/ri";
import toast from "react-hot-toast";
import { useEffect } from "react";

interface CardProps {
  title: string;
  link: string;
  type: string; // youtube, twitter, music, link
  desc: string;
  tags: { title: string }[];
}

// Helper Function: Extract YouTube Video ID
const getYouTubeVideoId = (url: string): string | null => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// YouTube Embed Component
function YouTubeEmbed({ url }: { url: string }) {
  const videoId = getYouTubeVideoId(url);

  if (!videoId) {
    return (
      <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
        <p className="text-red-500">Invalid YouTube URL</p>
      </div>
    );
  }

  // Embed URL with autoplay enabled
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`;

  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src={embedUrl}
        title="YouTube Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded-md"
      ></iframe>
    </div>
  );
}

export function PublishedCard(props: CardProps) {
  // Copy link to clipboard
  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(props.link)
      .then(() => {
        toast.success("Link Copied!", {
          duration: 3000,
          position: "top-center",
          style: { background: "#363636", color: "#fff" },
        });
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  // Dynamically load Twitter widget script
  useEffect(() => {
    if (props.type.toLowerCase() === "twitter") {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [props.type]);

  return (
    <div className="rounded-md border text-white border-gray-500 p-2 shadow-md max-w-80">
      {/* Card Header */}
      <div className="flex justify-between items-center mt-2">
        <div className="flex gap-2 text-md items-center">
          <div className="h-2 w-2 rounded-full bg-red-300"></div>
          <p className="font-bold">{props.title}</p>
        </div>
        <span
          onClick={handleCopyToClipboard}
          className="cursor-pointer hover:bg-orange-600 rounded-full p-2 text-[20px]"
        >
          <RiLinksFill />
        </span>
      </div>

      {/* Card Body */}
      <div className="rounded-md pt-3">
        {/* YouTube Embed */}
        {props.type.toLowerCase() === "youtube" && (
          <YouTubeEmbed url={props.link} />
        )}

        {/* Twitter Embed */}
        {props.type.toLowerCase() === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={props.link}></a>
          </blockquote>
        )}

        {/* Music Placeholder */}
        {props.type.toLowerCase() === "music" && (
          <img
            className="rounded-md w-full"
            src="https://cdn.logojoy.com/wp-content/uploads/20240517160549/05-16-24_Spotify-Logo-Evolution_HEADER.jpg"
            alt="Music Preview"
          />
        )}

        {/* Link Placeholder */}
        {props.type.toLowerCase() === "link" && (
          <img
            className="rounded-md w-full"
            src="https://www.oxfordwebstudio.com/user/pages/06.da-li-znate/sta-je-link/sta-je-link.jpg"
            alt="Link Preview"
          />
        )}

        {/* Description and Tags */}
        <div className="flex flex-col mt-4">
          <span className="bg-blue-500 w-fit px-1 rounded-lg">
            {props.type.charAt(0).toUpperCase() + props.type.slice(1)}
          </span>
          <p className="mt-2 text-gray-300">{props.desc}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {props.tags.map((tag, index) => (
              <span key={index} className="bg-orange-600 px-1 rounded-sm">
                #{tag.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
