const API_BASE_URL = "http://localhost:8000/api";

export const apiService = {
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
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "brand-check.csv";
    link.click();
    window.URL.revokeObjectURL(link.href);
  },
};