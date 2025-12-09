import { LocationContext } from '@/services/location/location.context';
import React, { useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';

export default function SearchBar() {
    const { keyword, search, isLoading } = React.useContext(LocationContext);
    const [searchQuery, setSearchQuery] = useState(keyword);

    useEffect(() => {
      setSearchQuery(keyword);
    }, [keyword]);

    const onChangeSearch = (query: string) => {
      setSearchQuery(query);
    }

    const onSubmitSearch = () => {
      if (!searchQuery.trim()) return;
      search(searchQuery);
    }
    
  return (
    <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        onSubmitEditing={onSubmitSearch}
        onIconPress={onSubmitSearch}
        loading={isLoading}
        value={searchQuery}
        elevation={2}
    />
  )
}