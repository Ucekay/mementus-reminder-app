import { useState, useCallback } from "react";
import { useImmer } from "use-immer";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

import ListHeader from "../components/ListHeader";
import TaskList from "../components/TaskList";
import NewTaskCard from "../components/NewTaskCard";
import taskData from "../taskData";

SplashScreen.preventAutoHideAsync();

function Page() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [tasks, updateTasks] = useImmer(taskData);
  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen} onLayout={onLayoutRootView}>
        <StatusBar style="auto" />
        <ListHeader />
        <View className="flex-1">
          <TaskList
            tasks={tasks}
            updateTasks={updateTasks}
            isAppReady={isAppReady}
            setIsAppReady={setIsAppReady}
          />
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={84}>
            <NewTaskCard tasks={tasks} updateTasks={updateTasks} />
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Page;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000",
  },
});
