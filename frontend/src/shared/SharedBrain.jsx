import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../utils/api'
import EmbedCard from '../components/EmbedCard'

export default function SharedBrain() {
  const { shareLink } = useParams()
  const { data, isLoading, error } = useQuery({
    queryKey: ['shared-brain', shareLink],
    queryFn: () => api.getSharedBrain(shareLink)
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <nav className="w-full flex items-center justify-between px-4 sm:px-10 py-4 bg-white shadow border-b sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <span className="text-3xl" role="img" aria-label="brain">🧠</span>
          <span className="text-2xl font-extrabold text-purple-700 tracking-tight">secondbrain</span>
          <span className="ml-3 text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded">Public</span>
        </div>
        <Link className="text-sm text-purple-700 underline" to="/">Back to app</Link>
      </nav>

      <main className="max-w-6xl mx-auto px-2 sm:px-8 py-10">
        {isLoading && <div className="text-gray-600">Loading shared content...</div>}
        {error && <div className="text-red-600">{error.message}</div>}
        {data?.content?.length === 0 && <div className="text-gray-600">No content yet.</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {data?.content?.map((item) => (
            <EmbedCard key={item._id} title={item.title} url={item.link} />
          ))}
        </div>
      </main>
    </div>
  )
}

