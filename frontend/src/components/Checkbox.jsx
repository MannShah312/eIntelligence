export default function Checkbox({ checked, onChange, label }) {
  return (
    <label className="flex items-center cursor-pointer group mb-6">
      <div className="relative">
        <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
        <div className={`w-6 h-6 border-2 rounded-md transition-all 
          ${checked ? "bg-indigo-600 border-indigo-600" : "bg-white border-gray-300 group-hover:border-indigo-400"}`}>
          {checked && (
            <svg className="w-full h-full p-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      <span className="ml-3 text-base font-medium text-gray-700">
        {label}
      </span>
    </label>
  );
}