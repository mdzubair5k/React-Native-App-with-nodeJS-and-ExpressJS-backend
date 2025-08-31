import React from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../constants/colors';

/**
 * HomeScreen Component
 *
 * Displays a home dashboard screen with a greeting, assigned admin,
 * a fixed search bar, summary cards (expiring documents & assigned patients),
 * and a list of recent uploads.
 *
 * Layout is scrollable, with styled cards and reusable icon components.
 */

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good Morning Williams</Text>
          <Text style={styles.subGreeting}>Assigned Admin: Ralph</Text>

          {/* Fixed Search Bar */}
          <View style={styles.searchContainer}>
            <Icon
              name="search"
              size={18}
              color="#888"
              style={styles.searchIcon}
            />
            <TextInput placeholder="Search" style={styles.searchInput} />
            <Icon name="bell" size={18} color="#888" style={styles.bellIcon} />
          </View>
        </View>

        {/* Scrollable middle content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Expiring Documents */}
          <View style={styles.card}>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>Expiring Documents</Text>
              <Text style={styles.cardDesc}>
                You have 2 Expiring Documents. Please upload
              </Text>
              <TouchableOpacity style={styles.cardButton}>
                <Text style={styles.cardButtonText}>Upload</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Assigned Patients */}
          <View style={styles.card}>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>Assigned Patients</Text>
              <Text style={styles.cardDesc}>
                You have been Assigned 7 Patients.
              </Text>
              <TouchableOpacity style={styles.cardButton}>
                <Text style={styles.cardButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Uploads */}
          <Text style={styles.sectionTitle}>Recent Uploads</Text>
          {[1, 2, 3, 4, 5].map(index => (
            <View key={index} style={styles.uploadCard}>
              <View style={styles.uploadLeft}>
                <View style={styles.iconBox}>
                  <Icon name="file-text" size={20} color="#004aad" />
                </View>
                <View>
                  <Text style={styles.uploadTitle}>
                    General <Text style={{ fontWeight: 'normal' }}>report</Text>
                  </Text>
                  <Text style={styles.uploadDate}>
                    Jul 5, 2023 <Text style={{ color: 'red' }}>Rejected</Text>
                  </Text>
                </View>
              </View>
              <Icon name="upload" size={18} color="#888" />
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: Colors.white,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
  },
  subGreeting: {
    color: Colors.darkGray,
    marginTop: 4,
    marginBottom: 16,
    textDecorationLine: 'underline',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 6,
    color: Colors.black,
  },
  searchIcon: {
    marginRight: 8,
  },
  bellIcon: {
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  cardDesc: {
    color: Colors.white,
    fontSize: 13,
    marginBottom: 8,
  },
  cardButton: {
    backgroundColor: Colors.white,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  cardButtonText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  uploadCard: {
    backgroundColor: Colors.cardLight,
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    backgroundColor: Colors.blueLight,
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  uploadTitle: {
    fontWeight: '700',
    fontSize: 14,
    color: Colors.black,
  },
  uploadDate: {
    fontSize: 12,
    color: Colors.grayText,
  },
});
