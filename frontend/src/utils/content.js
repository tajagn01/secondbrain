export function deriveTypeFromLink(link) {
  if (!link) return 'link';

  try {
    const url = new URL(link);
    const hostname = url.hostname.toLowerCase();

    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      return 'youtube';
    }
    if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
      return 'twitter';
    }

    return 'link';
  } catch {
    return 'link';
  }
}

export function getHostname(link) {
  try {
    return new URL(link).hostname.replace(/^www\./i, '');
  } catch {
    return '';
  }
}


