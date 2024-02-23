import { useState } from "react";
import {
  Text,
  View,
  SectionList,
  Pressable,
  RefreshControl,
} from "react-native";
import TaskListSection from "./TaskListSection";

const TaskList = ({ tasks, updateTasks }) => {
  const [refreshing, setRefreshing] = useState(false);
  const today = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);
  const todayString = today.toISOString();
  const todayDate = todayString.slice(0, 10);
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const tomorrowString = tomorrow.toISOString();
  const tomorrowDate = tomorrowString.slice(0, 10);
  const todayIndex = tasks.findIndex((section) => section.title === todayDate);

  const [showExpiredTasks, setShowExpiredTasks] = useState(false);

  const handlePress = (index, sectionIndex) => {
    updateTasks((draft) => {
      draft[sectionIndex].data[index].completed = true;
    });
  };

  const [refreshingTitle, setRefreshingTitle] = useState(
    "Pull to show expired tasks"
  );
  const onRefresh = () => {
    if (!showExpiredTasks) {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
        setShowExpiredTasks(true);
        setRefreshingTitle("Pull to hide expired tasks");
      }, 1000);
    } else if (showExpiredTasks) {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
        setShowExpiredTasks(false);
        setRefreshingTitle("Pull to show expired tasks");
      }, 1000);
    }
  };

  return (
    <SectionList
      sections={tasks}
      keyExtractor={(item, index) => item + index}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          title={refreshingTitle}
          tintColor={"#fff"}
          titleColor={"#fff"}
        />
      }
      renderItem={({ item, index, section }) => {
        let sectionIndex = tasks.indexOf(section);
        console.log(sectionIndex);
        if (
          !showExpiredTasks &&
          sectionIndex >= todayIndex &&
          !item.completed
        ) {
          return (
            <View className="my-1 h-8 flex-row items-center gap-2 pl-2 pr-4">
              <Pressable
                className="size-8"
                onPress={() => handlePress(index, tasks.indexOf(section))}
              >
                <View className="m-1.5 size-4 rounded-full border border-white"></View>
              </Pressable>
              <View>
                <Text className="text-sm font-semibold text-white">
                  {item.content}
                </Text>
                {item.time && (
                  <Text className="text-xs font-normal text-zinc-500">
                    {item.time}
                  </Text>
                )}
              </View>
            </View>
          );
        } else if (showExpiredTasks && !item.completed) {
          return (
            <View className="my-1 h-8 flex-row items-center gap-2 pl-2 pr-4">
              <Pressable
                className="size-8"
                onPress={() => handlePress(index, tasks.indexOf(section))}
              >
                <View className="m-1.5 size-4 rounded-full border border-white"></View>
              </Pressable>
              <View>
                <Text className="text-sm font-semibold text-white">
                  {item.content}
                </Text>
                {item.time && (
                  <Text className="text-xs font-normal text-zinc-500">
                    {item.time}
                  </Text>
                )}
              </View>
            </View>
          );
        }
      }}
      renderSectionHeader={({ section, section: { title } }) => {
        let date = new Date(title);
        let dateJapanese = date.toLocaleDateString("ja-JP", {
          month: "long",
          day: "numeric",
        });
        let sectionIndex = tasks.indexOf(section);
        if (title === null) {
          return (
            <TaskListSection tasks={tasks} section={section}>
              期日なし
            </TaskListSection>
          );
        } else if (!showExpiredTasks && sectionIndex >= todayIndex) {
          return (
            <TaskListSection
              title={title}
              todayDate={todayDate}
              tomorrowDate={tomorrowDate}
              showExpiredTasks={showExpiredTasks}
              tasks={tasks}
              todayIndex={todayIndex}
              section={section}
              sectionIndex={sectionIndex}
            >
              {dateJapanese}
            </TaskListSection>
          );
        } else if (showExpiredTasks) {
          return (
            <TaskListSection
              title={title}
              todayDate={todayDate}
              tomorrowDate={tomorrowDate}
              showExpiredTasks={showExpiredTasks}
              tasks={tasks}
              todayIndex={todayIndex}
              section={section}
              sectionIndex={sectionIndex}
            >
              {dateJapanese}
            </TaskListSection>
          );
        }
      }}
    />
  );
};
export default TaskList;
