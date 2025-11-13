const FRED_API_KEY = '5e02213197ef4237198a287c7a450505'; // Provided API key
const FRED_BASE_URL = 'https://api.stlouisfed.org/fred';

export const fetchIndicatorData = async (seriesId, limit = 48) => {
  // Use a proxy for CORS issues in production. For this environment, we'll try a direct call first.
  const url = `${FRED_BASE_URL}/series/observations?series_id=${seriesId}&api_key=${FRED_API_KEY}&file_type=json&limit=${limit}&sort_order=desc`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Simulate an error for demonstration, as direct FRED API calls can be blocked by CORS
      throw new Error(`FRED API request failed with status ${response.status}. This may be a CORS issue.`);
    }
    const data = await response.json();
    
    // Filter out observations with '.' as value and sort from oldest to newest
    const validObservations = data.observations
      .filter(obs => obs.value !== '.')
      .map(obs => ({ ...obs, value: parseFloat(obs.value) }))
      .reverse(); // The API is called with desc order, so we reverse it for the chart

    return {
      ...data,
      observations: validObservations,
    };
  } catch (error) {
    console.error(`Error fetching data for ${seriesId}:`, error.message);
    console.warn(`Using mock data for ${seriesId} due to API/CORS issue.`);
    // Return mock data on any fetch failure to prevent component errors
    return getMockData(seriesId, limit);
  }
};

const getMockData = (seriesId, limit) => {
    const observations = Array.from({ length: limit }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (limit - 1 - i)); // Generate dates ascending
        return {
            date: date.toISOString().split('T')[0],
            value: (Math.random() * 100).toFixed(2)
        };
    });

    const parsedObservations = observations.map(obs => ({ ...obs, value: parseFloat(obs.value) }));

    return {
        realtime_start: "2025-11-13",
        realtime_end: "2025-11-13",
        observation_start: parsedObservations[0].date,
        observation_end: parsedObservations[limit - 1].date,
        units: "Mock Data",
        output_type: 1,
        file_type: "json",
        order_by: "observation_date",
        sort_order: "asc",
        count: limit,
        offset: 0,
        limit: limit,
        observations: parsedObservations,
    };
};