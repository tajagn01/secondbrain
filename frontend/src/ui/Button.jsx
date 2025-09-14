export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
\tconst base = 'inline-flex items-center justify-center rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';
\tconst variants = {
\t\tprimary: 'bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-400',
\t\tsecondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800 focus:ring-gray-300',
\t\tghost: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-300',
\t};
\tconst sizes = {
\t\tsm: 'px-3 py-1.5 text-sm',
\t\tmd: 'px-4 py-2 text-sm',
\t\tlg: 'px-5 py-3 text-base',
\t};
\treturn (
\t\t<button className={[base, variants[variant] || variants.primary, sizes[size] || sizes.md, className].join(' ')} {...props}>
\t\t\t{children}
\t\t</button>
\t);
}

