import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from './src/HomeScreen';
import { AuthenticationScreen } from './src/AuthenticationScreen';
import { InputOTPScreen } from './src/InputOTPScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Authentication">
        <Stack.Screen
          name="Authentication"
          component={AuthenticationScreen}
        />
        <Stack.Screen
          name="InputOTP"
          component={InputOTPScreen}
          options={{ title: 'Input OTP', headerBackTitle: '' }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home', headerBackTitle: '', headerLeft: null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
