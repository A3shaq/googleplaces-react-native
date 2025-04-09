# Google Places App (React Native + TypeScript)

This is a simple React Native app built with Expo that lets users search for places using Google Places API, displays the location on a map, and stores search history locally.

---

## 🔧 Features

- 🔍 Google Places autocomplete search
- 🗺️ Map display with markers (Google Maps)
- 🧠 Persistent search history using AsyncStorage
- 📱 Optimized for mobile UX

---

## 📦 Tech Stack

- React Native (via Expo)
- TypeScript
- React Navigation
- Google Maps & Places API
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

GooglePlacesApp/
├── App.tsx
├── src/
    ├── component/MapComponent.tsx
│   ├── HomeScreen.tsx
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   
│   └── services/
│       └── placesApi.ts
├── .env
├── babel.config.js
├── env.d.ts
└── README.md


---

## 📌 Notes
- You must enable **Google Places API** and **Maps SDK for Android/iOS** in your Google Cloud Console.
- The API key should have appropriate billing and quota limits.

