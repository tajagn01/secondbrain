export default function Card({ title, subtitle, actions, children, className = '' }) {
	return (
		<div className={["bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden", className].join(' ')}>
			{(title || actions) && (
				<div className="px-4 sm:px-5 py-3 border-b border-gray-100 flex items-center justify-between">
					<div>
						{title && <div className="text-base font-semibold text-gray-800">{title}</div>}
						{subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
					</div>
					{actions}
				</div>
			)}
			<div className="p-4 sm:p-5">{children}</div>
		</div>
	);
}

