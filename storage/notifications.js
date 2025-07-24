import * as Notifications from 'expo-notifications';

export const requestNotificationPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
};

export const scheduleNotification = async (event) => {
  const triggerDate = new Date(event.date);
  triggerDate.setMinutes(triggerDate.getMinutes() - 10);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Reminder: ' + event.text,
      body: `Starts in 10 minutes (${event.time})`
    },
    trigger: triggerDate
  });
};