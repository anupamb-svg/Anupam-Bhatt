import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export interface ReadingRequest {
  type: 'kundli' | 'palmistry' | 'numerology';
  data: any;
}

export interface KundliData {
  charts: {
    north: number[]; // Rashi numbers for houses 1-12
    planets: Array<{ name: string; house: number; degree: string; rashi: string; isRetro: boolean; isCombust: boolean }>;
  };
  details: string; // Markdown reading
}

export const geminiService = {
  async getCosmicReading({ type, data }: ReadingRequest) {
    const model = "gemini-2.0-flash-exp";
    
    let prompt = "";

    switch (type) {
      case 'kundli':
        prompt = `
          You are a Master Vedic Astrologer (Jyotishi). Analyze the birth details: 
          Name: ${data.name}, Date: ${data.dob}, Time: ${data.time}, Location: ${data.location}.
          
          TASK: Provide a comprehensive, high-accuracy Parashar Kundli report.
          1. STRUCTURED DATA (for charts):
             Return a JSON block at the START of your response containing:
             - "rashi_map": [Array of 12 integers representing Rashi numbers (1-12) for Houses 1 to 12 in North Indian Style]
             - "planets": [Array of objects with {name, house, degree, rashi, isRetro, isCombust}]
             
          2. DETAILED ANALYSIS (Markdown):
             Include all these sections in Hindi and English:
             - Lagan Kundli & Sub-charts (D9 Navamsa, D10 Dashamsha) description.
             - Planetary Positions with precise degrees.
             - Bhava (House) Analysis: Strength and impact of life sectors.
             - Rashi & Nakshatra Details (Panchang: Tithi, Yoga, Karana, Vara).
             - Dasha & Antardasha: Vimshottari Dasha timeline of life events.
             - Kundali Matching & Doshas: Mangal, Kaal Sarp, Pitra, Shani Dosha analysis.
             - Predictions: Career, Love, Health, Finance, and Year-ahead.
             - Remedies (Upaya): Gemstones, Mantras, Pooja, Fasting.
             - Advanced: Shadbala, Ashtakavarga summary.
        `;
        break;
      case 'palmistry':
        prompt = `
          You are an expert Palmist (Hastrekha Specialist). Analyze the following description: ${data.description}.
          Provide:
          1. Analysis of Life Line, Heart Line, and Head Line.
          2. Mounts analysis (Jupiter, Saturn, etc.).
          3. Detailed predictions for health, wealth, and career.
          Respond in both Hindi and English.
        `;
        break;
      case 'numerology':
        prompt = `
          You are a Numerology expert (AnkAstro). Name: ${data.name}, DOB: ${data.dob}.
          Calculate:
          1. Mulank (Psychic) & Bhagyank (Destiny) numbers.
          2. Chaldean Name analysis.
          3. Detailed compatibility and yearly forecast.
          Respond in both Hindi and English.
        `;
        break;
    }

    try {
      const response = await ai.models.generateContent({
        model,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });
      return response.response.text();
    } catch (error) {
      console.error("AI Reading Error:", error);
      throw new Error("Failed to connect to the cosmic intelligence. Please try again.");
    }
  },

  async generateBlogContent(topic: string) {
    const model = "gemini-3-flash-preview";
    const prompt = `Write a professional, researched-backed blog post about "${topic}" in the context of Indian Astrology. Include historical references, scientific curiosities, and practical advice. Format with headings and bullet points. Include both Hindi terms and English explanations.`;
    
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });
      return response.text;
    } catch (error) {
       console.error("Blog Generation Error:", error);
       return "Celestial wisdom is currently obscured. Check back later.";
    }
  }
};
