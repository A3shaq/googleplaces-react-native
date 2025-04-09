This is a React Native app using Expo. It utilizes the Google Maps Places API to fetch and display nearby places on a map. The app has two screens: Home Screen and Map Screen, and demonstrates navigation using React Navigation.

Features
Home screen with a button to navigate to the Map screen.

Map screen that fetches and displays a list of places using Google Places API.

Use of environment variables to store API keys securely.

Installation
Prerequisites
Make sure you have the following installed:

Node.js

Expo CLI

A code editor like VS Code.

Setup
Clone the repository:

bash
Copy
Edit
git clone https://github.com/A3shaq/googleplaces-react-native
cd my-app
Install dependencies:

Run the following command to install the required packages:

bash
Copy
Edit
npm install
This will install all the dependencies listed in the package.json file, including the required React Navigation packages and other dependencies.

Add environment variables:

Create a .env file in the root directory of the project and add your Google Maps API key:

env
Copy
Edit
API_KEY=your_google_maps_api_key_here
Replace your_google_maps_api_key_here with your actual Google API key.

Install additional Expo packages:

You’ll also need to install some Expo-specific packages. Run the following command:

bash
Copy
Edit
expo install @react-navigation/native @react-navigation/stack react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-screens axios dotenv
Install TypeScript support (if needed):

If you haven't set up TypeScript yet, you can install the necessary types for React Navigation and Axios:

bash
Copy
Edit
npm install --save-dev @types/react-navigation @types/react-navigation-stack @types/axios
Run the project:

After setting everything up, start the Expo development server by running:

bash
Copy
Edit
expo start
This will open the Expo developer tools in your browser. You can then run the app on an emulator or physical device by scanning the QR code.

File Structure
bash
Copy
Edit
/GooglePlacesApp
  ├── /src
  │   ├── /screens
  │   │   ├── HomeScreen.tsx
  │   │   ├── MapScreen.tsx
  │   ├── /services
  │   │   ├── placesApi.ts
  │   ├── /types
  │   │   ├── navigation.ts
  ├── App.tsx
  ├── .env
  ├── package.json
  ├── tsconfig.json
  ├── app.json
  └── node_modules
Key Files:
App.tsx: The entry point of the application with navigation setup.

src/screens/HomeScreen.tsx: Displays the home screen with a button to navigate to the map.

src/screens/MapScreen.tsx: Displays a list of nearby places fetched from Google Places API.

src/services/placesApi.ts: Fetches data from the Google Places API.

src/types/navigation.ts: Type definitions for React Navigation.

Additional Information
Google Places API: Make sure to enable the Google Places API in the Google Cloud Console, and generate an API key.

Expo Debugging: You can use Expo's developer tools to debug the app on your physical device or simulator.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Let me know if you need further details!