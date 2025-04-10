import React, { useState, useEffect } from 'react';
import { View,StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { fetchPlaceSuggestions, fetchPlaceDetails } from '../services/placesApi';
import { GoogleAutoComplete, GoogleMap } from '../component';

const HomeScreen = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);

  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    getCurrentLocation();
    loadHistory();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Location Permission Required', 'Please enable location access to use the app.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setSelectedLocation({
        name: 'Current Location',
        formatted_address: 'Your Location',
        geometry: {
          location: {
            lat: latitude,
            lng: longitude,
          },
        },
      });
    } catch (error) {
      console.error('Error fetching location:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = async () => {
    const json = await AsyncStorage.getItem('search_history');
    if (json) setHistory(JSON.parse(json));
  };

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


  if (loading || !selectedLocation) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }
  const lat = selectedLocation.geometry.location.lat;
  const lng = selectedLocation.geometry.location.lng;


  return (
    <View style={styles.container}>
      <GoogleMap
        latitude={lat}
        longitude={lng}
        title={selectedLocation?.name}
        description={selectedLocation.formatted_address}
      />
      <GoogleAutoComplete
        query={query}
        suggestions={suggestions}
        history={history}
        onSearch={handleSearch}
        onSelectSuggestion={handleSelectPlace}
        onSelectHistoryItem={setSelectedLocation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default HomeScreen;