import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import TaskCard from '../components/TaskCard';
import colors from '../constants/colors';

export default function TodoScreen() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('@tasks');
        if (storedTasks) setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };
    loadTasks();
  }, []);

  const saveTasks = async (updatedTasks) => {
    try {
      await AsyncStorage.setItem('@tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const addTask = () => {
    if (newTask.trim()) {
      const updatedTasks = [
        ...tasks,
        { id: Date.now().toString(), text: newTask.trim() }
      ];
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      setNewTask('');
    } else {
      Alert.alert('Empty Task', 'Please enter a task before adding');
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={newTask}
          onChangeText={setNewTask}
          placeholderTextColor={colors.border}
        />
        <Button
          title="Add Task"
          onPress={addTask}
          color={colors.primary}
        />
      </View>

      <SwipeListView
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SwipeRow
            rightOpenValue={-75}
            disableRightSwipe
            previewRowKey={tasks[0]?.id}
          >
            <View style={styles.deleteButtonContainer}>
              <Button
                title="Delete"
                onPress={() => deleteTask(item.id)}
                color={colors.error}
              />
            </View>
            <TaskCard task={item} />
          </SwipeRow>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16
  },
  list: {
    paddingBottom: 20
  },
  deleteButtonContainer: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',
    paddingRight: 20,
    backgroundColor: colors.error
  }
});