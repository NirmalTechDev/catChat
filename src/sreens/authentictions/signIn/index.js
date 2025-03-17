import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, Alert } from 'react-native';
import colors from '../../../utils/colors';
import { useToast } from 'react-native-toast-notifications';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import validator from 'validator';
import { styles } from './styles';

const SignIn = ({ navigation }) => {
    const Toast = useToast();
    const [countryCode, setCountryCode] = useState('+91');
    const [mobileNumber, setMobileNumber] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState(null);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    });

    const clearStates = () => {
        setConfirm(null);
        setName('');
        setEmail('');
        setPassword('');
        setMobileNumber('');
    }

    function onAuthStateChanged(user) {
        if (user) {
            console.log(user);

            navigation.navigate('Home');
            // Alert.alert('Jay Dwarikadhish')
            // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
            // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
            // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
            // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
        }
    }

    const setData = async () => {
        try {
            // Using set() to create or update a document in Firestore
            await firestore()
                .collection('users') // Collection name
                .add({
                    name: name,
                    email: email,
                    password: password,
                    number: mobileNumber,
                });

            console.log('User data set successfully!');
        } catch (error) {
            console.error('Error setting document: ', error);
        }
    };



    // const handleSendOTP = async () => {
    //     if (mobileNumber.length === 13) {
    //         try {
    //             setLoading(true);
    //             const confirmation = await auth().signInWithPhoneNumber(mobileNumber);
    //             setConfirm(confirmation);
    //             setData();
    //             setLoading(false);
    //         } catch (error) {
    //             console.log(error);
    //             Toast.show('number not valid', {
    //                 type: 'warning',
    //                 placement: 'bottom',
    //                 duration: 1300,
    //                 offset: 30,
    //                 animationType: 'slide-in',
    //             });
    //             setLoading(false);
    //         }
    //     } else {
    //         Toast.show('Please enter a valid 10-digit mobile number', {
    //             type: 'warning',
    //             placement: 'bottom',
    //             duration: 1300,
    //             offset: 30,
    //             animationType: 'slide-in',
    //         });
    //     }
    // };

    const handleSendOTP = async () => {
        // Trim whitespace from inputs
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedMobileNumber = mobileNumber.trim();
        const trimmedPassword = password.trim();

        // Validation
        if (trimmedName.length === 0) {
            Toast.show('Please enter your name.', {
                type: 'warning',
                position: 'bottom',
                visibilityTime: 1300,
                autoHide: true,
            });
            return;
        }

        if (!validator.isEmail(trimmedEmail)) {
            Toast.show('Please enter a valid email address.', {
                type: 'warning',
                position: 'bottom',
                visibilityTime: 1300,
                autoHide: true,
            });
            return;
        }

        if (trimmedPassword.length < 6) { // Minimum 6 characters for password
            Toast.show('Password must be at least 6 characters long.', {
                type: 'warning',
                position: 'bottom',
                visibilityTime: 1300,
                autoHide: true,
            });
            return;
        }

        if (trimmedMobileNumber.length !== 13 || !validator.isNumeric(trimmedMobileNumber)) {
            Toast.show('Please enter a valid 10-digit mobile number.', {
                type: 'warning',
                position: 'bottom',
                visibilityTime: 1300,
                autoHide: true,
            });
            return;
        }

        // Sending OTP
        if (trimmedMobileNumber.length === 13) {
            try {
                setLoading(true);
                const confirmation = await auth().signInWithPhoneNumber('+919664648614'); // use this var  trimmedMobileNumber
                setConfirm(confirmation);
                setData(); // Assuming this is to reset form fields
                setLoading(false);

                Alert.alert('enter OTP', '131313')
            } catch (error) {
                console.error(error);
                Toast.show('There was an issue with your mobile number.', {
                    type: 'warning',
                    position: 'bottom',
                    visibilityTime: 1300,
                    autoHide: true,
                });
                setLoading(false);
            }
        }
    };

    const handleVerifyOTP = async () => {
        if (otp.length === 6) {
            // Logic to verify OTP
            try {
                setLoading(true);
                await confirm.confirm(otp);
                Toast.show('OTP Verified Successfully!', {
                    type: 'success',
                    placement: 'bottom',
                    duration: 1300,
                    offset: 30,
                    animationType: 'slide-in',
                });
                clearStates();
            } catch (error) {
                console.log('Invalid code.');
                Toast.show('Invalid code', {
                    type: 'danger',
                    placement: 'bottom',
                    duration: 1300,
                    offset: 30,
                    animationType: 'slide-in',
                });
                setLoading(false);
            }
            setLoading(false);
        } else {
            Toast.show('Please enter a valid 6-digit OTP', {
                type: 'warning',
                placement: 'bottom',
                duration: 1300,
                offset: 30,
                animationType: 'slide-in',
            });
        }
    };

    if (!confirm) {
        return (

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
                    <ScrollView style={styles.scrollContainer}>
                        <View style={styles.felds_container}>
                            <Text style={styles.header}>LogIn</Text>

                            <TextInput
                                style={[
                                    styles.input,
                                    mobileNumber.length && {
                                        borderColor: colors.ThemeBorder,
                                    },
                                ]}
                                placeholder="Name"
                                placeholderTextColor={colors.ThemeButton}
                                value={name}
                                onChangeText={setName}
                            />

                            <TextInput
                                style={[
                                    styles.input,
                                    mobileNumber.length && {
                                        borderColor: colors.ThemeBorder,
                                    },
                                ]}
                                placeholder="Email"
                                placeholderTextColor={colors.ThemeButton}
                                keyboardType="email-address"
                                value={email}
                                onChangeText={setEmail}
                            />
                            <TextInput
                                style={[
                                    styles.input,
                                    mobileNumber.length && {
                                        borderColor: colors.ThemeBorder,
                                    },
                                ]}
                                placeholder="Password"
                                placeholderTextColor={colors.ThemeButton}
                                keyboardType="email-address"
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TextInput
                                style={[
                                    styles.input,
                                    mobileNumber.length && {
                                        borderColor: colors.ThemeBorder,
                                    },
                                ]}
                                placeholder="Mobile Number"
                                placeholderTextColor={colors.ThemeButton}
                                keyboardType="numeric"
                                maxLength={13}
                                value={mobileNumber}
                                onChangeText={setMobileNumber}
                            />

                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleSendOTP}
                            >
                                {
                                    loading ? <ActivityIndicator style={styles.loader} size={20} color={colors.ThemeBG} /> :
                                        <Text style={[styles.buttonText]}>Send OTP</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>

        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.felds_container}>
                <Text style={styles.header}>Enter OTP</Text>
                <View style={styles.subHeader_parent}>
                    <Text style={styles.subHeader}>OTP sent to  </Text>
                    <Text style={styles.numbers}>{mobileNumber}</Text>
                </View>

                <TextInput
                    style={[styles.input, otp.length && { borderColor: colors.ThemeBorder }]}
                    placeholder="Enter OTP"
                    placeholderTextColor={colors.ThemeText}
                    keyboardType="numeric"
                    maxLength={6}
                    value={otp}
                    onChangeText={setOtp}
                />

                <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
                    {
                        loading ? <ActivityIndicator style={styles.loader} size={20} color={colors.ThemeBG} /> :
                            <Text style={styles.buttonText}>Verify OTP</Text>
                    }
                </TouchableOpacity>
            </View>
        </View>
    );

    // return (
    //     <View style={styles.container}>
    //         <View style={styles.design_container}>
    //             <View style={styles.image_container}>
    //                 <Image source={require('../assets/images/login1.jpg')} style={styles.image} />
    //             </View>
    //         </View>
    //         <View style={styles.felds_container}>
    //             <Text style={styles.header}>LogIn</Text>

    //             <TextInput
    //                 style={[styles.input, isFocus && { borderWidth:1, borderColor:colors.ThemeText }]}
    //                 placeholder="Mobile Number"
    //                 keyboardType="numeric"
    //                 maxLength={10}
    //                 value={mobileNumber}
    //                 onChangeText={setMobileNumber}
    //                 onFocus={() => setIsFocus(true)}
    //                 onBlur={() => setIsFocus(false)}
    //             />

    //             <TouchableOpacity
    //                 style={styles.button}
    //                 onPress={handleSendOTP}
    //             >
    //                 <Text style={styles.buttonText}>Send OTP</Text>
    //             </TouchableOpacity>
    //             <View style={styles.note}>
    //                 <Pressable onPress={() => { navigation.navigate('register') }}>
    //                     <Text>Register!</Text>
    //                 </Pressable>
    //             </View>
    //         </View>
    //     </View>
    // );
};

