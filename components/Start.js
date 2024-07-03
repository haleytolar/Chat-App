import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity } from 'react-native';

const Screen1 = ({ navigation }) => {
  const [name, setName] = useState('');
  const [background, setBackground] = useState('#FFFFFF'); // Add state for background color

  return (
    <ImageBackground
      source={require("../img/background-img.png")}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Chat App</Text>

        <View style={styles.innerContainer}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Your name'
          />

          <View style={styles.colorChoiceContainer}>
            <Text style={styles.colorChoiceText}>Choose background color</Text>
            <View style={styles.colorChoiceButtons}>
              <TouchableOpacity
                style={[
                  styles.colorChoice,
                  { backgroundColor: "#090C08" },
                  background === "#090C08" && styles.selectedColor,
                ]}
                onPress={() => setBackground("#090C08")}
              />
              <TouchableOpacity
                style={[
                  styles.colorChoice,
                  { backgroundColor: "#474056" },
                  background === "#474056" && styles.selectedColor,
                ]}
                onPress={() => setBackground("#474056")}
              />
              <TouchableOpacity
                style={[
                  styles.colorChoice,
                  { backgroundColor: "#8A95A5" },
                  background === "#8A95A5" && styles.selectedColor,
                ]}
                onPress={() => setBackground("#8A95A5")}
              />
              <TouchableOpacity
                style={[
                  styles.colorChoice,
                  { backgroundColor: "#B9C6AE" },
                  background === "#B9C6AE" && styles.selectedColor,
                ]}
                onPress={() => setBackground("#B9C6AE")}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.startChattingButton}
            onPress={() => navigation.navigate('Screen2', { name: name, background: background })}
          >
            <Text style={styles.startChattingButtonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'transparent', // Keep it transparent to see the ImageBackground
  },
  innerContainer: {
    width: "84%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: '#FFFFFF', // Set background color to white
    padding: 20,
    borderRadius: 10,
  },
  textInput: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 0.5,
    marginTop: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  colorChoiceText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    textAlign: "left",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  colorChoiceContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  colorChoiceButtons: {
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  colorChoice: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 15,
    borderColor: "white",
    borderWidth: 3,
  },
  selectedColor: {
    borderColor: "white",
    borderWidth: 3,
  },
  startChattingButton: {
    backgroundColor: '#757083',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  startChattingButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  }
});

export default Screen1;
