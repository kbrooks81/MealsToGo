import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
  return (
    <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        elevation={2}
    />
  )
}