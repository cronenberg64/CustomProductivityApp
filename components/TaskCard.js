import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';

export default function TaskCard({ task }) {
  return (
    <View style={styles.container}>
      <Text style={styles.taskText}>{task.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border
  },
  taskText: {
    fontSize: 16,
    color: colors.text
  }
});