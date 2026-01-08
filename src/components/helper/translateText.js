async function translateText(text, targetLang) {
  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        target: targetLang
      }),
    });
    const data = await response.json();
    return data.translatedText || text; // Fallback to original if translation fails
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original text if error occurs
  }
}

export default translateText;
