import clsx from 'clsx';

export default function Card({ 
  title, 
  subtitle, 
  actions, 
  children, 
  className 
}) {
  return (
    <div
      className={clsx(
        'bg-white rounded-2xl shadow-sm border border-gray-100',
        className
      )}
    >
      {(title || actions) && (
        <div className="px-4 sm:px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <div>
            {title && (
              <h2 className="text-base font-semibold text-gray-800">{title}</h2>
            )}
            {subtitle && (
              <div className="text-xs text-gray-500">{subtitle}</div>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}
