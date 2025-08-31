import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../constants/colors';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [userIdError, setUserIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async () => {
    let valid = true;

    if (!userId.trim()) {
      setUserIdError('User ID is required');
      valid = false;
    } else {
      setUserIdError('');
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      try {
        const res = await axios.post('http://192.168.1.36:5000/users/login', {
          email: userId,
          password,
        });

        // console.log('Login success:', res.data);
        // alert('Login successful!');

        // Navigate to main screen
        navigation.replace('Main');

        // You can also store token if needed:
        // await AsyncStorage.setItem('token', res.data.token);
      } catch (error) {
        console.log('Login error:', error.response?.data || error.message);
        if (error.response?.data?.error) {
          alert(error.response.data.error);
        } else {
          alert('Login failed. Please try again.');
        }
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Login</Text>

          {/* User ID */}
          <Text style={styles.label}>User ID</Text>
          <View style={styles.inputContainer}>
            <Icon name="person" size={20} color="#666" style={styles.icon} />
            <TextInput
              placeholder="User ID"
              placeholderTextColor="#999"
              style={styles.input}
              value={userId}
              onChangeText={setUserId}
            />
          </View>
          <Text style={styles.errorText}>
            {userIdError ? userIdError : ' '}
          </Text>

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Icon
                name={passwordVisible ? 'visibility' : 'visibility-off'}
                size={20}
                color="#999"
                style={styles.icon}
              />
            </TouchableOpacity>
            <TextInput
              placeholder="***********"
              placeholderTextColor="#999"
              secureTextEntry={!passwordVisible}
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <Text style={styles.errorText}>
            {passwordError ? passwordError : ' '}
          </Text>

          {/* Register */}
          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => navigation.navigate('NewRegister')}
          >
            <Text style={styles.forgotPasswordText}>Register Yourself...</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.replace('Main')}>
            <Text style={styles.guest}>Guest User?</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'center',
    marginBottom: 70,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: Colors.black,
    fontWeight: '500',
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBg,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 1,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: Colors.borderGray,
  },
  icon: {},
  input: {
    flex: 1,
    paddingLeft: 8,
    color: Colors.black,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 4,
    minHeight: 16,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: Colors.linkBlue,
    fontSize: 13,
  },
  loginButton: {
    backgroundColor: Colors.buttonBlue,
    paddingVertical: 14,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '500',
  },
  guest: {
    alignSelf: 'flex-end',
    color: Colors.linkBlue,
  },
});
