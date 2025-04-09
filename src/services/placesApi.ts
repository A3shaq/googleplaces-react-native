// src/services/placesApi.ts
import axios from 'axios';
import { GOOGLE_API_KEY } from '@env';

export const fetchPlaceSuggestions = async (input: string) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_API_KEY}`
  );

  return response.data.predictions;
};

export const fetchPlaceDetails = async (placeId: string) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`
  );

  return response.data.result;
};