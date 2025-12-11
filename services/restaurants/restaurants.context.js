import React, { createContext, useState, useEffect } from "react";
import { restaurantsRequest, restaurantsTransform } from "./restaurants.service";
import { LocationContext } from "../location/location.context";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const {location} = React.useContext(LocationContext);

    const retrieveRestaurants = (loc) => {
        setIsLoading(true);
        setRestaurants([]);

        restaurantsRequest(loc)
            .then(restaurantsTransform)
            .then((results) => {
                setRestaurants(results);
            })
            .catch((err) => {
                console.error("RESTAURANTS ERROR:", err);
                setError(err);
            })
            .finally(() => {
                setIsLoading(false);
            });

    };

    useEffect(() => {
        if (location.length === 0) return;
        const locationString = `${location.lat},${location.lng}`;
        retrieveRestaurants(locationString);
    }, [location]);

    return (
        <RestaurantsContext.Provider
            value={{ restaurants, isLoading, error }}
        >
            {children}
        </RestaurantsContext.Provider>
    );
};
