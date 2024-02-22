import { View, Text } from "react-native";

export default function TaskListSection({
  children,
  title = null,
  todayDate = "2024-02-31",
  tomorrowDate = "2024-02-31",
  showExpiredTasks = null,
  displayedTasks,
  todayIndex = null,
  section,
}) {
  return (
    <View className="flex h-11 flex-row justify-between bg-black px-4 py-3">
      <Text className="text-[17px] font-normal text-white">{children}</Text>
      {title === todayDate && (
        <Text className="text-[17px] font-normal text-white">今日</Text>
      )}
      {title === tomorrowDate && (
        <Text className="text-[17px] font-normal text-neutral-600">明日</Text>
      )}
      {showExpiredTasks && displayedTasks.indexOf(section) < todayIndex && (
        <Text className="text-sm font-normal text-red-700">
          {`${todayIndex - displayedTasks.indexOf(section)}日前`}
        </Text>
      )}
    </View>
  );
}
