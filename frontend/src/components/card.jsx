import { ShareIcon } from "../icons/share";
import React from "react";
import { parseEmbedLink } from "../utils/parseEmbedLink";
import { Tweet } from "react-tweet";

/**
 * Card component
 * Props:
 *  - title: string | ReactNode
 *  - link: string (YouTube embed URL or Twitter embed HTML)
 *  - type: 'youtube' | 'twitter'
 *  - className: string (optional)
 */
export function Card({
  title = "Project ideas",
  url = "",
  link: linkProp = "",
  type: typeProp = "",
  className = "",
  ...rest
}) {
  // If url is provided, auto-detect type/link
  let type = typeProp, link = linkProp, tweetId = null;
  if (url) {
    const parsed = parseEmbedLink(url);
    type = parsed.type;
    link = parsed.link;
    // If X/Twitter, extract tweet ID for react-tweet
    if (type === "twitter") {
      const match = url.match(/status\/(\d+)/);
      if (match) tweetId = match[1];
    }
  }

  return (
    <div className={`p-3 bg-white rounded-lg border border-gray-100 shadow max-w-md w-full mx-auto ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        {/* Left group */}
        <div className="flex items-center gap-2">
          <ShareIcon className="w-5 h-5 text-gray-400 align-middle" />
          <span className="text-base font-semibold leading-tight tracking-tight text-gray-700">
            {title}
          </span>
        </div>
        {/* Right actions (placeholder) */}
        <div className="flex items-center gap-2 text-gray-300">
          <ShareIcon className="w-4 h-4" />
          <ShareIcon className="w-4 h-4" />
        </div>
      </div>

      {/* Content area: YouTube or Twitter embed */}
      <div className="pt-1">
        {type === "youtube" && link && (
          <iframe
            className="w-full aspect-video rounded"
            src={link}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}
        {type === "twitter" && tweetId && (
          <Tweet id={tweetId} />
        )}
        {type === "unknown" && link && (
          <a href={link} className="text-blue-600 underline break-all text-xs" target="_blank" rel="noopener noreferrer">{link}</a>
        )}
      </div>
    </div>
  );
}
