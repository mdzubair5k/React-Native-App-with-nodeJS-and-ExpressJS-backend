import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import * as Yup from 'yup';
import Colors from '../constants/colors';

// Update this to your local or deployed backend URL
const API_URL = 'http://192.168.1.44:5000/messages';

// Frontend Yup schema
const messageSchema = Yup.object().shape({
  content: Yup.string()
    .trim()
    .min(1, 'Message cannot be empty')
    .max(500, 'Message too long')
    .required('Message is required'),
});

/**
 * ChatScreen Component
 *
 * This component displays a simple chat UI that fetches and displays messages
 * from a backend API (currently using a placeholder URL). It handles loading states,
 * empty data states, and error states using a modal popup.
 */

const ChatScreen = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [newMsg, setNewMsg] = useState('');
  const [editMsg, setEditMsg] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.length === 0) {
        throw new Error('No data received from backend');
      }

      setMessages(data);
    } catch (err) {
      setMessages([]);
      setError(err.message);
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const sendMessage = async () => {
    try {
      await messageSchema.validate({ content: newMsg });

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMsg, is_user: true }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, data]);
      setNewMsg('');
    } catch (validationErr) {
      if (validationErr.name === 'ValidationError') {
        alert(validationErr.message);
      } else {
        setError('Error sending message');
        setShowErrorModal(true);
      }
    }
  };

  const startEdit = (id, content) => {
    setEditId(id);
    setEditMsg(content);
  };

  const updateMessage = async () => {
    try {
      await messageSchema.validate({ content: editMsg });

      const response = await fetch(`${API_URL}/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editMsg }),
      });

      const data = await response.json();
      setMessages(prev =>
        prev.map(msg =>
          msg.id === editId ? { ...msg, content: data.content } : msg,
        ),
      );
      setEditId(null);
      setEditMsg('');
    } catch (validationErr) {
      if (validationErr.name === 'ValidationError') {
        alert(validationErr.message);
      } else {
        setError('Error updating message');
        setShowErrorModal(true);
      }
    }
  };

  const deleteMessage = async id => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setMessages(prev => prev.filter(msg => msg.id !== id));
    } catch (err) {
      setError('Error deleting message');
      setShowErrorModal(true);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={{ marginTop: 10 }}>Loading chat...</Text>
      </View>
    );
  }

  if (messages.length === 0 && !error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: Colors.mediumGray }}>No messages found.</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={10}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.adminName}>Chats</Text>
        </View>

        {/* Chat Area */}
        <View style={styles.chatWrapper}>
          <ScrollView
            style={styles.chatArea}
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.dateText}>Today</Text>

            {messages.map(msg => (
              <View
                key={msg.id}
                style={[msg.is_user ? styles.rightMessage : styles.leftMessage]}
              >
                <Text
                  style={[
                    styles.messageText,
                    msg.is_user && { color: 'white' },
                  ]}
                >
                  {msg.content}
                </Text>
                <Text
                  style={[
                    styles.messageTime,
                    msg.is_user && { color: 'white' },
                  ]}
                >
                  {new Date(msg.time).toLocaleTimeString()}
                </Text>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <TouchableOpacity
                    onPress={() => startEdit(msg.id, msg.content)}
                  >
                    <Text style={{ color: 'blue', marginTop: 5 }}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => deleteMessage(msg.id)}>
                    <Text style={{ color: 'red', marginTop: 5 }}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Input Area */}
        {/* <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMsg}
            onChangeText={setNewMsg}
            placeholder="Type a message"
          />
          <Button title="Send" onPress={sendMessage} />
        </View> */}

        {/* Edit Modal */}
        <Modal visible={editId !== null} transparent animationType="slide">
          <View style={styles.modalBackground}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Edit Message</Text>
              <TextInput
                value={editMsg}
                onChangeText={setEditMsg}
                style={styles.modalInput}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={updateMessage}
                >
                  <Text style={styles.modalButtonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: 'gray' }]}
                  onPress={() => {
                    setEditId(null);
                    setEditMsg('');
                  }}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Error Modal */}
        <Modal
          transparent
          animationType="fade"
          visible={showErrorModal}
          onRequestClose={() => setShowErrorModal(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Error</Text>
              <Text style={styles.modalMessage}>{error}</Text>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    { backgroundColor: Colors.primary },
                  ]}
                  onPress={() => {
                    setShowErrorModal(false);
                    fetchMessages();
                  }}
                >
                  <Text style={styles.modalButtonText}>Retry</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    { backgroundColor: Colors.darkGray },
                  ]}
                  onPress={() => setShowErrorModal(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.white,
  },
  adminName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  chatWrapper: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  chatArea: {
    flex: 1,
  },
  dateText: {
    textAlign: 'center',
    color: Colors.mediumGray,
    fontSize: 12,
    marginVertical: 10,
  },
  leftMessage: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    marginRight: 60,
    maxWidth: '75%',
    elevation: 1,
  },
  rightMessage: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    marginLeft: 60,
    maxWidth: '75%',
  },
  messageText: {
    fontSize: 14,
    marginBottom: 4,
  },
  messageTime: {
    fontSize: 10,
    color: Colors.darkGray,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
