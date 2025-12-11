import camelize from "camelize";

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

export const restaurantsRequest = (location) => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${encodeURIComponent(
        location
    )}&radius=2000&type=restaurant&key=${GOOGLE_API_KEY}`;

    return fetch(url).then((res) => {
        if (!res.ok) {
            throw new Error("Network error while fetching restaurants");
        }
        return res.json();
    });
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = camelize(results).map((restaurant) => {
    return {
      ...restaurant,
      photos:
        restaurant.photos && restaurant.photos.length
          ? restaurant.photos.map((p) => {
              return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${p.photoReference}&key=${GOOGLE_API_KEY}`;
            })
          : [],
      isOpenNow: restaurant.openingHours?.openNow ?? false,
      isClosedTemporarily:
        restaurant.businessStatus === "CLOSED_TEMPORARILY",
    };
  });

  return mappedResults;
};