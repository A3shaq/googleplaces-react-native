import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

type MapComponentProps = {
  latitude: number;
  longitude: number;
  title: string;
  description: string;
};

const GoogleMap: React.FC<MapComponentProps> = ({
  latitude,
  longitude,
  title,
  description,
}) => {
  return (
    <MapView
      style={styles.map}
      region={{
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}>
      <Marker coordinate={{ latitude, longitude }} title={title} description={description} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default GoogleMap;
