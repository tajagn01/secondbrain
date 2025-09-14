// Utility to detect and convert YouTube or X (Twitter) links to embed-ready props
export function parseEmbedLink(url) {
  // --- YouTube ---
  const ytMatch = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/
  );
  if (ytMatch) {
    return {
      type: "youtube",
      link: `https://www.youtube.com/embed/${ytMatch[1]}`,
    };
  }

  // --- X (Twitter) ---
  const xMatch = url.match(/(?:twitter\.com|x\.com)\/([\w]+)\/status\/(\d+)/);
  if (xMatch) {
    const tweetUrl = `https://x.com/${xMatch[1]}/status/${xMatch[2]}`;
    return {
      type: "twitter",
      // Must be blockquote for widgets.js to transform
      link: `<blockquote class="twitter-tweet"><a href="${tweetUrl}"></a></blockquote>`,
    };
  }

  // --- Fallback ---
  return { type: "unknown", link: url };
}
