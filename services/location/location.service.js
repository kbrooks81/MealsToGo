import camelize from "camelize";

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

export const locationRequest = (searchTerm) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        searchTerm
    )}&key=${GOOGLE_API_KEY}`;

    return fetch(url).then((res) => {
        if (!res.ok) {
            throw new Error("Network error while fetching location");
        }

        return res.json();
    });
};

export const locationTransform = (result) => {
    const formattedResponse = camelize(result);

    if (!formattedResponse.results || formattedResponse.results.length === 0) {
        throw new Error("No results found for the given location");
    }

    const { geometry = {} } = formattedResponse.results[0];
    const { lat, lng } = geometry.location;

    return { lat, lng };
};

export const locationAutocompleteRequest = (input) => {
    if (!input || !input.length) {
        return Promise.resolve({ predictions: [] });
    }

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        input
    )}&types=(cities)&key=${GOOGLE_API_KEY}`;

    return fetch(url).then((res) => {
        if (!res.ok) throw new Error("Network error while fetching autocomplete suggestions");
        return res.json();
    });
};

export const locationAutocompleteTranform = (result) => {
    const formatted = camelize(result);
    const predictions = formatted.predictions ?? [];

    return predictions.map((p) => ({
        id: p.placeId,
        description: p.description,
    }));
};