import { View, Text, StyleSheet } from 'react-native';

function TipsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Фінансові поради</Text>
    </View>
  );
}

export default TipsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});
