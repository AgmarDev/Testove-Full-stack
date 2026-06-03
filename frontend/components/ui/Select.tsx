interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

export default function Select({
  options,
  className = "",
  ...props
}: SelectProps) {
  return (
    <select
      {...props}
      className={`w-full px-3 py-2 rounded-lg text-sm border border-slate-300 bg-white text-slate-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${className}`}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
