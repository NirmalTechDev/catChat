// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import VectorIcon from '../../../components/Vectoricon';
// import colors from '../../../utils/colors';

// const ChatingScreen = () => {
//   const [messages, setMessages] = useState([
//     { id: '1', text: 'Hello! How are you?', sender: 'friend', time: '10:10 AM' },
//     { id: '2', text: 'I am good! What about you?', sender: 'me', time: '10:11 AM' },
//     { id: '3', text: 'Doing well, just working on a project.', sender: 'friend', time: '10:12 AM' },
//     { id: '4', text: 'That’s great to hear! Keep it up!', sender: 'me', time: '10:13 AM' },
//     // Add more sample messages if needed
//   ]);

//   const [inputText, setInputText] = useState('');

//   const sendMessage = () => {
//     if (inputText.trim()) {
//       const newMessage = {
//         id: Date.now().toString(),
//         text: inputText,
//         sender: 'me',
//         time: 'Now',
//       };
//       setMessages([...messages, newMessage]);
//       setInputText('');
//     }
//   };

//   const renderMessage = ({ item }) => (
//     <View
//       style={[
//         styles.messageContainer,
//         item.sender === 'me' ? styles.sentMessage : styles.receivedMessage,
//       ]}
//     >
//       <Text style={styles.messageText}>{item.text}</Text>
//       <Text style={styles.messageTime}>{item.time}</Text>
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity>
//             <VectorIcon name={'arrow-back'} type={'Ionicons'} size={24} color={colors.white} />
//           {/* <Ionicons name="arrow-back" size={24} color="#fff" /> */}
//         </TouchableOpacity>
//         <Image
//           source={{ uri: 'https://placekitten.com/200/200' }}
//           style={styles.profileImage}
//         />
//         <Text style={styles.userName}>John Doe</Text>
//         <TouchableOpacity style={styles.callButton}>
//           <VectorIcon type={'Ionicons'} name="call-outline" size={20} color="#fff" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.videoButton}>
//           <VectorIcon type={'Ionicons'} name="videocam-outline" size={20} color="#fff" />
//         </TouchableOpacity>
//       </View>

//       {/* Messages */}
//       <FlatList
//         data={messages}
//         renderItem={renderMessage}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.messageList}
//         inverted
//       />

//       {/* Input Bar */}
//       <View style={styles.inputContainer}>
//         <TouchableOpacity style={styles.micButton}>
//           <VectorIcon type={'MaterialIcons'} name="mic" size={24} color="#555" />
//         </TouchableOpacity>
//         <TextInput
//           style={styles.input}
//           placeholder="Type a message..."
//           value={inputText}
//           onChangeText={setInputText}
//         />
//         <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
//           <VectorIcon type={'Ionicons'} name="send" size={20} color="#fff" />
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f2f2f2',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#0078fe',
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//   },
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginHorizontal: 10,
//   },
//   userName: {
//     flex: 1,
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   callButton: {
//     marginRight: 15,
//   },
//   videoButton: {
//     marginRight: 5,
//   },
//   messageList: {
//     paddingHorizontal: 10,
//     paddingBottom: 10,
//   },
//   messageContainer: {
//     maxWidth: '75%',
//     borderRadius: 15,
//     padding: 10,
//     marginVertical: 5,
//   },
//   sentMessage: {
//     alignSelf: 'flex-end',
//     backgroundColor: '#0078fe',
//   },
//   receivedMessage: {
//     alignSelf: 'flex-start',
//     backgroundColor: '#e5e5ea',
//   },
//   messageText: {
//     fontSize: 16,
//     color: '#000',
//   },
//   messageTime: {
//     fontSize: 10,
//     color: '#888',
//     textAlign: 'right',
//     marginTop: 5,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderTopColor: '#ddd',
//   },
//   micButton: {
//     padding: 5,
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     backgroundColor: '#f1f1f1',
//     borderRadius: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     marginHorizontal: 10,
//   },
//   sendButton: {
//     backgroundColor: '#0078fe',
//     borderRadius: 20,
//     padding: 10,
//   },
// });

// export default ChatingScreen;

// ChatScreen.js

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import VectorIcon from '../../../components/Vectoricon'; // Ensure this is your custom icon component
import moment from 'moment';
import colors from '../../../utils/colors'; // Define your color palette here
import { styles } from './styles';

const ChatingScreen = ({ route, navigation }) => {
//   const { contact } = route.params; // Expecting contact object with name, avatar, etc.
  const contact = {name:'nirmal', avatar:'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hello! How are you?',
      createdAt: new Date(),
      user: 'friend',
    },
    {
      id: '2',
      text: 'I am good, thanks! How about you?',
      createdAt: new Date(),
      user: 'me',
    },
    // Add more initial messages if needed
  ]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef();

  const sendMessage = () => {
    if (inputText.trim() === '') return;
    const newMessage = {
      id: (messages.length + 1).toString(),
      text: inputText,
      createdAt: new Date(),
      user: 'me',
    };
    setMessages([...messages, newMessage]);
    setInputText('');
    // Scroll to bottom after sending a message
    setTimeout(() => {
      flatListRef.current.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderMessage = ({ item }) => {
    const isMe = item.user === 'me';
    return (
      <View
        style={[
          styles.messageContainer,
          isMe ? styles.messageRight : styles.messageLeft,
        ]}
      >
        <LinearGradient
          colors={isMe ? ['#007AFF', '#00C6FF'] : ['#E5E5EA', '#FFFFFF']}
          style={[
            styles.messageBubble,
            isMe ? styles.bubbleRight : styles.bubbleLeft,
          ]}
        >
          <Text style={isMe ? styles.messageTextRight : styles.messageTextLeft}>
            {item.text}
          </Text>
          <Text style={styles.timestamp}>
            {moment(item.createdAt).format('h:mm A')}
          </Text>
        </LinearGradient>
        {isMe && (
          <VectorIcon
            name="check"
            type="Ionicons"
            size={16}
            color="#fff"
            style={styles.readReceipt}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.headerLeft}
          onPress={() => navigation.goBack()}
        >
          <VectorIcon
            name="chevron-back"
            type="Ionicons"
            size={28}
            color="#fff"
          />
          <Image
            source={{ uri: contact.avatar }}
            style={styles.contactAvatar}
          />
          <Text style={styles.contactName}>{contact.name}</Text>
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <VectorIcon name="call-outline" type="Ionicons" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <VectorIcon name="videocam-outline" type="Ionicons" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <VectorIcon name="ellipsis-vertical" type="Ionicons" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
      />

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <VectorIcon name="happy-outline" type="Ionicons" size={24} color="#555" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <VectorIcon name="attach-outline" type="Ionicons" size={24} color="#555" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            placeholderTextColor="#999"
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <VectorIcon name="send" type="Ionicons" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatingScreen;

