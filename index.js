import { registerRootComponent } from 'expo';
import React from 'react';
import { LogBox } from 'react-native'
import App from './App';

LogBox.ignoreLogs(["Setting a timer for a long period of time"])
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
