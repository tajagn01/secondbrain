export default function Card({ title, subtitle, actions, children, className = '' }) {
\treturn (
\t\t<div className={["bg-white rounded-2xl shadow-sm border border-gray-100", className].join(' ')}>
\t\t\t{(title || actions) && (
\t\t\t\t<div className="px-4 sm:px-5 py-3 border-b border-gray-100 flex items-center justify-between">
\t\t\t\t\t<div>
\t\t\t\t\t\t{title && <div className="text-base font-semibold text-gray-800">{title}</div>}
\t\t\t\t\t\t{subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
\t\t\t\t\t</div>
\t\t\t\t\t{actions}
\t\t\t\t</div>
\t\t\t)}
\t\t\t<div className="p-4 sm:p-5">{children}</div>
\t\t</div>
\t);
}

