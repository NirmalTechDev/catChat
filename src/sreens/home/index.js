// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, Image, BackHandler, Alert } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Geolocation from 'react-native-geolocation-service';
// import MapView, { Marker } from 'react-native-maps';

// const profilepic = ['https://instagram.fstv5-1.fna.fbcdn.net/v/t51.2885-19/454837168_322641514177562_4543743564091306202_n.jpg?_nc_ht=instagram.fstv5-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=XTixJITJBicQ7kNvgFA6NQE&_nc_gid=5722a423e5214232a472f93f1e74a167&edm=ALGbJPMBAAAA&ccb=7-5&oh=00_AYBxqofYCR_L4rfij6g1TqRKEug56A3JVD0tPSyWfmNwNw&oe=670DCA27&_nc_sid=7d3ac5',
// 'https://instagram.fstv5-1.fna.fbcdn.net/v/t51.2885-19/460879976_2264819820520905_5224897982768735743_n.jpg?_nc_ht=instagram.fstv5-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=htSqrrlELusQ7kNvgG-l40Z&_nc_gid=9c9561dc94e74e6aaf9770c0fcaf7d13&edm=ALGbJPMBAAAA&ccb=7-5&oh=00_AYCBJUg1t6dOFaHx8hs_do8fFp4l27DiY7mqfNIMAmXVFw&oe=670DC693&_nc_sid=7d3ac5'];
// import { styles } from './styles';

// // Example JSX
// function Home() {
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     const backAction = () => {
//       Alert.alert('Exit App', 'Are you sure you want to exit?', [
//         {
//           text: 'Cancel',
//           onPress: () => null,
//           style: 'cancel',
//         },
//         { text: 'Yes', onPress: () => BackHandler.exitApp() },
//       ]);
//       return true;
//     };

//     const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

//     return () => backHandler.remove();
//   }, []);

//   useEffect(() => {
//     const getCurrentLocation = () => {
//       Geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLocation({
//             latitude,
//             longitude,
//           });
//         },
//         (error) => {
//           console.log(error);
//           Alert.alert('Error', 'Unable to fetch location.');
//         },
//         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//       );
//     };
//     // getCurrentLocation();
//   }, []);

//   const markers = [
//     {
//       coordinate: { latitude: 21.1702, longitude: 72.8311 },
//       title: 'Location 1',
//       description: 'This is the first location',
//     },
//     {
//       coordinate: { latitude: 19.0760, longitude: 72.8777 },
//       title: 'Location 2',
//       description: 'This is the second location',
//     },
//     // {
//     //   coordinate: { latitude: 37.76825, longitude: -122.4824 },
//     //   title: 'Location 3',
//     //   description: 'This is the third location'
//     // },
//     // Add more markers here...
//   ];

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.greeting}>Hello, Nirmal!</Text>
//         <Image
//           source={{ uri: profilepic[1] }}
//           style={styles.profilePic}
//         />
//       </View>

//       <View style={styles.actions}>
//         <TouchableOpacity style={styles.actionButton}>
//           <Ionicons name="location-outline" size={30} color="#fff" />
//           {/* <Text style={styles.actionText}>Share Location</Text> */}
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.actionButton}>
//           <Ionicons name="person-add-outline" size={30} color="#fff" />
//           {/* <Text style={styles.actionText}>Find Friends</Text> */}
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.actionButton}>
//           <Ionicons name="notifications-outline" size={30} color="#fff" />
//           {/* <Text style={styles.actionText}>Notifications</Text> */}
//         </TouchableOpacity>
//       </View>

//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 21.1702,
//           longitude: 72.8311,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       >
//         {markers.map((marker, index) => (
//           <Marker
//             key={index}
//             coordinate={marker.coordinate}
//             title={marker.title}
//             description={marker.description}
//           >
//             <View style={styles.customMarker}>
//               <Image
//                 source={{ uri: profilepic[index]}}
//                 style={styles.markerImage}
//               />
//               <Text style={styles.markerText}>📍</Text>
//             </View>
//           </Marker>
//         ))}
//       </MapView>
//     </View>
//   );
// }

// export default Home;


import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import VectorIcon from '../../components/Vectoricon'; // Custom icon component
import MapView, { Marker } from 'react-native-maps'; // Map component for friend locations
import { styles } from './styles';
import colors from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { Ntext } from '../../components/Ntext';

const profilepic = ['https://instagram.fstv5-1.fna.fbcdn.net/v/t51.2885-19/472197390_586440157642792_6271528809390275856_n.jpg?_nc_ht=instagram.fstv5-1.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2AEXP5ZAtDPTTZV-08ZJbQrOt5F-kix59IiJ0AD7ufbv_B5N7kiCBxPfR1thrZp70oKMCZiQ4x2fJ_U90fNXylNU&_nc_ohc=Ld2T7piSNckQ7kNvgGuJWJg&_nc_gid=DvRWSIHSEvHgnGhfMpvytA&edm=ALGbJPMBAAAA&ccb=7-5&oh=00_AYENmbcu-DiY1t6yaPtg4SE-2cSuzlgE6MRHQ6_oBxJ5Xg&oe=67DB544D&_nc_sid=7d3ac5',
  'https://instagram.fstv5-1.fna.fbcdn.net/v/t51.2885-19/468343289_586828337078713_7405646675230505126_n.jpg?_nc_ht=instagram.fstv5-1.fna.fbcdn.net&_nc_cat=101&_nc_oc=Q6cZ2AHXUwgSlrHl8cO3E6idV1BArUeZeGild86H4ScH5uMVrHJU7tBt0A0MxI_iL7hQm52zQRci8b2ayTNnL41mDEok&_nc_ohc=Q0qudHJQpaIQ7kNvgG4NS4W&_nc_gid=hlvgPs9qcC_EZutcqkwtNg&edm=ALGbJPMBAAAA&ccb=7-5&oh=00_AYF3W630I0xElhyFgaxGn3Nij5U_4Ty-Dmnvrj6cO1FfUg&oe=67DB2221&_nc_sid=7d3ac5'];


