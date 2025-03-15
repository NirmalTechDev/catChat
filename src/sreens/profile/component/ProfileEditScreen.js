import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import VectorIcon from '../../../components/Vectoricon';
import { Ntext } from '../../../components/Ntext';
import colors from '../../../utils/colors';
import { useNavigation } from '@react-navigation/native';
// Updated import for image picker
import { launchImageLibrary } from 'react-native-image-picker';

const ProfileEditScreen = () => {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState('https://pujacraft.com/cdn/shop/articles/Krishna-Janmashtami--2023-date1_64f79e1e5e4f8.jpg?v=1693982466');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const GoBack = () => {
    navigation.goBack();
  };

  // Updated handleChooseImage function using react-native-image-picker
  const handleChooseImage = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        const source = response.assets[0].uri;
        setProfileImage(source);
      }
    });
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    setDateOfBirth(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} onPress={() => { GoBack() }} >
        <TouchableOpacity style={styles.settingBack} onPress={() => { GoBack() }} >
          <VectorIcon type={'MaterialIcons'} name={'chevron-left'} color='#000' size={25} />
          <Ntext title='Settings' color={colors.black} size={18} type='bold' />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <LinearGradient colors={['rgba(0,0,255,0.5)', 'rgba(255,0,0,0.5)']} style={styles.gradientBackground}>
          <TouchableOpacity style={styles.profileImageContainer} onPress={handleChooseImage}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <VectorIcon type={'Ionicons'} name="person-circle-outline" size={100} color="#888" />
            )}
            <VectorIcon type={'Ionicons'} name="camera" size={16} color="#888" style={styles.cemeraIcon} />

          </TouchableOpacity>

          <View style={styles.form}>
            {/* Username */}
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#aaa"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              maxLength={20}
            />
            <Ntext title='Lowercase, numbers, _, and . allowed' size={13} color={colors.black} style={styles.helperText} />

            {/* Name */}
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#aaa"
              value={name}
              onChangeText={setName}
            />

            {/* Bio */}
            <TextInput
              style={styles.input}
              placeholder="Bio"
              placeholderTextColor="#aaa"
              value={bio}
              onChangeText={setBio}
              multiline={true}
            />

            {/* Website */}
            <TextInput
              style={styles.input}
              placeholder="Website URL"
              placeholderTextColor="#aaa"
              value={website}
              onChangeText={setWebsite}
              keyboardType="url"
            />

            {/* Date of Birth */}
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="Date of Birth"
                placeholderTextColor="#aaa"
                value={dateOfBirth.toDateString()}
                editable={false}
              />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={dateOfBirth}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}

            {/* Mobile Number */}
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              placeholderTextColor="#aaa"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
            />

            {/* Email */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <TouchableOpacity style={styles.saveButton}>
              <LinearGradient colors={['#00C6FF', '#0072FF']} style={styles.saveButtonGradient}>
                <Ntext title='Save Details' size={18} color={colors.white} type='bold' />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    elevation: 5,
    backgroundColor: 'white'
  },
  settingBack: {
    flexDirection: 'row',
  },
  gradientBackground: {
    flex: 1,
    padding: 20,
  },
  profileImageContainer: {
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 100,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3e3e3',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cemeraIcon: { position: "absolute", bottom: 7, right: 7, backgroundColor: "white", padding: 5, borderRadius: 20, zIndex: 10, },
  form: {
    marginTop: 10,
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    elevation: 2,
  },
  helperText: {
    marginBottom: 10,
    marginBottom: 20,
  },
  saveButton: {
    alignSelf: 'center',
    width: '100%',
    marginTop: 30,
  },
  saveButtonGradient: {
    borderRadius: 25,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileEditScreen;
