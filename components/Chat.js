import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

export const Chat = ({ route, navigation, db }) => {
  const { name, background, userID } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: name });

    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach(doc => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        });
      });
      setMessages(newMessages);
    });

    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);


  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  const renderBubble = (props) => {
    return (
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
  };

  const renderMessage = (props) => {
    return (
      <View style={styles.messageContainer}>
        <Image
          source={{ uri: 'https://path-to-your-icon.png' }}
          style={styles.icon}
        />
        <Bubble {...props} />
      </View>
    );
  };

  const renderAvatar = (props) => {
    return (
      <Image
        source={{ uri: props.currentMessage.user.avatar }}
        style={styles.avatar}
      />
    );
  };

  return (
    <View style={[styles.chatContainer, { backgroundColor: background }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderMessage={renderMessage}
        renderAvatar={renderAvatar}
        onSend={messages => onSend(messages)}
        user={{
          _id: userID,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    width: '100%',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
});

export default Chat;
