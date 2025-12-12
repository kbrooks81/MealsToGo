import { LocationContext } from '@/services/location/location.context';
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

export default function SearchBar() {
    const { 
      keyword, 
      search, 
      isLoading,
      suggestions,
      onChangeSearchText,
      clearSuggestions,
      onSelectSuggestion,
    } = React.useContext(LocationContext);

    const [searchQuery, setSearchQuery] = useState(keyword);

    useEffect(() => {
      setSearchQuery(keyword);
    }, [keyword]);

    const onChangeSearch = (query: string) => {
      setSearchQuery(query);
      onChangeSearchText(query);
    };

    const onSubmitSearch = () => {
      if (!searchQuery.trim()) return;
      clearSuggestions();
      search(searchQuery);
    }

    const handleSelectSuggestion = (suggestion: { id: string; description: string }) => {
      clearSuggestions();
      onSelectSuggestion(suggestion);
    };
    
  return (
    <View className='px-md pt-sm'>
      <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          onSubmitEditing={onSubmitSearch}
          onIconPress={onSubmitSearch}
          loading={isLoading}
          value={searchQuery}
          elevation={2}
      />

      {suggestions.length > 0 && (
        <View
          className='mt-4 bg-white rounded-lg overflow-hidden'
        >
          {suggestions.map((s: any) => (
            <TouchableOpacity
              key={s.id}
              onPress={() => handleSelectSuggestion(s)}
              className='py-2 px-3'
            >
              <Text>{s.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

    </View>
  )
}