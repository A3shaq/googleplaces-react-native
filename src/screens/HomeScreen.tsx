// src/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchPlaceSuggestions, fetchPlaceDetails } from '../services/placesApi';

const { height } = Dimensions.get('window');

const fallbackLocation = {
  name: 'Random Place',
  formatted_address: '123 Example St, Random City',
  geometry: {
    location: {
      lat: 37.7749,
      lng: -122.4194,
    },
  },
};

const HomeScreen = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>(fallbackLocation);

  useEffect(() => {
    loadHistory();
  }, []);

  
  const loadHistory = async () => {
    const json = await AsyncStorage.getItem('search_history');
      if (json) setHistory(JSON.parse(json));
    };
    console.log(history)

  const saveToHistory = async (place: any) => {
    const updatedHistory = [place, ...history.filter(h => h?.place_id !== place?.place_id)].slice(0, 10);
    setHistory(updatedHistory);
    await AsyncStorage.setItem('search_history', JSON.stringify(updatedHistory));
  };

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (!text) return setSuggestions([]);
    const results = await fetchPlaceSuggestions(text);
    setSuggestions(results);
  };

  const handleSelectPlace = async (place: any) => {
    const details = await fetchPlaceDetails(place?.place_id);
    saveToHistory(details);
    setSelectedLocation(details);
    setQuery(place.description);
    setSuggestions([]);
  };

  const lat = selectedLocation.geometry.location.lat;
  const lng = selectedLocation.geometry.location.lng;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Marker
          coordinate={{ latitude: lat, longitude: lng }}
          title={selectedLocation?.name}
          description={selectedLocation.formatted_address}
        />
      </MapView>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for places"
          style={styles.input}
          value={query}
          onChangeText={handleSearch}
        />
        <FlatList
          data={suggestions}
          keyExtractor={(item: any) => item?.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectPlace(item)}>
              <Text style={styles.suggestion}>{item.description}</Text>
            </TouchableOpacity>
          )}
          style={styles.list}
        />
        <Text style={styles.historyTitle}>Search History</Text>
        {history&&<FlatList
          data={history}
          keyExtractor={(item) => item?.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedLocation(item)}>
              <Text style={styles.suggestion}>{item.name}</Text>
            </TouchableOpacity>
          )}
          style={styles.list}
        />}
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 40,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
    maxHeight: height * 0.5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 5,
    borderRadius: 6,
  },
  suggestion: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  historyTitle: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  list: {
    maxHeight: 100,
  },
});

export default HomeScreen;