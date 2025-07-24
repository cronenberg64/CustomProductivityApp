import { Button, StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My Productivity App!</Text>
      <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Todo List"
          onPress={() => navigation.navigate('Todo')}
          color={colors.primary}
        />
        <Button
          title="Go to Planner"
          onPress={() => navigation.navigate('Planner')}
          color={colors.secondary}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: colors.primary
  },
  date: {
    fontSize: 18,
    marginBottom: 30
  },
  buttonContainer: {
    width: '80%',
    gap: 15
  }
});