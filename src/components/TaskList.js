import { useState } from "react";
import {
  Text,
  View,
  SectionList,
  Pressable,
  RefreshControl,
} from "react-native";
import { useImmer } from "use-immer";

const TaskList = ({ tasks, updateTasks }) => {
  const [refreshing, setRefreshing] = useState(false);
  const today = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);
  const todayString = today.toISOString();
  const todayDate = todayString.slice(0, 10);
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const tomorrowString = tomorrow.toISOString();
  const tomorrowDate = tomorrowString.slice(0, 10);
  const todayIndex = tasks.findIndex((section) => section.title === todayDate);
  const [visibleTasks, updateVisibleTasks] = useImmer(
    tasks
      .filter((section) => !section.data.every((task) => task.completed))
      .filter((section) => section.title !== null)
  );
  const [upcomingTasks, updateUpcomingTasks] = useImmer(
    visibleTasks.slice(todayIndex)
  );
  const [displayedTasks, updateDisplayedTasks] = useImmer(upcomingTasks);
  const [showExpiredTasks, setShowExpiredTasks] = useState(false);

  const makeTaskCompleted = (currentTasks, relativeSectionIndex, index) => {
    currentTasks[relativeSectionIndex].data[index].completed = true;
  };

  const handlePress = (index, sectionIndex) => {
    if (!showExpiredTasks) {
      updateUpcomingTasks((draft) =>
        makeTaskCompleted(draft, sectionIndex, index)
      );
      updateVisibleTasks((draft) =>
        makeTaskCompleted(draft, sectionIndex + todayIndex, index)
      );
      updateDisplayedTasks((draft) =>
        makeTaskCompleted(draft, sectionIndex, index)
      );
    } else {
      updateVisibleTasks((draft) =>
        makeTaskCompleted(draft, sectionIndex, index)
      );
      if (sectionIndex >= todayIndex) {
        updateUpcomingTasks((draft) =>
          makeTaskCompleted(draft, sectionIndex - todayIndex, index)
        );
      }
      updateDisplayedTasks((draft) =>
        makeTaskCompleted(draft, sectionIndex, index)
      );
    }
  };

  const [refreshingTitle, setRefreshingTitle] = useState(
    "Pull to show expired tasks"
  );
  const onRefresh = () => {
    if (!showExpiredTasks) {
      setRefreshing(true);
      setShowExpiredTasks(true);
      setTimeout(() => {
        updateDisplayedTasks(visibleTasks);
        setRefreshing(false);
        setRefreshingTitle("Pull to hide expired tasks");
      }, 1000);
    } else if (showExpiredTasks) {
      setRefreshing(true);
      setShowExpiredTasks(false);
      setTimeout(() => {
        setRefreshingTitle("Pull to show expired tasks");
        setRefreshing(false);
        updateDisplayedTasks(upcomingTasks);
      }, 1000);
    }
  };

  return (
    <SectionList
      sections={displayedTasks}
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
      renderItem={({ item, index, section }) =>
        item.completed === false && (
          <View className="h-8 flex-row items-center gap-4 my-1 px-4">
            <Pressable
              className="w-4 h-4 rounded-full border border-white"
              onPress={() =>
                handlePress(index, displayedTasks.indexOf(section))
              }
            />
            <View>
              <Text className="text-sm font-semibold text-white">
                {item.content + displayedTasks.indexOf(section) + " " + index}
              </Text>
              {item.time && (
                <Text className="text-xs font-normal text-zinc-500">
                  {item.time}
                </Text>
              )}
            </View>
          </View>
        )
      }
      renderSectionHeader={({ section: { title } }) => {
        let date = new Date(title);
        let dateJapanese = date.toLocaleDateString("ja-JP", {
          month: "long",
          day: "numeric",
        });
        return (
          <View className="flex flex-row h-11 justify-between bg-black px-4 py-3">
            <Text className="text-[17px] font-normal text-white">
              {dateJapanese}
            </Text>
            {title === todayDate && (
              <Text className="text-[17px] font-normal text-white">今日</Text>
            )}
            {title === tomorrowDate && (
              <Text className="text-[17px] font-normal text-neutral-600">
                明日
              </Text>
            )}
          </View>
        );
      }}
    />
  );
};
export default TaskList;
