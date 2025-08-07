import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function CustomHeader() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftSection}>
        <Text style={styles.headerTitle}>Головне</Text>
      </View>
        <MaterialCommunityIcons name="safe" size={22} color="white" style={{ marginLeft: 170 }} />
      <View style={styles.rightSection}>
        <Text style={styles.balanceLabel}>Баланс:</Text>
        <Text style={styles.balanceValue}>132 000</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    width: '100%',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  balanceLabel: {
    color: 'white',
    fontSize: 14,
    marginRight: 12
  },
  balanceValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomHeader;
