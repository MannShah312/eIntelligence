import { CheckCircle, XCircle } from "lucide-react";

export default function ResultsTable({ results, includeTop3 }) {
  if (!results?.length) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm mt-8">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <th className="px-4 py-4 text-left font-semibold">Search Query</th>
              <th className="px-4 py-4 text-left font-semibold">Brand</th>
              <th className="px-4 py-4 text-left font-semibold">Found</th>
              <th className="px-4 py-4 text-left font-semibold">Rank</th>
              {includeTop3 && <th className="px-4 py-4 text-left font-semibold">Top 3 Brands</th>}
            </tr>
          </thead>

          <tbody>
            {results.map((result, index) => (
              <tr key={index} className="bg-white hover:bg-gray-50">
                <td className="px-4 py-4 border-b">{result.prompt}</td>
                <td className="px-4 py-4 border-b">
                  <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800">
                    {result.brand}
                  </span>
                </td>

                <td className="px-4 py-4 border-b">
                  {result.mentioned ? (
                    <span className="flex items-center text-green-600"><CheckCircle size={18}/> Yes</span>
                  ) : (
                    <span className="flex items-center text-red-600"><XCircle size={18}/> No</span>
                  )}
                </td>

                <td className="px-4 py-4 border-b">
                  <span className="px-4 py-2 rounded-full bg-indigo-600 text-white">#{result.position}</span>
                </td>

                {includeTop3 && (
                  <td className="px-4 py-4 border-b">
                    {result.top3Brands?.length ? (
                      result.top3Brands.map((b, i) => (
                        <div key={i} className="flex gap-2">
                          <span className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-xs 
                            ${i === 0 ? "bg-yellow-500" : i === 1 ? "bg-gray-400" : "bg-orange-600"}`}>
                            {i + 1}
                          </span>
                          <span>{b}</span>
                        </div>
                      ))
                    ) : "N/A"}
                  </td>
                )}

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}