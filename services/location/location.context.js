import React, { createContext, useState, useRef } from "react";
import { 
    locationRequest, 
    locationTransform, 
    locationAutocompleteRequest, 
    locationAutocompleteTranform 
} from "./location.service";

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [suggestions, setSuggestions] = useState([]);
    const autocompleteTimeout = useRef(null);
    
    const onSearch = (searchKeyword) => {
        const trimmed = (searchKeyword || "").trim();
        if (!trimmed.length) {
            console.warn("Search ignored: empty keyword");
            return;
        }

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

    const onChangeSearchText = (text) => {
        setKeyword(text);

        if (autocompleteTimeout.current) {
            clearTimeout(autocompleteTimeout.current);
        }

        if (!text || !text.length) {
            setSuggestions([]);
            return;
        }

        autocompleteTimeout.current = setTimeout(() => {
            locationAutocompleteRequest(text)
                .then(locationAutocompleteTranform)
                .then((results) => {
                    setSuggestions(results);
                })
                .catch((err) => {
                    console.error("AUTOCOMPLETE ERROR:", err);
                });
        }, 400);
    };

    const clearSuggestions = () => setSuggestions([]);

    return (
        <LocationContext.Provider
            value={{
                isLoading,
                error,
                location,
                search: onSearch,
                keyword,
                suggestions,
                onChangeSearchText,
                clearSuggestions,
            }}
        >
            {children}
        </LocationContext.Provider>
    )
}