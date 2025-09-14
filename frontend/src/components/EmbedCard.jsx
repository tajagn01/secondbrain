import { Tweet } from 'react-tweet'
import UICard from '../ui/Card'
import Badge from '../ui/Badge'
import { parseEmbedLink } from '../utils/parseEmbedLink'

export default function EmbedCard({ title, url }) {
	const parsed = parseEmbedLink(url || '')
	return (
		<UICard title={title}>
			<div className="space-y-2">
				<div className="text-xs"><Badge>{parsed.type}</Badge></div>
				{parsed.type === 'youtube' && (
					<iframe
						className="w-full aspect-video rounded"
						src={parsed.link}
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerPolicy="strict-origin-when-cross-origin"
						allowFullScreen
					/>
				)}
				{parsed.type === 'twitter' && (
					<div className="w-full max-w-full overflow-hidden">
						<div className="tweet-embed">
							<Tweet id={(url.match(/status\/(\d+)/) || [])[1]} />
						</div>
					</div>
				)}
				{parsed.type === 'unknown' && (
					<a href={parsed.link} target="_blank" rel="noreferrer" className="text-blue-600 break-all text-sm">{parsed.link}</a>
				)}
			</div>
		</UICard>
	)
}

