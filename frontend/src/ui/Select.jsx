export default function Select({ className = '', children, ...props }) {
return (
<select className={["w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring", className].join(' ')} {...props}>
{children}
</select>
);
}

