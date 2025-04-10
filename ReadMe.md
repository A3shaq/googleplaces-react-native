# Google Places App (React Native + TypeScript)

This is a simple React Native app built with Expo that lets users search for places using Google Places API, displays the location on a map, and stores search history locally.

---

## 🔧 Features


- 📍 Detect current location using **Expo Location**
- 🔍 Google Places **autocomplete search**
- 🗺️ Google Maps display with **markers**
- 🧠 Persistent **search history** using AsyncStorage
- ⚛️ Modular components for map and autocomplete
- 📱 Optimized mobile-friendly UX

---

## 📦 Tech Stack

- React Native (via [Expo](https://expo.dev/))
- TypeScript
- Google Maps & Places API
- Expo Location
- React Navigation
- AsyncStorage
---

## 🚀 Getting Started

### 1. Clone the Repository

bash
git clone https://github.com/A3shaq/googleplaces-react-native
cd GooglePlacesApp

### 2. Install Dependencies

bash
npm install

### 3. Setup Environment Variables

Create a .env file in the root:
env
GOOGLE_API_KEY=your_google_api_key_here

Also create a babel.config.js:
js
module.exports = function(api) {
api.cache(true);
return {
presets: ['babel-preset-expo'],
plugins: [
['module:react-native-dotenv', {
moduleName: '@env',
path: '.env'
}]
]
};
};

And create a env.d.ts:
ts
declare module '@env' {
export const GOOGLE_API_KEY: string;
}

### 4. Start the App

bash
npx expo start -c

---

## 📁 Project Structure

googleplaces-react-native/
├── App.tsx
├── .env
├── babel.config.js
├── env.d.ts
└── src/
    ├── component/
    │   ├── GoogleAutoComplete.tsx
    │   └── GoogleMap.tsx
    ├── screens/
    │   └── HomeScreen.tsx
    └── services/
        └── placesApi.ts

---

## 📌 Notes

- You must enable **Google Places API** and **Maps SDK for Android/iOS** in your Google Cloud Console.
- The API key should have appropriate billing and quota limits.
