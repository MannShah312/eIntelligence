import { useState } from "react";
import { Search, Download, CheckCircle, XCircle } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const apiService = {
  checkBrand: async (prompt, brand) => {
    const response = await fetch(`${API_BASE_URL}/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, brand }),
    });

    if (!response.ok) throw new Error("Failed to check brand");
    return response.json();
  },

  downloadCSV: async (prompt, brand, includeTop3) => {
    const response = await fetch(`${API_BASE_URL}/check/download`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, brand, includeTop3 }),
    });

    if (!response.ok) throw new Error("Failed to download CSV");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "brand-check.csv";
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },
};

export default function BrandChecker() {
  const [prompt, setPrompt] = useState("");
  const [brand, setBrand] = useState("");
  const [includeTop3, setIncludeTop3] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!prompt.trim() || !brand.trim()) {
      setError("Please fill in both prompt and brand fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await apiService.checkBrand(prompt, brand);
      setResults([response]);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!prompt.trim() || !brand.trim()) {
      setError("Please fill in both prompt and brand fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await apiService.downloadCSV(prompt, brand, includeTop3);
    } catch (err) {
      setError(err.message || "Failed to download CSV");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            e intelligence
          </h1>
          <p className="text-gray-600 text-lg">Check brand's position with Gemini API results</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">

          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Search Query
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 transition-all"
                placeholder="e.g., Top IT companies in India"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Brand Name
            </label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 transition-all"
              placeholder="e.g., TCS"
            />
          </div>

          <div className="mb-6">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={includeTop3}
                  onChange={(e) => setIncludeTop3(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-6 h-6 border-2 rounded-md transition ${
                    includeTop3 ? "bg-indigo-600 border-indigo-600" : "bg-white border-gray-300"
                  }`}
                >
                  {includeTop3 && (
                    <svg className="w-full h-full text-white p-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="ml-3 text-base font-medium text-gray-700">
                Show & Download Top 3 Brands
              </span>
            </label>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-center">
              <XCircle className="text-red-500 mr-2" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <button
              onClick={handleSend}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition disabled:opacity-50"
            >
              <Search size={20} />
              {loading ? "Checking..." : "Check Brand"}
            </button>

            <button
              onClick={handleDownload}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-indigo-600 text-indigo-600 bg-white rounded-xl shadow hover:bg-indigo-50 transition disabled:opacity-50"
            >
              <Download size={20} />
              Download CSV
            </button>
          </div>

          {results.length > 0 && (
            <div className="border rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Search Query</th>
                    <th className="px-4 py-3 text-left">Brand</th>
                    <th className="px-4 py-3 text-left">Mentioned</th>
                    <th className="px-4 py-3 text-left">Rank</th>
                    {includeTop3 && <th className="px-4 py-3 text-left">Top 3</th>}
                  </tr>
                </thead>

                <tbody>
                  {results.map((r, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="px-4 py-3">{r.prompt}</td>
                      <td className="px-4 py-3 font-medium">{r.brand}</td>
                      <td className="px-4 py-3">
                        {r.mentioned ? (
                          <span className="flex items-center gap-1 text-green-600">
                            <CheckCircle size={18} /> Yes
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-red-600">
                            <XCircle size={18} /> No
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">#{r.position ?? "N/A"}</td>

                      {includeTop3 && (
                        <td className="px-4 py-3">
                          {r.top3Brands?.length ? (
                            <ul>
                              {r.top3Brands.map((item, i) => (
                                <li key={i}>{i + 1}. {item}</li>
                              ))}
                            </ul>
                          ) : (
                            "N/A"
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}