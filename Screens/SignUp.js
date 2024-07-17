import React, { useState, useEffect } from 'react';
import { View, Text, Image, StatusBar, KeyboardAvoidingView, Keyboard, Platform, ScrollView } from 'react-native';
import Button from '../Components/Button';
import Styles from '../assets/Styles';
import InputField from '../Components/InputField';

export default function SignUp() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");
    // const [selectedItem, setSelectedItem] = useState(null);
    const [error, setError] = useState("");
    const [isKeyboardAvailable, setKeyboardAvailable] = useState(false);
    // const items = [
    //     { label: "Loose Weight", value: "Loose Weight" },
    //     { label: "Gain Weight", value: "Gain Weight" },
    //     { label: "Build Muscle", value: "Build Muscle" }
    // ];

    function handleSignup() {
        console.log(fullName, email, password, phone, age, height, weight, selectedItem);
        if (fullName.trim() === "" || email.trim() === "" || password.trim() === "" || phone.trim() === "" || age.trim() === "" || height.trim() === "" || weight.trim() === "") {
            setError("Please enter all the fields.");
        } else if (!email.trim().includes('@') || !email.trim().endsWith('.com')) {
            setError("Please provide a valid email address");
        } else if (password.trim().length < 6) {
            setError("Password should contain more than 6 characters");
        } else if (Number(age.trim()) <= 0 || Number(age.trim() <= 12)) {
            setError("Age requirement is 13 and above");
        } else {
            setError("");
            //TODO - add API call
            //     - check manage the state
        }
    }

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardAvailable(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardAvailable(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };

    }, [setKeyboardAvailable]);

    return (
        <View style={Styles.container}>
            <StatusBar barStyle={'default'} />
            <View style={Styles.sub_container_a}>
                <Image style={Styles.logo} source={require('../assets/icons/app-logo.png')} />
            </View>
            <KeyboardAvoidingView
                style={Styles.sub_container_b}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={50}>
                <Text style={Styles.form_heading}>SignUp</Text>
                <Text style={Styles.errorText}>{error}</Text>
                <ScrollView contentContainerStyle={Styles.scrollContainer}>
                    <InputField style={Styles.input_container} placeholder={'Full Name'} setText={setFullName} />
                    <InputField style={Styles.input_container} placeholder={'Email'} inputMode={'email'} keyboardType={'email-address'} setText={setEmail} />
                    <InputField style={Styles.input_container} placeholder={'Password'} secureTextEntry setText={setPassword} />
                    <InputField style={Styles.input_container} placeholder={'Phone'} inputMode={'tel'} setText={setPhone} />
                    <InputField style={Styles.input_container} placeholder={'Age'} keyboardType={'numeric'} setText={setAge} />
                    <View style={Styles.sub_container_horizontal}>
                        <InputField placeholder={'Height (cm)'} secureTextEntry={false} keyboardType={'decimal-pad'} width={'48%'} setText={setHeight} />
                        <InputField placeholder={'Weight (KG)'} secureTextEntry={false} keyboardType={'decimal-pad'} width={'48%'} setText={setWeight} />
                    </View>
                </ScrollView>
                <Button text={'Sign up'} onPress={handleSignup} customStyle={isKeyboardAvailable ? {marginBottom: -20} : {}}/>
            </KeyboardAvoidingView>
        </View>
    );
}