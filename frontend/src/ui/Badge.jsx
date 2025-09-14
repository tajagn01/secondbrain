export default function Badge({ children, color = 'purple' }) {
\tconst map = {
\t\tpurple: 'bg-purple-50 text-purple-700',
\t\tgray: 'bg-gray-100 text-gray-700',
\t\tblue: 'bg-blue-50 text-blue-700',
\t};
\treturn <span className={["inline-block text-xs px-2 py-0.5 rounded", map[color] || map.purple].join(' ')}>{children}</span>
}

