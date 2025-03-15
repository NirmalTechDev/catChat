import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  RefreshControl,
} from 'react-native';
import VectorIcon from '../../components/Vectoricon'; // Custom icon component
import { styles } from './styles';
import colors from '../../utils/colors';
import { Ntext } from '../../components/Ntext';
import { useNavigation } from '@react-navigation/native';

const ChatScreen = () => {
  // Dummy chat data for the chat inbox screen
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const chats = [
    {
      id: 1,
      name: 'John Doe',
      lastMessage: 'Hey, how are you?',
      profilePic: 'https://via.placeholder.com/150',
      unreadCount: 2,
      timestamp: '10:30 AM',
    },
    {
      id: 2,
      name: 'Jane Smith',
      lastMessage: 'See you tomorrow!',
      profilePic: 'https://via.placeholder.com/150',
      unreadCount: 0,
      timestamp: 'Yesterday',
    },
    {
      id: 3,
      name: 'Mark Johnson',
      lastMessage: 'Sent you the files.',
      profilePic: 'https://via.placeholder.com/150',
      unreadCount: 1,
      timestamp: '12:15 PM',
    },
    {
      id: 4,
      name: 'Jane Smith',
      lastMessage: 'See you tomorrow!',
      profilePic: 'https://via.placeholder.com/150',
      unreadCount: 0,
      timestamp: 'Yesterday',
    },
    {
      id: 5,
      name: 'Mark Johnson',
      lastMessage: 'Sent you the files.',
      profilePic: 'https://via.placeholder.com/150',
      unreadCount: 1,
      timestamp: '12:15 PM',
    },
    {
      id: 6,
      name: 'Jane Smith',
      lastMessage: 'See you tomorrow!',
      profilePic: 'https://via.placeholder.com/150',
      unreadCount: 0,
      timestamp: 'Yesterday',
    },
    {
      id: 7,
      name: 'Mark Johnson',
      lastMessage: 'Sent you the files.',
      profilePic: 'https://via.placeholder.com/150',
      unreadCount: 1,
      timestamp: '12:15 PM',
    },
    {
      id: 8,
      name: 'Jane Smith',
      lastMessage: 'See you tomorrow!',
      profilePic: 'https://via.placeholder.com/150',
      unreadCount: 0,
      timestamp: 'Yesterday',
    },
    {
      id: 9,
      name: 'Mark Johnson',
      lastMessage: 'Sent you the files.',
      profilePic: 'https://via.placeholder.com/150',
      unreadCount: 1,
      timestamp: '12:15 PM',
    },
    {
      id: 10,
      name: 'Jane Smith',
      lastMessage: 'See you tomorrow!',
      profilePic: 'https://via.placeholder.com/150',
      unreadCount: 0,
      timestamp: 'Yesterday',
    },
    {
      id: 11,
      name: 'Mark Johnson',
      lastMessage: 'Sent you the files.',
      profilePic: 'https://via.placeholder.com/150',
      unreadCount: 1,
      timestamp: '12:15 PM',
    },
    {
      id: 12,
      name: 'Jane Smith',
      lastMessage: 'See you tomorrow!',
      profilePic: 'https://via.placeholder.com/150',
      unreadCount: 0,
      timestamp: 'Yesterday',
    },
    {
      id: 13,
      name: 'Mark Johnson',
      lastMessage: 'Sent you the files.',
      profilePic: 'https://via.placeholder.com/150',
      unreadCount: 1,
      timestamp: '12:15 PM',
    },
    // More chats...
  ];

  const onRefresh = () => {
    setRefreshing(true);
    // Simulated delay for network request
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.header}>
        <Ntext title='CatChat' size={22} type='bold' color={colors.black} />
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <VectorIcon name="search" size={25} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconSpacing}>
            <VectorIcon name="dots-vertical-circle-outline" type={'MaterialCommunityIcons'} size={25} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar (optional) */}
      <View style={styles.searchBar}>
        <TextInput style={styles.searchPlaceholder} placeholder={'Search Chats...'} />
      </View>

      {/* Chat List */}
      <ScrollView style={styles.chatList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.black} />
        }
      >
        {chats.map(chat => (
          <TouchableOpacity key={chat.id} style={styles.chatItem} onPress={() => { navigation.navigate('chatingScreen') }}>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' }} style={styles.profilePic} />
            <View style={styles.chatDetails}>
              <Ntext title={chat.name} size={16} type='bold' color={colors.black} />
              <Ntext title={chat.lastMessage} size={14} color={colors.Placeholdercolor} numberOfLine={1} />
            </View>
            <View style={styles.chatMeta}>
              <Ntext title={chat.timestamp} size={12} color='#999' />
              {chat.unreadCount > 0 && (
                <View style={styles.unreadBadge}>
                  <Ntext title={chat.unreadCount} size={12} color={colors.black} />
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Floating Action Button (New Chat) */}
      <TouchableOpacity style={styles.fab}>
        <VectorIcon name="chat" type={'Entypo'} size={30} color={colors.ThemeBorder} />
      </TouchableOpacity>
    </View>
  );
};
export default ChatScreen;
