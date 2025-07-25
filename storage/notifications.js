import * as Notifications from 'expo-notifications';

export const requestNotificationPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
};

export const scheduleNotification = async (event) => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Event Reminder',
      body: `Your event "${event.text}" starts soon!`,
      sound: true,
      data: { eventId: event.id }
    },
    trigger: {
      seconds: Math.max((event.timestamp - Date.now() - 600000) / 1000, 1)
    }
  });
};