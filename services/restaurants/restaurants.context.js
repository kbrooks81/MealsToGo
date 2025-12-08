// services/restaurants/restaurants.context.js
import React, { createContext, useState, useEffect } from "react";
import { restaurantsRequest, restaurantsTransform } from "./restaurants.service";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const retrieveRestaurants = (location = "51.219448,4.402464") => {
        setIsLoading(true);
        setRestaurants([]);

        restaurantsRequest(location)
            .then(restaurantsTransform)
            .then((results) => {
                setRestaurants(results);
            })
            .catch((err) => {
                console.error("MOCK RESTAURANTS ERROR:", err);
                setError(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        retrieveRestaurants();
    }, []);

    return (
        <RestaurantsContext.Provider
            value={{ restaurants, isLoading, error, refresh: retrieveRestaurants }}
        >
            {children}
        </RestaurantsContext.Provider>
    );
};
