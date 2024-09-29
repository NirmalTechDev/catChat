import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable, Image, Alert, ScrollView, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import colors from '../helper/constant';
import { useToast } from 'react-native-toast-notifications';
import auth from '@react-native-firebase/auth';
const SignIn = ({ navigation }) => {
    const Toast = useToast();
    const [countryCode, setCountryCode] = useState('+91')
    const [mobileNumber, setMobileNumber] = useState('');
    const [confirm, setConfirm] = useState(null);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    function onAuthStateChanged(user) {
        if (user) {
            console.log(user);

            navigation.navigate('home');
            // Alert.alert('Jay Dwarikadhish')
            // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
            // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
            // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
            // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
        }
    }

    const handleSendOTP = async () => {
        if (mobileNumber.length === 13) {
            try {
                setLoading(true);
                const confirmation = await auth().signInWithPhoneNumber(mobileNumber);
                setConfirm(confirmation);
                setLoading(false);
            } catch (error) {
                console.log(error);
                Toast.show("number not valid", {
                    type: "warning",
                    placement: "bottom",
                    duration: 1300,
                    offset: 30,
                    animationType: "slide-in",
                });
                setLoading(false);
            }
        } else {
            Toast.show("Please enter a valid 10-digit mobile number", {
                type: "warning",
                placement: "bottom",
                duration: 1300,
                offset: 30,
                animationType: "slide-in",
            });
        }
    };

    const handleVerifyOTP = async () => {
        if (otp.length === 6) {
            // Logic to verify OTP
            try {
                setLoading(true);
                await confirm.confirm(otp);
                Toast.show("OTP Verified Successfully!", {
                    type: "success",
                    placement: "bottom",
                    duration: 1300,
                    offset: 30,
                    animationType: "slide-in",
                });
            } catch (error) {
                console.log('Invalid code.');
                Toast.show("Invalid code", {
                    type: "danger",
                    placement: "bottom",
                    duration: 1300,
                    offset: 30,
                    animationType: "slide-in",
                });
                setLoading(false);
            }
            setLoading(false);
        } else {
            Toast.show("Please enter a valid 6-digit OTP", {
                type: "warning",
                placement: "bottom",
                duration: 1300,
                offset: 30,
                animationType: "slide-in",
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
                                        borderColor: colors.ThemeBorder
                                    }
                                ]}
                                placeholder="Name"
                                placeholderTextColor={colors.ThemeButton}
                                maxLength={13}
                                value={mobileNumber}
                                onChangeText={setMobileNumber}
                            />

                            <TextInput
                                style={[
                                    styles.input,
                                    mobileNumber.length && {
                                        borderColor: colors.ThemeBorder
                                    }
                                ]}
                                placeholder="Email"
                                placeholderTextColor={colors.ThemeButton}
                                keyboardType="numeric"
                                maxLength={13}
                                value={mobileNumber}
                                onChangeText={setMobileNumber}
                            />
                            <TextInput
                                style={[
                                    styles.input,
                                    mobileNumber.length && {
                                        borderColor: colors.ThemeBorder
                                    }
                                ]}
                                placeholder="Password"
                                placeholderTextColor={colors.ThemeButton}
                                keyboardType="numeric"
                                maxLength={13}
                                value={mobileNumber}
                                onChangeText={setMobileNumber}
                            />
                            <TextInput
                                style={[
                                    styles.input,
                                    mobileNumber.length && {
                                        borderColor: colors.ThemeBorder
                                    }
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.ThemeBG,
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
    },
    felds_container: {
        flex: 1,
        justifyContent: "center",
        paddingTop: 20,
        alignItems: 'center',
    },
    header: {
        fontSize: 35,
        alignSelf: "flex-start",
        marginLeft: 45,
        fontWeight: 'bold',
        marginVertical: 20,
        color: colors.ThemeBorder
    },
    subHeader_parent: {
        flexDirection: "row",
        alignSelf: "flex-start",
        marginLeft: 45,
    },
    subHeader: {
        fontSize: 16,
        marginBottom: 20,
        color: '#e09f3e',
        fontWeight: '600',
        alignSelf: 'flex-start',
    },
    numbers: {
        fontSize: 16,
        marginBottom: 20,
        color: colors.ThemeBG,
        fontWeight: '600',
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 3,
        paddingHorizontal: 3,
    },
    input: {
        width: '80%',
        height: 50,
        borderColor: colors.ThemeButton,
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginVertical: 20,
        fontSize: 16,
        backgroundColor: colors.ThemeBG,
        color: colors.ThemeButton,
        placeholderTextColor: colors.ThemeButton,
    },
    button: {
        backgroundColor: colors.ThemeBorder,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
    },
    loader: {
        marginHorizontal: 24,
    },
    buttonText: {
        fontWeight: '900',
        color: colors.ThemeBG,
        fontSize: 17,
    },
});

export default SignIn;
