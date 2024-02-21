import { Text, View, ScrollView, SectionList, Pressable } from "react-native";
import { useState } from "react";

const WithoutDueDate = ({ tasks, setTasks }) => {
  const handlePress = (index, sectionIndex) => {
    const newTasks = [...tasks];
    newTasks[sectionIndex].data[index].completed = true;
    setTasks(newTasks);
    const newTasksWithoutDueDate = newTasks.filter(
      (section) => section.title === null
    );
    setTasksWithoutDueDate(newTasksWithoutDueDate);
  };
  const tasksWithoutTitle = tasks.filter((section) => section.title === null);
  const [tasksWithoutDueDate, setTasksWithoutDueDate] =
    useState(tasksWithoutTitle);

  return (
    <ScrollView>
      <SectionList
        sections={tasksWithoutDueDate}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index, section }) =>
          item.completed === false && (
            <View className="inline-flex flex-row items-center gap-4 px-4">
              <Pressable
                className="size-4 rounded-full border border-white"
                onPress={() =>
                  handlePress(index, tasksWithoutDueDate.indexOf(section))
                }
              />
              <View>
                <Text className="pt-1 text-sm font-semibold text-white">
                  {item.content}
                </Text>
                <Text className="pb-1 text-xs font-normal text-zinc-500">
                  期限なし
                </Text>
              </View>
            </View>
          )
        }
      />
    </ScrollView>
  );
};

export default WithoutDueDate;
