import React, { useEffect } from 'react';
import Welcome from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { LogBox, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from "@react-native-community/netinfo";
import { getStorage } from "firebase/storage";

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// Firebase configuration
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

// Create the navigator
const Stack = createNativeStackNavigator();

const storage = getStorage(app);

const App = () => {
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen
          name="Chat"
        >
          {props => <Chat
            isConnected={connectionStatus.isConnected}
            db={db}
            storage={storage}
            {...props}
          />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
