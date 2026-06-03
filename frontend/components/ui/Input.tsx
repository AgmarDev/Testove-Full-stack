export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2 rounded-lg text-sm border border-slate-300 placeholder:text-slate-400 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${props.className ?? ""}`}
    />
  );
}
