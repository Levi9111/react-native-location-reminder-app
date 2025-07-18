import { useReminders } from '@/contex/ReminderContex';
import { Link } from 'expo-router';
import { FlatList, Pressable, Text, View } from 'react-native';

export default function HomeScreen() {
  const { reminders } = useReminders();

  return (
    <View className='flex-1 bg-white p-6'>
      <Text className='text-2xl font-bold mb-4 text-blue-600'>
        📋 Saved Reminders
      </Text>

      {reminders.length === 0 ? (
        <Text className='text-gray-500'>No reminders yet.</Text>
      ) : (
        <FlatList
          data={reminders}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          renderItem={({ item }) => (
            <View className='mb-2 p-3 bg-gray-100 rounded'>
              <Text className='font-semibold'>{item.title}</Text>
              <Text className='text-sm text-gray-600'>
                Lat: {item.latitude.toFixed(5)} | Lng:{' '}
                {item.longitude.toFixed(5)}
              </Text>
            </View>
          )}
        />
      )}

      <Link href='/set-reminder' asChild>
        <Pressable className='bg-blue-600 py-3 px-4 rounded mt-6 items-center'>
          <Text className='text-white font-semibold'>+ Set a New Reminder</Text>
        </Pressable>
      </Link>

      <Link href='/map' asChild>
        <Pressable className='bg-green-600 py-3 px-4 rounded mt-3 items-center'>
          <Text className='text-white font-semibold'>🗺 View Map</Text>
        </Pressable>
      </Link>
    </View>
  );
}
