const getCoordinates = async (city, country) => {
    const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=10`
    );

    const data = await response.json();

    const location = data.results.find(
        result => result.country === country
    );

    if (!location) {
        throw new Error("City not found");
    }

    return {
        latitude: location.latitude,
        longitude: location.longitude
    };
};

const getWeather = async (city, country) => {
    try {
        const coordinates = await getCoordinates(city, country);

        const url =
            `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${coordinates.latitude}` +
            `&longitude=${coordinates.longitude}` +
            `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }

        const data = await response.json();

        return data.current;

    } catch (error) {
        console.error("Error fetching weather:", error);
        throw error;
    }
};


export default getWeather;