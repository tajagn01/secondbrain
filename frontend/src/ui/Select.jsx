export default function Select({ className = '', children, ...props }) {
\treturn (
\t\t<select className={["w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring", className].join(' ')} {...props}>
\t\t\t{children}
\t\t</select>
\t);
}

