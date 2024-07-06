import React from 'react';
import Welcome from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyB3tel_36ScwjP3u8Y5-WQaznKkZeGD7hY",
    authDomain: "chatapp-82447.firebaseapp.com",
    projectId: "chatapp-82447",
    storageBucket: "chatapp-82447.appspot.com",
    messagingSenderId: "1095253109067",
    appId: "1:1095253109067:web:f6bc564a5c513d012fa0ce"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
      >
        <Stack.Screen
          name="Welcome"
          component={Welcome}
        />
        <Stack.Screen
          name="Chat"
          component={(props) => <Chat {...props} db={db} />}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
