import React, { useState, useContext } from 'react';
import { View, Text, Image, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import Button from '../Components/Button';
import Styles from '../assets/Styles';
import InputField from '../Components/InputField';
import { UserContext } from '../Store/store';

export default function SignIn({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const userContext = useContext(UserContext); // Access context once

    function signInHandler() {
        console.log(email, password);
        if (email.trim() === '' || password.trim() === '') {
            setError('Please enter all the fields.');
        } else if (!email.trim().includes('@') || !email.trim().endsWith('.com')) {
            setError('Please provide a valid email address');
        } else if (password.trim().length < 6) {
            setError('Password should contain more than 6 characters');
        } else {
            setError('');
            //TODO - add API call
            //     - manage state with context
            if (email === 'test@email.com' && password === 'test123') {
                userContext.addUser({
                    name: 'Test',
                    email: 'test@email.com',
                    phone: '123-456-789',
                    age: '20',
                    height: '170',
                    weight: '70',
                    target: 'Weight Loss'
                });
                navigation.navigate('Main');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }]
                });
            }
        }
    }

    function signUpHandler() {
        navigation.navigate('SignUp');
    }

    return (
        <View style={Styles.container}>
            <StatusBar barStyle="default" />
            <View style={Styles.sub_container_a}>
                <Image style={Styles.logo} source={require('../assets/icons/app-logo.png')} />
            </View>
            <KeyboardAvoidingView
                style={[Styles.sub_container_b, {justifyContent:"flex-start"}]}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={30}>
                <Text style={Styles.form_heading}>SignIn</Text>
                <Text style={Styles.errorText}>{error}</Text>
                <InputField
                    style={Styles.input_container}
                    placeholder="Email"
                    autoCapitalize={false}
                    inputMode="email"
                    keyboardType="email-address"
                    setText={setEmail}
                />
                <InputField
                    style={Styles.input_container}
                    placeholder="Password"
                    secureTextEntry
                    setText={setPassword}
                />
                <View style={Styles.sub_container_horizontal}>
                    <Button text="Sign up" onPress={signUpHandler} />
                    <Button text="Sign in" onPress={signInHandler} />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}
