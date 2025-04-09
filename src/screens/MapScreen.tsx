// src/screens/MapScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { RouteProp, useRoute } from '@react-navigation/native';
// import { RootStackParamList } from '../types/navigation';

type MapScreenRouteProp = RouteProp<any, 'Map'>;

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

const MapScreen = () => {
  const route = useRoute<MapScreenRouteProp>();
  const location = route.params?.location || fallbackLocation;

  const lat = location.geometry.location.lat;
  const lng = location.geometry.location.lng;

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
          title={location.name}
          description={location.formatted_address}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;