const Home = () => {
  const navigation = useNavigation();
  const [mapVisible, setMapVisible] = React.useState(false);
  const [refreshing, setRefreshing] = useState(false);


  const [markers, setmarkers] = useState([
    {
      coordinate: { latitude: 21.1702, longitude: 72.8311 },
      title: 'Location 1',
      description: 'This is the first location',
    },
    {
      coordinate: { latitude: 19.0760, longitude: 72.8777 },
      title: 'Location 2',
      description: 'This is the second location',
    },
    // {
    //   coordinate: { latitude: 37.76825, longitude: -122.4824 },
    //   title: 'Location 3',
    //   description: 'This is the third location'
    // },
    // Add more markers here...
  ]);


  const onRefresh = () => {
    setRefreshing(true);
    // Simulated delay for network request
    setTimeout(() => setRefreshing(false), 2000);
  };

  const RefreshMap = () => {
    //heare i want to set the code for refress map and refind my currunt location
  }

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.navbar}>
        <Ntext title='CatChat' size={20} type='bold' color='#000' />
        <Ntext title='Search...' size={14} color={colors.Placeholdercolor} style={styles.searchBar} />
        <TouchableOpacity onPress={() => { navigation.navigate('notifiications') }} style={{ justifyContent: "center" }}>
          <VectorIcon name="notifications" type={'Ionicons'} size={25} color="#333" />
          {true &&
            <View style={styles.chat_Noti_Conte}>
              <Text style={styles.chat_Noti}>7</Text>
            </View>
          }
        </TouchableOpacity>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.black} />
        }
      >
        {/* Stories Section */}
        <View style={styles.storisContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[...Array(5)]}
            renderItem={(element) => {
              return (
                (element.index === 0) ?
                  <TouchableOpacity style={styles.myStory}>
                    <Image source={require('../../assets/images/cat.png')} style={styles.storyImage} />
                    <VectorIcon type={'MaterialIcons'} name={"add-circle"} color={"orange"} style={styles.addIcon} size={20} />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={styles.story}>
                    <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' }} style={styles.storyImage} />
                  </TouchableOpacity>
              )
            }}
          />
        </View>

        {/* Content Feed */}
        <View style={styles.feedContainer}>
          <FlatList
            data={[...Array(10)]}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.feed}
            renderItem={() => {
              return (
                <View style={styles.postCard}>
                  <View style={styles.postHeader}>
                    <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' }} style={styles.postUserPic} />
                    <Ntext title='User1' size={14} type='bold' color={colors.Placeholdercolor} />
                  </View>
                  <Image source={{ uri: 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=' }} style={styles.postImage} />
                  <View style={styles.postEngagementBar}>
                    <TouchableOpacity><VectorIcon name="heart" type={'EvilIcons'} size={25} color="#e74c3c" /></TouchableOpacity>
                    <TouchableOpacity><VectorIcon name="comment" type={'EvilIcons'} size={25} color="#333" /></TouchableOpacity>
                    <TouchableOpacity><VectorIcon name="share" type={'Feather'} size={20} color="#333" /></TouchableOpacity>
                  </View>
                  <Ntext title='Great view! #nature' size={14} style={styles.postCaption} color='#333' />
                </View>
              )
            }}
          />
        </View>
      </ScrollView>
      {/* Map Icon (Floating) */}
      <TouchableOpacity style={styles.mapIcon} onPress={() => setMapVisible(true)}>
        <VectorIcon name="map-marker" type={'FontAwesome'} size={25} color={colors.ThemeBorder} />
      </TouchableOpacity>

      {/* Modal for Map */}
      <Modal visible={mapVisible} transparent={true}>
        <View style={styles.mapModal}>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 21.1702,
                longitude: 72.8311,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {markers.map((marker, index) => (
                <Marker
                  key={index}
                  coordinate={marker.coordinate}
                  title={marker.title}
                  description={marker.description}
                >
                  <View style={styles.customMarker}>
                    <Image
                      source={{ uri: profilepic[index] }}
                      style={styles.markerImage}
                    />
                    <Ntext title='📍' size={18} type='bold' />
                  </View>
                </Marker>
              ))}
            </MapView>
          </View>
          <View style={styles.mapactionBotton}>
            <TouchableOpacity onPress={() => RefreshMap()} style={styles.closeMapBtn}>
              <VectorIcon name={'find-replace'} type={'MaterialIcons'} color={colors.white} size={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMapVisible(false)} style={styles.closeMapBtn}>
              <VectorIcon name={'close'} type={'AntDesign'} color={colors.white} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;
