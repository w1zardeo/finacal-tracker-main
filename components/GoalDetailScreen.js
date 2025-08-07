import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

function GoalDetailScreen({ route }) {
  const { goal } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Цілі</Text>
      <Image source={{ uri: goal.imageUri }} style={styles.image} />
      <Text style={styles.title}>На {goal.title}</Text>
      <Text style={styles.payment}>Прошлий платіж: {goal.lastPayment || 'Н/Д'}</Text>
      <Text style={styles.progress}>Статус виконання цілі: {goal.progress}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eef4fc',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0a5dc2',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
    marginBottom: 15,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  payment: {
    fontSize: 16,
    marginBottom: 5,
  },
  progress: {
    fontSize: 16,
    color: '#444',
  },
});

export default GoalDetailScreen;