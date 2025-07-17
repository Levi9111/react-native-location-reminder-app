import { useReminders } from "@/contex/ReminderContex";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

const SetReminderScreen = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [permissionStatus, setPermissionStatus] =
    useState<Location.PermissionStatus | null>(null);
  const { addReminder } = useReminders();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      console.log(status);
      setPermissionStatus(status);

      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location access is required to set reminders",
        );
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});

      setLocation(currentLocation);
    })();
  }, []);

  const handleSave = () => {
    if (!title || !location) {
      Alert.alert(
        "Missing Info",
        "Please enter a title and ensure location is available",
      );

      return;
    }

    addReminder({
      title,
      latitude: location?.coords.latitude as number,
      longitude: location?.coords.longitude as number,
    });

    Alert.alert("Success", "Reminder saved!");
    setTitle("");
  };

  return (
    <View className='flex-1 p-6 bg-white space-y-6'>
      <Text className='text-2xl font-bold text-center text-blue-600'>
        Set Location Reminder
      </Text>

      <TextInput
        placeholder='Reminder title'
        value={title}
        onChangeText={setTitle}
        className='border border-gray-300 rounded p-3 text-base'
      />

      <View>
        <Text className='text-sm text-gray-500'>
          Location:{" "}
          {location
            ? `${location.coords.latitude.toFixed(5)}, ${location.coords.longitude.toFixed(5)}`
            : `Fetching...`}
        </Text>
      </View>

      <Pressable
        onPress={handleSave}
        className='bg-blue-600 p-4 rounded mt-4 items-center'
      >
        <Text className='text-white font-semibold'>Save Reminder</Text>
      </Pressable>
    </View>
  );
};

export default SetReminderScreen;
