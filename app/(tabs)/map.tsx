import { useReminders } from '@/contex/ReminderContex';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

// For showing the map on the screen

const MapScreen = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const { reminders } = useReminders();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        alert('Location permission not granted');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setLoading(false);
    })();
  }, []);

  if (loading || !location) {
    return (
      <View className='flex-1 justify-center items-center bg-white'>
        <ActivityIndicator size='large' color='#3b82f6' />
        <Text className='mt-2 text-gray-500'>Loading Map...</Text>
      </View>
    );
  }

  const region: Region = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <View className='flex-1'>
      <MapView
        style={{ flex: 1 }}
        className='flex-1'
        initialRegion={region}
        showsUserLocation
      >
        {reminders.map((reminder, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: reminder.latitude,
              longitude: reminder.longitude,
            }}
            title={reminder.title}
            description={`Reminder ${index + 1}`}
          />
        ))}
      </MapView>
    </View>
  );
};

export default MapScreen;
