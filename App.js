// In App.js in a new project
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import Route from './src/navigators/Route';
import SplashScreen from './src/screens/SplashScreen';
import {COLORS} from './src/common';
function App() {
  return (
    <View style={styles.container}>
      <Route />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
export default App;
