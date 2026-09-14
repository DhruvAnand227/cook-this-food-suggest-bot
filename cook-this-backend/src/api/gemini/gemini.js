import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import getWeather from "../weather/weather.js";

dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function generateText(city, country, cuisines, food_pref, ingredients) {
    try {
        const weatherNow = await getWeather(city, country);

        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: `
            You are a food recommendation assistant.

            Current weather data:
            - Temperature: ${weatherNow.temperature_2m}°C
            - Relative humidity: ${weatherNow.relative_humidity_2m}%
            - Apparent temperature: ${weatherNow.apparent_temperature}°C
            - Precipitation: ${weatherNow.precipitation} mm
            - Weather code: ${weatherNow.weather_code}
            - Wind speed: ${weatherNow.wind_speed_10m} km/h

            User's food preference:
            ${food_pref}

            User's preferred cuisines:
            ${cuisines.join(", ")}

            Available ingredients in the kitchen:
            ${ingredients.join(", ")}

            Based on the user's food preference, preferred cuisines, current weather, and available ingredients, suggest dishes that can actually be prepared using the available ingredients.

            Rules:
            1. Only suggest dishes that match the user's food preference.
            2. Only suggest dishes from the user's preferred cuisines.
            3. Use the available ingredients when suggesting dishes.
            4. Do not suggest a cuisine if no suitable dish can be prepared from the available ingredients.
            5. Do not invent ingredients that are not available.
            6. If a few additional basic ingredients are absolutely necessary, clearly mention them separately.
            7. Consider the current weather when deciding which dishes would be suitable.
            8. Give practical and realistic dish suggestions.
            9. For each suggestion, mention the dish name, cuisine, and why it is suitable for the current weather.
            10. Do not suggest any dish that violates the user's food preference.

            Return the suggestions in a clear and easy-to-read format.
            `
        });

        console.log("Gemini Response:");
        console.log(response.text);
    } catch (error) {
        console.error("Error communicating with Gemini:", error);
    }
}

const ans = await generateText('New Delhi', 'India', ['north-indian', 'south-indian', 'chinese'], 'veg', ['potato', 'tomato', 'onion', 'bottle-guard', 'bitter-gourd']);

console.log(ans);