import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const { name, background, userID } = route.params;
  const [messages, setMessages] = useState([]);

  const onSend = async (newMessages) => {
    await addDoc(collection(db, "messages"), newMessages[0]);
  };

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#000',
        },
        left: {
          backgroundColor: '#FFF',
        },
      }}
    />
  );

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    return null;
  };

  const renderCustomActions = (props) => {
    return <CustomActions userID={userID} storage={storage} {...props} />;
  };


  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  const loadCachedMessages = async () => {
    try {
      const cachedMessages = await AsyncStorage.getItem("messages");
      if (cachedMessages) {
        setMessages(JSON.parse(cachedMessages));
      }
    } catch (error) {
      console.error("Failed to load messages from cache", error);
    }
  };

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.error("Failed to cache messages", error);
    }
  };

  useEffect(() => {
    navigation.setOptions({ title: name });

    let unsubMessages;

    const fetchMessages = async () => {
      await loadCachedMessages();

      if (isConnected) {
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        unsubMessages = onSnapshot(q, (docs) => {
          let newMessages = [];
          docs.forEach(doc => {
            newMessages.push({
              _id: doc.id,
              ...doc.data(),
              createdAt: new Date(doc.data().createdAt.toMillis())
            });
          });
          cacheMessages(newMessages);
          setMessages(newMessages);
        });
      }
    };

    fetchMessages();

    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  const renderAvatar = (props) => {
    const nameInitial = props.currentMessage.user.name.charAt(0).toUpperCase();
    return (
      <View style={[styles.avatar, { backgroundColor: '#D3D3D3' }]}>
        <Text style={styles.avatarText}>{nameInitial}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.chatContainer, { backgroundColor: background }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderAvatar={renderAvatar}
        onSend={messages => onSend(messages)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {Platform.OS === 'android' || Platform.OS === 'ios' ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    width: '100%',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default Chat;
