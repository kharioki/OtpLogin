import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Countries } from './countries';

export function AuthenticationScreen({ navigation }) {
  let textInput = useRef(null);
  let defaultCountryCode = '+254';
  let defaultMaskCountry = "720 000 000"
  const [phoneNumber, setPhoneNumber] = useState('');
  const [focusInput, setFocusInput] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataCountries, setDataCountries] = useState(Countries);
  const [countryCode, setCountryCode] = useState(defaultCountryCode);
  const [placeholder, setPlaceholder] = useState(defaultMaskCountry);

  const onShowHidenModal = () => {
    setModalVisible(!modalVisible);
  };

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

  const filterCountries = val => {
    if (val) {
      const countryData = dataCountries.filter(
        obj => obj.en.indexOf(val) > -1 || obj.dialCode.indexOf(val) > -1,
      );
      setDataCountries(countryData);
    } else {
      setDataCountries(dataCountries);
    }
  };

  const onCountryChange = item => {
    setCountryCode(item.dialCode);
    setPlaceholder(item.mask);
    onShowHidenModal();
  };

  let renderModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={onShowHidenModal}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.modalContainer}>
            <View style={styles.filterInputContainer}>
              <TextInput
                autoFocus={true}
                onChangeText={filterCountries}
                placeholder="filter"
                focusable={true}
                style={styles.focusInputStyle}
              />
            </View>
            <FlatList
              style={{ flex: 1 }}
              data={dataCountries}
              extraData={dataCountries}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback onPress={() => onCountryChange(item)}>
                  <View style={styles.countryContainer}>
                    <View style={styles.countryItem}>
                      <Text style={styles.countryItemName}>{item.en}</Text>
                      <Text style={styles.countryItemCode}>{item.dialCode}</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          </View>
        </SafeAreaView>

        <TouchableOpacity
          onPress={onShowHidenModal}
          style={styles.closeButtonStyle}>
          <Text style={styles.closeButtonText}>CLOSE</Text>
        </TouchableOpacity>
      </Modal>
    );
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
            { borderBottomColor: focusInput ? '#00bcd4' : '#ffffff' },
          ]}>
          <TouchableOpacity onPress={onShowHidenModal}>
            <View>
              <Text style={styles.openDialogView}>{countryCode + ' |'}</Text>
            </View>
          </TouchableOpacity>
          {renderModal()}
          <TextInput
            ref={input => (textInput = input)}
            style={styles.phoneInputStyle}
            placeholder={placeholder}
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={onChangePhone}
            secureTextEntry={false}
            onFocus={onChangeFocus}
            onBlur={onChangeBlur}
            autoFocus={focusInput}
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
  modalContainer: {
    paddingTop: 15,
    paddingLeft: 25,
    paddingRight: 25,
    flex: 1,
    backgroundColor: '#ffffff',
  },
  focusInputStyle: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
    color: '#424242',
  },
  countryContainer: {
    flex: 1,
    borderColor: 'black',
    borderTopWidth: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countryItem: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 5,
  },
  countryItemName: {
    fontSize: 16,
    flex: 1,
  },
  countryItemCode: {
    fontSize: 15,
  },
  filterInputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonStyle: {
    padding: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    padding: 5,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});
