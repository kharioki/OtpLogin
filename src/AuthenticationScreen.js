import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export function AuthenticationScreen({ navigation }) {
  let textInput = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [focusInput, setFocusInput] = useState(true);

  const onChangePhone = number => {
    setPhoneNumber(number);
  };

  const onPressContinue = () => {
    // you need to add if for phone number validation
    if (phoneNumber) {
      navigation.navigate('InputOTP');
    }
  };

  const onChangeFocus = () => {
    setFocusInput(true);
  };

  const onChangeBlur = () => {
    setFocusInput(false);
  };

  useEffect(() => {
    textInput.focus();
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior="padding"
        style={styles.keyboardAvoidingView}>
        <Text style={styles.textTitle}>
          Please input your mobile phone number
        </Text>
        <View
          style={[
            styles.containerInput,
            { borderBottomColor: phoneNumber ? '#00bcd4' : 'gray' },
          ]}>
          <View>
            <Text style={styles.openDialogView}>+254 |</Text>
          </View>
          <TextInput
            ref={input => (textInput = input)}
            style={styles.phoneInputStyle}
            placeholder="720 123 456"
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={onChangePhone}
            secureTextEntry={false}
            onFocus={onChangeFocus}
            onBlur={onChangeBlur}
          />
        </View>

        <View style={styles.viewBottom}>
          <TouchableOpacity onPress={onPressContinue}>
            <View
              style={[
                styles.btnContinue,
                { backgroundColor: phoneNumber ? '#00bcd4' : 'gray' },
              ]}>
              <Text style={styles.textBottom}>Continue</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  textTitle: {
    fontSize: 15,
    marginTop: 50,
    marginBottom: 50,
  },
  containerInput: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomWidth: 1.5,
  },
  openDialogView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneInputStyle: {
    height: 50,
    flex: 1,
    marginLeft: 5,
  },
  viewBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 50,
  },
  textBottom: {
    color: '#ffffff',
    alignItems: 'center',
    fontSize: 15,
  },
  btnContinue: {
    width: 150,
    height: 50,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
