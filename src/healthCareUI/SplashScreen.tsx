import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constants/colors';

/**
 * SplashScreen Component
 *
 * Displays the app splash logo when the app launches.
 * After 1 second, automatically navigates to the Login screen.
 */

const SplashScreen = () => {
  const navigation = useNavigation();

  // replace the screen to login screen after one second
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login' as never);
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/home.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    color: Colors.white,
    flex: 1,
  },
  logo: {
    width: 257,
    height: 119,
    marginLeft: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
  },
});
