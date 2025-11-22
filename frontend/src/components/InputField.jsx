export default function InputField({ icon: Icon, value, setValue, label, placeholder }) {
  return (
    <div className="mb-6">
      <label className="block text-lg font-semibold text-gray-700 mb-2">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none
                     focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
        />
      </div>
    </div>
  );
}