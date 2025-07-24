import AsyncStorage from '@react-native-async-storage/async-storage';
import { addDays, format, startOfWeek } from 'date-fns';
import { useEffect, useState } from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import TaskCard from '../components/TaskCard';
import colors from '../constants/colors';

export default function PlannerScreen() {
  const [plannerData, setPlannerData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState('');

  useEffect(() => {
    const loadPlannerData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('@planner');
        if (storedData) setPlannerData(JSON.parse(storedData));
      } catch (error) {
        console.error('Error loading planner data:', error);
      }
    };
    loadPlannerData();
  }, []);

  const savePlannerData = async (data) => {
    try {
      await AsyncStorage.setItem('@planner', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving planner data:', error);
    }
  };

  const generateWeekDates = () => {
    const start = startOfWeek(new Date());
    return Array.from({ length: 7 }).map((_, i) => addDays(start, i));
  };

  const addEvent = () => {
    if (newEvent.trim() && selectedDate) {
      const dateKey = format(selectedDate, 'yyyy-MM-dd');
      const updatedData = {
        ...plannerData,
        [dateKey]: [...(plannerData[dateKey] || []), {
          id: Date.now().toString(),
          text: newEvent.trim(),
          date: dateKey
        }]
      };
      setPlannerData(updatedData);
      savePlannerData(updatedData);
      setNewEvent('');
      setSelectedDate(null);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekContainer}>
        {generateWeekDates().map((date) => (
          <View key={date.toISOString()} style={styles.dayContainer}>
            <Text style={styles.dayTitle}>{format(date, 'EEE')}</Text>
            <Text style={styles.dateText}>{format(date, 'd')}</Text>
            <Button
              title="Add Task"
              onPress={() => setSelectedDate(date)}
              color={colors.secondary}
            />
            <FlatList
              data={plannerData[format(date, 'yyyy-MM-dd')] || []}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TaskCard task={item} />}
              contentContainerStyle={styles.tasksContainer}
            />
          </View>
        ))}
      </ScrollView>

      {selectedDate && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={`Add task for ${format(selectedDate, 'MMM d')}`}
            value={newEvent}
            onChangeText={setNewEvent}
            placeholderTextColor={colors.border}
          />
          <Button
            title="Save Event"
            onPress={addEvent}
            color={colors.primary}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background
  },
  weekContainer: {
    marginBottom: 20
  },
  dayContainer: {
    width: 150,
    marginRight: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 5
  },
  dateText: {
    fontSize: 24,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 10
  },
  tasksContainer: {
    marginTop: 10
  },
  inputContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderColor: colors.border
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16
  }
});