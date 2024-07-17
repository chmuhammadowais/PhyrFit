import React from 'react';
import { TextInput } from 'react-native';
import Styles from '../assets/Styles';

export default function InputField({ placeholder, autoCapitalize, secureTextEntry, keyboardType, width, height, inputMode, setText, text}) {
    return (
        <TextInput
            style={[
                Styles.input_container,
                { width: width ? width : '100%', height: height ? height : 40 } // Set default height if not provided
            ]}
            placeholder={placeholder}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            inputMode={inputMode ? inputMode : ''}
            onChangeText={text => setText(text)}
            value={text}
        />
    );
}
