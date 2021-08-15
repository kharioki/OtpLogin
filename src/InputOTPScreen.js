/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

export function InputOTPScreen({ navigation }) {
  let textInput = useRef(null);
  let clockCall = useRef(null);
  const lengthInput = 6;
  const defaultCountdown = 30;
  const [internalVal, setInternalVal] = useState('');
  const [countdown, setCountdown] = useState(defaultCountdown);
  const [enableResend, setEnableResend] = useState(false);

  useEffect(() => {
    clockCall.current = setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockCall);
    };
  }, []);

  const decrementClock = () => {
    if (countdown === 0) {
      setEnableResend(true);
      setCountdown(0);
      clearInterval(clockCall);
    } else {
      setCountdown(countdown - 1);
    }
  };

  const onChangeText = val => {
    setInternalVal(val);
    if (val.length === lengthInput) {
      navigation.navigate('Home');
    }
  };

  const onChangeNumber = () => {
    navigation.goBack();
  };

  const onResendOTP = () => {
    if (enableResend) {
      setCountdown(defaultCountdown);
      setEnableResend(false);
      clearInterval(clockCall);

      clockCall.current = setInterval(() => {
        decrementClock();
      }, 1000);
    }
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
        <Text style={styles.textTitle}>Please the OTP code sent via SMS</Text>
        <View>
          <TextInput
            ref={input => (textInput = input)}
            style={{ width: 0, height: 0 }}
            onChangeText={onChangeText}
            value={internalVal}
            maxLength={lengthInput}
            returnKeyType="done"
            keyboardType="numeric"
          />
          <View style={styles.inputContainer}>
            {Array(lengthInput)
              .fill(0)
              .map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.cellView,
                    {
                      borderBottomColor:
                        i === internalVal.length ? '#fb6c6a' : '#234db7',
                    },
                  ]}>
                  <Text
                    style={styles.cellText}
                    onPress={() => textInput.focus()}>
                    {internalVal && internalVal.length > 0
                      ? internalVal[i]
                      : ' '}
                  </Text>
                </View>
              ))}
          </View>
        </View>

        <View style={styles.viewBottom}>
          <TouchableOpacity onPress={onChangeNumber}>
            <View style={styles.btnChangeNumber}>
              <Text style={styles.textChange}>Change number</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onResendOTP}>
            <View style={styles.btnResend}>
              <Text
                style={[
                  styles.textResend,
                  { color: enableResend ? '#234db7' : 'gray' },
                ]}>
                Resend OTP ({countdown})
              </Text>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellView: {
    paddingVertical: 11,
    width: 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1.5,
  },
  cellText: {
    textAlign: 'center',
    fontSize: 16,
  },
  viewBottom: {
    flexDirection: 'row',
    flex: 1,
    // justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 50,
  },
  btnChangeNumber: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textChange: {
    color: '#234db7',
    alignItems: 'center',
    fontSize: 16,
  },
  btnResend: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  textResend: {
    color: 'gray',
    alignItems: 'center',
    fontSize: 16,
  },
});
