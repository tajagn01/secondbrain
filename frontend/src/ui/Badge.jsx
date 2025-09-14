export default function Badge({ children, color = 'purple' }) {
const map = {
purple: 'bg-purple-50 text-purple-700',
gray: 'bg-gray-100 text-gray-700',
blue: 'bg-blue-50 text-blue-700',
};
return <span className={["inline-block text-xs px-2 py-0.5 rounded", map[color] || map.purple].join(' ')}>{children}</span>
}

