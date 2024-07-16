import React from 'react';
import { TextInput } from 'react-native';
import Styles from '../assets/Styles';

export default function InputField({ placeholder, secureTextEntry, keyboardType, width, height, inputMode, setText }) {
    return (
        <TextInput
            style={[
                Styles.input_container,
                { width: width ? width : '90%', height: height ? height : 40 } // Set default height if not provided
            ]}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            inputMode={inputMode ? inputMode : ''}
            onChangeText={text => setText(text)}
        />
    );
}
