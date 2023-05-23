/* eslint-disable react-native/no-inline-styles */



import { View, Text, TouchableOpacity,  StyleSheet, TextInput, } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {  useRouter} from "expo-router";
import {} from "expo-status-bar";
import { KeyboardAvoidingView } from "native-base";


const Verification = () => {
  
  const clockCall = useRef();
  const defaultCountdown = 60;
  const [countdown, setCountdown] = useState(defaultCountdown);
const navigation=useRouter()
  const textInput = useRef(null);
const [enableResend, setEnableResend ]=useState(false)
const decrementClock =useCallback(()=> {
  if (countdown === 0) {
    setEnableResend (true);
    setCountdown(0);
    clearInterval(clockCall.current);
  } else {
    setCountdown(countdown - 1);
  }
}, [countdown])
  useEffect(() => {
    clockCall.current= window.setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockCall.current);
    };
  }, [decrementClock]);

    const [otpCode, setOtpCode] = useState(['']);
    const handleOtpInputChange = (index, text) => {
        const updatedOtpCode = [...otpCode];
        updatedOtpCode[index] = text;
        setOtpCode(updatedOtpCode);
      };

        const onResendOTP = () => {
    if (enableResend) {
      setCountdown(defaultCountdown);
      setEnableResend (false);
      clearInterval(clockCall.current);

      clockCall.current = window.setInterval(() => {
        decrementClock();
      }, 1000);
    }
  };
      const handlePasteFromClipboard =  (text) => {
   
      if(text.length<=1) {
        const updatedOtpCode = [...otpCode];
        updatedOtpCode[0] = text;
        setOtpCode(updatedOtpCode);
      }else {
        const formattedOTP= text.slice(0, 6); 
        setOtpCode([...formattedOTP]);
      }
    
    
      };
        useEffect(() => {
    textInput.current?.focus();
  
  }, []);
  const handleDeleteKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace' && index===5) {
      // delete the entire code
    setOtpCode([''])
    } 
    if(event.nativeEvent.key !== 'Backspace' && index===5) {
      const updatedOtpCode=[...otpCode]
      updatedOtpCode[index] = ""
      setOtpCode(updatedOtpCode);
    }
  };
  const onChangeNumber = () => {
   navigation.goBack();
  };

  useEffect(()=> {
    if (otpCode.length === lengthInput) {
      navigation.navigate('Home');
    }
  }, [otpCode])
  return (
    <View style={styles.container} className='bg-white'>
    
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior="padding"
        style={styles.keyboardAvoidingView}>
        <Text style={styles.textTitle}>Enter the OTP code sent via SMS</Text>
        <View>
  
          <View style={styles.inputContainer}>
          {Array(6).fill(0).map((_, i)=> (
  <TextInput
  ref={i===0? textInput : null}
key={i}

  style={styles.cellView}
  keyboardType="numeric"
    maxLength={i===0? 6: 1}
onKeyPress={(e)=>handleDeleteKeyPress(e, i)}
    onChangeText={text => i===0? handlePasteFromClipboard(text): handleOtpInputChange(i, text)}
    value={otpCode[i] || ''}
  />
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

export default Verification

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
    paddingHorizontal: 11,
    width: 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: "rgb(20 184 166)",
    fontSize: 24,
    lineHeight:32
  },
  cellText: {
    textAlign: 'center',
    fontSize: 16,
  },
  viewBottom: {
    flexDirection: 'row',
    flex: 1,
    // justifyContent: 'flex-end',
    position:"absolute",
    alignItems: 'flex-end',
    bottom: 50,
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