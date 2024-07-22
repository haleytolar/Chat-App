# 📱 Mobile Chat App

## Overview
A mobile chat application built using React Native. This user-friendly app provides a seamless chat interface and advanced features for effortlessly sharing images and location in real time.

## Key Features
- **User Customization**: Users will be directed to a page where they can input their name and select a background color for the chat screen.
- **Chat Interface**: The page will present the ongoing conversation and feature a text input field where you can type your message, along with a submit button to send it.
- **Multimedia Support**: In the chat, users can share images and their location. The data is stored both online and offline for easy access.

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

  

