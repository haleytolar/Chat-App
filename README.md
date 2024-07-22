# 📱 Mobile Chat App

## Overview
A mobile chat application built with React Native. The app provides users with a chat interface and options to share images and their location.

## Key Features
- **User Customization**: A page where users can enter their name and choose a background color for the chat screen before joining the chat.
- **Chat Interface**: A page displaying the conversation, as well as an input field and submit button.
- **Multimedia Support**: The chat provides users with two additional communication features: sending images and location data. Data gets stored online and offline.

## Dependencies
- React Native
- Expo
- Firebase (Firestore, Auth, Storage)
- Gifted Chat
- AsyncStorage

## Installation

1. Clone the repository:
   git clone https://github.com/haleytolar/Chat-App

2. Install dependencies:
   npm install

3. Set up Firebase:
  Create an account and start a new project.
  Set up the database under Build -> Firestore Database.
  Activate storage.
  Change rules from: allow read, write: if false;
  to: allow read, write: if true;

4. Start the Expo development server:
   npx expo start

## Usage

Running on an Emulator
1. Ensure you have an Android or iOS emulator running.
2. Press a (for Android) or i (for iOS) in the Expo CLI to start the app on the emulator.
   
Running on a Physical Device
1. Install the Expo Go app from the App Store or Google Play.
2. Scan the QR code generated by npx expo start to run the app on your device.

  