// const SignIn = () => {

//         const Toast = useToast();
//     const [countryCode, setCountryCode] = useState('+91');
//     const [mobileNumber, setMobileNumber] = useState('');
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirm, setConfirm] = useState(null);
//     const [otp, setOtp] = useState('');
//     const [loading, setLoading] = useState(false);

//     return(
//         <View style={styles.container}>
//             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//               <KeyboardAvoidingView 
//                     behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//                     keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
//                     <ScrollView style={styles.scrollContainer}>
//                         <View style={styles.felds_container}>
//                             <Text style={styles.header}>LogIn</Text>

//                             <TextInput
//                                 style={[
//                                     styles.input,
//                                     mobileNumber.length && {
//                                         borderColor: colors.ThemeBorder,
//                                     },
//                                 ]}
//                                 placeholder="Email"
//                                 placeholderTextColor={colors.ThemeButton}
//                                 keyboardType="email-address"
//                                 value={email}
//                                 onChangeText={setEmail}
//                             />

//                             <TouchableOpacity
//                                 style={styles.button}
//                                 // onPress={handleSendOTP}
//                             >
//                                 {
//                                     loading ? <ActivityIndicator style={styles.loader} size={20} color={colors.ThemeBG} /> :
//                                         <Text style={[styles.buttonText]}>Send OTP</Text>
//                                 }
//                             </TouchableOpacity>
//                         </View>
//                     </ScrollView>
//                 </KeyboardAvoidingView>
//             </TouchableWithoutFeedback>
//         </View>
//     )
// }

export default SignIn;
