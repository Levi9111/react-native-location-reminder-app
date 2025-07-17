import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

const HomePage = () => {
  return (
    <View className='flex-1 items-center justify-center bg-white space-y4'>
      <Text className='text-xl font-bold text-blue-600'>HomePage</Text>

      <Link href='/set-reminder' asChild>
        <Pressable className='px-4 py-2 bg-blue-500 rounded'>
          <Text className='text-white text-lg font-semibold'>Set Reminder</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default HomePage;
