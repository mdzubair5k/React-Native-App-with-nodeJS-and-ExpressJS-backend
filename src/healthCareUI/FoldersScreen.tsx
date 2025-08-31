import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

/**
 * FoldersScreen Component
 *
 * Displays a list of folders with a search bar and header.
 * Uses a static data array to render folder items in a FlatList.
 * Includes header icons and a styled search input.
 */

import Colors from '../constants/colors';

const folderData = [
  { id: 'A', name: 'Folder A' },
  { id: 'B', name: 'Folder B' },
  { id: 'C', name: 'Folder C' },
  { id: 'D', name: 'Folder D' },
  { id: 'E', name: 'Folder E' },
  { id: 'F', name: 'Folder F' },
];

const FoldersScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.folderItem}>
      <View>
        <Text style={styles.folderTitle}>{item.name}</Text>
        <Text style={styles.folderSub}>1 item · 1 KB</Text>
      </View>
      <Icon name="chevron-right" size={20} color="#000" />
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Folder</Text>
        <View style={styles.rightIcons}>
          <Icon name="bell" size={22} color="gray" style={styles.bellIcon} />
          <Icon name="user" size={22} color="gray" />
        </View>
      </View>

      <View style={styles.searchWrapper}>
        <Icon name="search" size={18} color="gray" style={styles.searchIcon} />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="#aaa"
        />
      </View>

      <View style={{ backgroundColor: '#fff' }}>
        <FlatList
          data={folderData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    marginTop: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.darkText,
  },
  rightIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  bellIcon: {
    position: 'relative',
  },
  searchWrapper: {
    margin: 20,
    backgroundColor: Colors.grayLight,
    borderRadius: 50,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.grayBorder,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: Colors.black,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  folderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grayLine,
  },
  folderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkText,
  },
  folderSub: {
    fontSize: 12,
    color: Colors.graySubText,
    marginTop: 2,
  },
});

export default FoldersScreen;
