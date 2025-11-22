import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { Parser } from 'json2csv';
import { fuzzy } from "../utils/fuzzy.js"; // ✅ import fuzzy matcher
dotenv.config();

const getBrandData = async (prompt, brand) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: { temperature: 0.2 },
  });

  const structuredPrompt = `
    List the top 10 items for the following query in JSON format as an array of strings only.
    Do not include any explanations or commentary.
    Query: "${prompt}"
  `;

  const result = await model.generateContent(structuredPrompt);
  let responseText = result.response.text();
  responseText = responseText.replace(/```json|```/g, '').trim();

  let list = [];
  try {
    list = JSON.parse(responseText);
    if (!Array.isArray(list)) list = [];
  } catch {
    list = [];
  }

  const positionIndex = list.findIndex(item => fuzzy(item, brand));

  return {
    list,
    mentioned: positionIndex !== -1,
    position: positionIndex !== -1 ? positionIndex + 1 : null
  };
};


export const checkBrandController = async (req, res) => {
  try {
    const { prompt, brand } = req.body;

    if (!prompt || !brand) {
      return res.status(400).json({
        error: true,
        message: "Prompt and brand are required"
      });
    }

    const { list, mentioned, position } = await getBrandData(prompt, brand);

    return res.json({
      prompt,
      brand,
      mentioned,
      position,
      top3Brands: list.slice(0, 3) // still works fine
    });

  } catch (err) {
    console.error("Gemini API Error:", err.message);
    return res.status(500).json({
      prompt: req.body.prompt,
      brand: req.body.brand,
      mentioned: false,
      position: null
    });
  }
};

// ✅ CSV download controller with fuzzy result
// export const downloadBrandCSVController = async (req, res) => {
//   try {
//     const { prompt, brand } = req.body;

//     if (!prompt || !brand) {
//       return res.status(400).json({
//         error: true,
//         message: "Prompt and brand required"
//       });
//     }

//     const { mentioned, position } = await getBrandData(prompt, brand);

//     const csvData = [{ prompt, brand, mentioned, position }];
//     const parser = new Parser({ fields: ['prompt', 'brand', 'mentioned', 'position'] });
//     const csv = parser.parse(csvData);

//     res.header("Content-Type", "text/csv");
//     res.attachment("brand_check.csv");
//     return res.send(csv);

//   } catch (err) {
//     console.error("CSV Generation Error:", err.message);
//     return res.status(500).json({
//       error: true,
//       message: "Failed to generate CSV"
//     });
//   }
// };

export const downloadBrandCSVController = async (req, res) => {
  try {
    const { prompt, brand, includeTop3 } = req.body;

    if (!prompt || !brand) {
      return res.status(400).json({
        error: true,
        message: "Prompt and brand required"
      });
    }

    const { list, mentioned, position } = await getBrandData(prompt, brand);

    // ✅ extract top 3 individually
    const first = includeTop3 && list[0] ? list[0] : "";
    const second = includeTop3 && list[1] ? list[1] : "";
    const third = includeTop3 && list[2] ? list[2] : "";

    const csvData = [{
      prompt,
      brand,
      mentioned,
      position,
      first,
      second,
      third
    }];

    const parser = new Parser({
      fields: ['prompt', 'brand', 'mentioned', 'position', 'first', 'second', 'third']
    });

    const csv = parser.parse(csvData);

    res.header("Content-Type", "text/csv");
    res.attachment("brand_check.csv");
    return res.send(csv);

  } catch (err) {
    console.error("CSV Generation Error:", err.message);
    return res.status(500).json({
      error: true,
      message: "Failed to generate CSV"
    });
  }
};