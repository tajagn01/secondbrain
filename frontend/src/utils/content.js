export function deriveTypeFromLink(link) {
\tif (!link) return 'link';
\ttry {
\t\tconst url = new URL(link);
\t\tconst host = url.host;
\t\tif (host.includes('youtube.com') || host.includes('youtu.be')) return 'youtube';
\t\tif (host.includes('twitter.com') || host.includes('x.com')) return 'twitter';
\t\treturn 'link';
\t} catch {
\t\treturn 'link';
\t}
}

export function getHostname(link) {
\ttry {
\t\treturn new URL(link).hostname.replace(/^www\./, '');
\t} catch {
\t\treturn '';
\t}
}

