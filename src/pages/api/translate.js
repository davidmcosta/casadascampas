import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
      message: "Only POST requests are supported",
    });
  }

  const { text, source = "en", target = "pt" } = req.body;

  if (!text || typeof text !== "string") {
    return res.status(400).json({
      error: "Invalid input",
      message: "Text parameter is required and must be a string",
    });
  }

  try {
    const response = await axios.get(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text
      )}&langpair=${source}|${target}&de=casadas629@gmail.com`
    );

    if (!response.data?.responseData?.translatedText) {
      throw new Error("Invalid translation response");
    }

    return res.status(200).json({
      originalText: text,
      translatedText: response.data.responseData.translatedText,
      detectedLanguage:
        response.data.responseData.detectedLanguage || source,
      match: response.data.responseData.match,
      provider: "MyMemory Free API",
    });
  } catch (error) {
    console.error("[Free Translation Error]", {
      error: error.response?.data || error.message,
      status: error.response?.status,
      timestamp: new Date().toISOString(),
    });

    // 🔹 Special handling for quota exceeded
    if (error.response?.status === 429) {
      return res.status(429).json({
        error: "Quota exceeded",
        message:
          "You have used all free translations for today. Please try again later.",
        details: {
          limit: "500 requests/day without email, 50,000/day with email",
          next: "Wait a few hours or upgrade",
        },
      });
    }

    return res.status(500).json({
      error: "Translation failed",
      message: "Free translation service unavailable",
      details: {
        limitation: "Quota may have been reached or API is down",
        alternative: "Try again later or use another translation API",
      },
    });
  }
}
