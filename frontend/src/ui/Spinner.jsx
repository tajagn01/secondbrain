export default function Spinner({ size = 16, className = '' }) {
\tconst style = { width: size, height: size };
\treturn <span className={["inline-block border-2 border-t-transparent border-gray-400 rounded-full animate-spin", className].join(' ')} style={style} />
}

