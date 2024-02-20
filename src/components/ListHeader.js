import { View, Text } from "react-native";

export default function ListHeader() {
  return (
    <View className="flex h-10 w-full bg-black py-2">
      <Text className="text-center text-[19px] font-normal leading-snug text-white">
        リスト
      </Text>
    </View>
  );
}
