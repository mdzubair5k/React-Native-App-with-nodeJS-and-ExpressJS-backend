import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Image,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../constants/colors';
// import profileImg from '../../assets/images/profileImg.jpg';

/**
 * PatientDetailScreen Component
 *
 * Displays detailed information about a single patient.
 * Includes avatar/photo, name, assigned PCA, and all profile details.
 * Layout is scrollable and styled using a card layout.
 */

const PatientDetailScreen = () => {
  const patient = {
    name: 'James J. Cole',
    assignedPCA: 'Ralph',
    email: 'Abc21@gmail.com',
    phone: '+33 9345127854',
    dob: '10/12/1997',
    maId: '1234',
    insurance: 'abc insurance',
    address: 'R45A Advocate colony, Denver, 089809 USA',
    photoUrl: require('../../assets/images/profileImg.jpg'),
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Header */}
      <View style={styles.header}>
        {/* Uncomment if you want back button */}
        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={22} color="#000" />
        </TouchableOpacity> */}
        <Text style={styles.headerText}>Patient</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Scrollable Card Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            {patient.photoUrl ? (
              <Image
                source={
                  typeof patient.photoUrl === 'string'
                    ? { uri: patient.photoUrl }
                    : patient.photoUrl
                }
                style={styles.avatarImage}
              />
            ) : (
              <View style={styles.avatarCircle}>
                <Icon name="user" size={40} color="#0047AB" />
              </View>
            )}
          </View>

          {/* Name & PCA */}
          <Text style={styles.name}>{patient.name}</Text>
          <Text style={styles.assignedPCA}>
            <Text style={{ textDecorationLine: 'underline', color: '#888' }}>
              Assigned PCA:
            </Text>
            {patient.assignedPCA}
          </Text>

          {/* Info Fields */}
          <View style={styles.infoGroup}>
            <LabelValue label="Email" value={patient.email} />
            <LabelValue label="Phone" value={patient.phone} />
            <LabelValue label="DOB" value={patient.dob} />
            <LabelValue label="MA ID" value={patient.maId} />
            <LabelValue label="Insurance Name" value={patient.insurance} />
            <LabelValue label="Address" value={patient.address} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Reusable label-value component
const LabelValue = ({ label, value }) => (
  <View style={styles.field}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <Text style={styles.fieldValue}>{value}</Text>
    <View style={styles.divider} />
  </View>
);

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    // paddingBottom: 20,
    // backgroundColor: 'red',
    paddingTop: 12,
  },
  container: {
    backgroundColor: Colors.white,
  },
  header: {
    marginTop: Platform.OS === 'ios' ? 60 : 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.darkText,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.avatarBorder,
    backgroundColor: Colors.white,
  },
  card: {
    margin: 20,
    backgroundColor: Colors.cardBgBlue,
    borderRadius: 16,
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 12,
    marginTop: -50,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.white,
    borderWidth: 3,
    borderColor: Colors.avatarBorder,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: Colors.headerBlue,
  },
  assignedPCA: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: Colors.grayText,
  },
  infoGroup: {
    marginTop: 10,
  },
  field: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 14,
    color: Colors.black,
    marginBottom: 4,
    fontWeight: '600',
  },
  fieldValue: {
    fontSize: 14,
    color: Colors.grayText,
  },
  divider: {
    marginTop: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.dividerGray,
  },
});

export default PatientDetailScreen;
