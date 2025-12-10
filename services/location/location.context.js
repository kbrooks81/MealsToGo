import React, { createContext, useState } from "react";
import { locationRequest, locationTransform } from "./location.service";

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSearch = (searchKeyword) => {
        setIsLoading(true);
        setKeyword(searchKeyword);
        locationRequest(searchKeyword.toLowerCase().trim())
            .then(locationTransform)
            .then((result) => {
                setLocation(result);
            })
            .catch((err) => {
                console.error("MOCK LOCATION ERROR:", err);
                setError(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <LocationContext.Provider
            value={{
                isLoading,
                error,
                location,
                search: onSearch,
                keyword,
            }}
        >
            {children}
        </LocationContext.Provider>
    )
}