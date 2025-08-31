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

const NewRegister = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [userIdError, setUserIdError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSave = async () => {
    let valid = true;

    if (!userId.trim()) {
      setUserIdError('User ID is required');
      valid = false;
    } else {
      setUserIdError('');
    }

    if (!name.trim()) {
      setNameError('Name is required');
      valid = false;
    } else {
      setNameError('');
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
        const res = await axios.post(
          'http://192.168.1.36:5000/users/register',
          {
            name,
            email: userId,
            password,
          },
        );

        // console.log('Register success:', res.data);
        alert('Registered successfully! Please login.');

        // Navigate back to login
        navigation.goBack();
      } catch (error) {
        console.log('Register error:', error.response?.data || error.message);
        if (error.response?.data?.error) {
          alert(error.response.data.error);
        } else {
          alert('Registration failed. Please try again.');
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
          <Text style={styles.title}>Register</Text>

          {/* Name */}
          <Text style={styles.label}>Name</Text>
          <View style={styles.inputContainer}>
            <Icon
              name="person-outline"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <TextInput
              placeholder="Name"
              placeholderTextColor="#999"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>
          <Text style={styles.errorText}>{nameError ? nameError : ' '}</Text>

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

          {/* Save button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default NewRegister;

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
    marginBottom: 45,
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
  saveButton: {
    backgroundColor: Colors.buttonBlue,
    paddingVertical: 14,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '500',
  },
});
